import { arrayBufferToBase64File, base64FileToFile } from './utils'
import { IBackgroundHttpResponse, IBackgroundRequest, IBackgroundResponse } from './types'
import { ii, isPlainObject, remove } from 'vtils'
import { YAPIX } from './consts'

// ==== 提供 HTTP Request 服务 ====
chrome.runtime.onMessage.addListener(
  (request: IBackgroundRequest, _, sendResponse: (response: IBackgroundResponse) => any) => {
    ii(async () => {
      switch (request.type) {
        case YAPIX.BACKGROUND_HTTP_REQUEST_TYPE:
          if (request.options.headers) {
            request.options.headers[YAPIX.HTTP_HEADERS_KEY] = JSON.stringify(request.options.headers)
          }
          if (isPlainObject(request.options.body) && request.options.body[YAPIX.FILE_BODY_KEY] === true) {
            const YApiXFileBody = { ...request.options.body }
            delete YApiXFileBody[YAPIX.FILE_BODY_KEY]
            const formData = new FormData()
            for (const [key, value] of Object.entries(YApiXFileBody)) {
              if (isPlainObject(value) && value[YAPIX.BASE64_FILE_FLAG] === true) {
                formData.append(key, base64FileToFile(value))
              }
              else {
                formData.append(key, value as any)
              }
            }
            request.options.body = formData as any
          }
          const res = await fetch(request.options.url, request.options)
          const responseHeaders = new Headers(res.headers)
          const extraHeaders = responseHeaders.get(YAPIX.HTTP_HEADERS_KEY)
          if (extraHeaders != null) {
            responseHeaders.delete(YAPIX.HTTP_HEADERS_KEY)
            for (const [key, value] of Object.entries(JSON.parse(extraHeaders))) {
              responseHeaders.set(key, value as any)
            }
          }
          // NOTE: Headers 内部使用小写存储键
          const headers = Object.fromEntries(responseHeaders.entries())
          const arrayBuffer = await res.arrayBuffer()
          const name = 'file'
          const contentType = headers['content-type'] || 'application/octet-stream'
          const base64File = arrayBufferToBase64File(arrayBuffer, name, contentType)
          const { ok, status, statusText } = res
          sendResponse({
            error: null,
            data: { ok, status, statusText, headers, base64File } as IBackgroundHttpResponse,
          })
          break
        default:
          break
      }
    }).catch(err => {
      sendResponse({
        error: String(err),
      })
    })
    return true
  },
)

// ==== 保证 HTTP Headers 完整发送和接收 ====
const shouldProcessRequests = new Set<string>()

chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    for (const headerIndex in (details.requestHeaders || [])) {
      const header = details.requestHeaders![headerIndex]
      if (header.name === YAPIX.HTTP_HEADERS_KEY) {
        shouldProcessRequests.add(details.requestId)
        const headers: Record<string, string> = JSON.parse(header.value!)
        for (const [key, value] of Object.entries(headers)) {
          details.requestHeaders!.push({
            name: key,
            value: value as any,
          })
        }
        remove(details.requestHeaders!, Number(headerIndex))
        return { requestHeaders: details.requestHeaders }
      }
    }
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking', 'requestHeaders', 'extraHeaders'],
)

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    if (shouldProcessRequests.has(details.requestId)) {
      shouldProcessRequests.delete(details.requestId)
      if (details.responseHeaders) {
        details.responseHeaders.push({
          name: YAPIX.HTTP_HEADERS_KEY,
          value: JSON.stringify(
            details.responseHeaders.reduce((res, header) => {
              (res as any)[header.name] = header.value
              return res
            }, {}),
          ),
        })
        return { responseHeaders: details.responseHeaders }
      }
    }
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking', 'responseHeaders', 'extraHeaders'],
)
