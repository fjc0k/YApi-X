import { IBackgroundHttpRequestOptions, IBackgroundHttpResponse, IBackgroundRequest, IBackgroundResponse, IHttpRequestListenerPayload, IHttpResponseListenerPayload } from './types'
import { injectJs } from './utils'
import { YAPIX } from './consts'

injectJs('adapter.js')

interface YApiXHTTPRequestOptions {
  url: string,
  method: string,
  headers?: Record<string, string>,
  params?: Record<string, string>,
  query?: Record<string, string>,
  requestBodyType?: (
    | 'form'
    | 'json'
    | 'file'
    | 'raw'
  ),
  requestBody?: any,
}

async function YApiXHTTPRequest(options: YApiXHTTPRequestOptions) {
  let url = options.url

  // 请求方法
  const method = options.method.toUpperCase()
  const isGETLikeMethod = ['GET', 'HEAD', 'OPTIONS'].includes(method)

  // 赋值 url 中的路径参数
  for (const [key, value] of Object.entries(options.params || {})) {
    url = url
      .replace(new RegExp(`\\{${key}\\}`, 'g'), value)
      .replace(new RegExp(`/:${key}(?=/|$)`, 'g'), `/${value}`)
  }

  // 将 query 加入 url
  const urlInstance = new URL(options.url)
  for (const [key, value] of Object.entries(options.query || {})) {
    urlInstance.searchParams.append(key, value)
  }
  url = urlInstance.toString()

  // 请求选项
  const requestOptions: IBackgroundHttpRequestOptions = {
    url: url,
    method: method,
    headers: options.headers || {},
  }
  if (!isGETLikeMethod) {
    switch (options.requestBodyType) {
      case 'form':
        requestOptions.body = new URLSearchParams(options.requestBody).toString()
        requestOptions.headers!['Content-Type'] = 'application/x-www-form-urlencoded'
        break
      case 'json':
        requestOptions.body = JSON.stringify(options.requestBody)
        requestOptions.headers!['Content-Type'] = 'application/json'
        break
      case 'file':
        requestOptions.body = options.requestBody
        delete requestOptions.headers!['Content-Type']
        break
      default:
        requestOptions.body = options.requestBody
        break
    }
  }

  // 响应内容
  const responseBody = await new Promise<IBackgroundHttpResponse>((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: YAPIX.BACKGROUND_HTTP_REQUEST_TYPE,
        options: requestOptions,
      } as IBackgroundRequest,
      async function (response: IBackgroundResponse) {
        if (response == null) {
          reject(chrome.runtime.lastError)
        }
        else if (response.error != null) {
          reject(response.error)
        }
        else {
          resolve(response.data)
        }
      },
    )
  })

  return responseBody
}

// ==== 基于事件将后台服务与前台应用桥接在一起 ====
document.addEventListener(YAPIX.HTTP_REQUEST_LISTENER_TYPE, async e => {
  const detail: IHttpRequestListenerPayload = JSON.parse(JSON.stringify((e as any).detail || {}))
  const res = await YApiXHTTPRequest(detail.options)
  document.dispatchEvent(new CustomEvent(YAPIX.HTTP_RESPONSE_LISTENER_TYPE, {
    detail: {
      id: detail.id,
      response: res,
    } as IHttpResponseListenerPayload,
  }))
})
