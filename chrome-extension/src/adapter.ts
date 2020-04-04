import { EventBus } from 'vtils'
import { fileToBase64File, readBase64File } from './utils'
import { IBackgroundHttpRequestFileBody, IHttpRequestListenerPayload, IHttpResponseListenerPayload, YApiXHTTPRequestOptions } from './types'
import { YAPIX } from './consts'

let counter = 0

const bus = new EventBus<{
  response: (payload: IHttpResponseListenerPayload) => any,
}>()

document.addEventListener(YAPIX.HTTP_RESPONSE_LISTENER_TYPE, e => {
  const payload: IHttpResponseListenerPayload = JSON.parse(JSON.stringify((e as any).detail || {}))
  bus.emit('response', payload)
})

interface CrossRequestPayload {
  url: string,
  method: string,
  files: Record<string, string | undefined>,
  headers: Record<string, string>,
  data: any,
  caseId: number,
  taskId: number,
  timeout: number,
  error: (res: any, headers: any, data: any) => any,
  success: (res: any, headers: any, data: any) => any,
}

// ==== 适配 YApi 官方实现 ====
(window as any).crossRequest = async function (payload: CrossRequestPayload) {
  const contentType = payload.headers['Content-Type']
    || payload.headers['content-type']
    || payload.headers['Content-type']
  const requestBodyType: YApiXHTTPRequestOptions['requestBodyType'] = (
    payload.data == null
      ? undefined
      : contentType === 'application/x-www-form-urlencoded'
        ? 'form'
        : contentType === 'multipart/form-data'
          ? 'file'
          : contentType === 'application/json'
            ? 'json'
            : 'raw'
  )
  const requestBody: YApiXHTTPRequestOptions['requestBody'] = (
    requestBodyType !== 'file'
      ? payload.data
      : {
        [YAPIX.FILE_BODY_KEY]: true,
        ...(payload.data || {}),
        ...Object.fromEntries(await Promise.all(
          Object.entries(payload.files || {}).map(async ([key, value]) => {
            return [
              key,
              value && await fileToBase64File(
                document.querySelector<HTMLInputElement>(`#${value}`)!.files![0],
              ),
            ] as const
          }),
        )),
      } as IBackgroundHttpRequestFileBody
  )
  const requestId = `${location.href}____${counter++}`
  const off = bus.on('response', async ({ id, response }) => {
    if (id === requestId) {
      const YApiResponse = {
        header: response.headers,
        status: response.status,
        statusText: response.statusText,
        body: await readBase64File(
          response.base64File,
          'text',
          (response.headers['content-type'] || '').match(/charset=(.*)\b/i)?.[1] || 'utf-8',
        ),
        // NOTE: YApi-X 预览用
        async getBodyAsDataUrl() {
          return readBase64File(response.base64File, 'dataUrl')
        },
      }
      const YApiData = {
        req: payload,
        res: YApiResponse,
        runTime: new Date().getTime(),
      }
      if (response.ok) {
        payload.success(YApiResponse.body, YApiResponse.header, YApiData)
      }
      else {
        payload.error(YApiResponse.statusText, YApiResponse.header, YApiData)
      }
      off()
    }
  })
  document.dispatchEvent(new CustomEvent(YAPIX.HTTP_REQUEST_LISTENER_TYPE, {
    detail: {
      id: requestId,
      options: {
        url: payload.url,
        method: payload.method,
        headers: {
          ...payload.headers,
          'Content-Type': contentType,
        },
        requestBodyType: requestBodyType,
        requestBody: requestBody,
      },
    } as IHttpRequestListenerPayload,
  }))
}
