import { IBase64File } from './types'
import { YAPIX } from './consts'

export function fileToBase64File(file: File): Promise<IBase64File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(
        arrayBufferToBase64File(reader.result as any, file.name, file.type),
      )
    }
    reader.onerror = error => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

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
    name: name,
    type: contentType,
  }
}

export function readBase64File<T extends 'text' | 'dataUrl' | 'arrayBuffer'>(
  base64File: IBase64File,
  readAs: T,
  charset?: string,
): Promise<T extends 'arrayBuffer' ? ArrayBuffer : string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as any)
    }
    reader.onerror = error => reject(error)
    const file = base64FileToFile(base64File)
    if (readAs === 'dataUrl') {
      reader.readAsDataURL(file)
    }
    else if (readAs === 'arrayBuffer') {
      reader.readAsArrayBuffer(file)
    }
    else {
      reader.readAsText(file, charset)
    }
  })
}

export function injectJs(path: string): void {
  const js = document.createElement('script')
  js.src = chrome.extension.getURL(path)
  js.onload = () => js.remove()
  ;(document.head || document.documentElement).appendChild(js)
}
