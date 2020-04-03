import { arrayBufferToBase64File, base64FileToFile } from './utils'
import { IBackgroundHttpResponse, IBackgroundRequest, IBackgroundResponse } from './types'
import { YAPIX } from './consts'

chrome.runtime.onMessage.addListener(
  (request: IBackgroundRequest, _, sendResponse: (response: IBackgroundResponse) => any) => {
    (async () => {
      switch (request.type) {
        case YAPIX.BACKGROUND_HTTP_REQUEST_TYPE:
          if (typeof request.options.body === 'object' && request.options.body[YAPIX.BASE64_FILE_FLAG] === true) {
            const YApiXFileBody = { ...request.options.body }
            delete YApiXFileBody[YAPIX.FILE_BODY_KEY]
            const formData = new FormData()
            for (const [key, value] of Object.entries(YApiXFileBody)) {
              if (value !== null && typeof value === 'object' && value[YAPIX.BASE64_FILE_FLAG] === true) {
                formData.append(key, base64FileToFile(value))
              }
              else {
                formData.append(key, value as any)
              }
            }
            request.options.body = formData as any
          }
          const res = await fetch(request.options.url, request.options)
          // NOTE: Headers 内部使用小写存储的键
          const headers = Object.fromEntries(res.headers.entries())
          const arrayBuffer = await res.arrayBuffer()
          const name = 'file'
          const contentType = headers['content-type'] || 'application/octet-stream'
          const base64File = arrayBufferToBase64File(arrayBuffer, name, contentType)
          sendResponse({
            error: null,
            data: { headers, base64File } as IBackgroundHttpResponse,
          })
          break
        default:
          break
      }
    })().catch(err => {
      sendResponse({
        error: String(err),
      })
    })
    return true
  },
)
