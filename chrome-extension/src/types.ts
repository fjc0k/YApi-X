import { YAPIX } from './consts'

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export interface IBase64File {
  [YAPIX.BASE64_FILE_FLAG]: true,
  base64: string,
  name: string,
  type: string,
}

export interface IBackgroundHttpRequestFileBody {
  [YAPIX.FILE_BODY_KEY]: true,
  [key: string]: IBase64File | string | true,
}

export type IBackgroundHttpRequestOptions = Merge<RequestInit, {
  url: string,
  headers?: Record<string, string>,
  body?: string | IBackgroundHttpRequestFileBody,
}>

export interface IBackgroundRequest {
  type: YAPIX.BACKGROUND_HTTP_REQUEST_TYPE,
  options: IBackgroundHttpRequestOptions,
}

export interface IBackgroundHttpResponse {
  ok: boolean,
  status: number,
  statusText: string,
  headers: Record<string, string>,
  base64File: IBase64File,
}

export type IBackgroundResponse = {error: string} | {
  error: null,
  data: IBackgroundHttpResponse,
}

export interface YApiXHTTPRequestOptions {
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

export interface IHttpRequestListenerPayload {
  id: string,
  options: YApiXHTTPRequestOptions,
}

export interface IHttpResponseListenerPayload {
  id: string,
  response: IBackgroundHttpResponse,
}
