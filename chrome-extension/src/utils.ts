import { IBase64File } from './types'
import { YAPIX } from './consts'

export function base64FileToFile(base64File: IBase64File): File {
  const bstr = atob(base64File.base64)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const file = new File(
    [u8arr],
    base64File.name,
    {
      type: base64File.type,
    },
  )
  return file
}

export function arrayBufferToBase64File(buffer: ArrayBuffer, name: string, contentType: string): IBase64File {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  const base64 = btoa(binary)
  return {
    [YAPIX.BASE64_FILE_FLAG]: true,
    base64: base64,
    name: 'file',
    type: contentType,
  }
}
