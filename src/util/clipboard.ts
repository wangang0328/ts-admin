import * as clipboard from 'clipboard-polyfill'
import { ElMessage } from 'element-plus'
type TextType = 'text/html' | 'text/plain'
//拷贝成功
function copySuccess(): void {
  ElMessage({
    type: 'success',
    message: '拷贝成功'
  })
}

//拷贝失败
function copyError(): void {
  ElMessage.error('拷贝失败')
}

export default async function handleClipboard(
  text: string,
  type: TextType = 'text/plain'
) {
  // type = type ? 'text/plain' : type
  // clipboard.writeText(text)
  // let obj = {}
  try {
    const item = new clipboard.ClipboardItem({
      [type]: new Blob([text], { type })
    })
    await clipboard.write([item])
    copySuccess()
  } catch (error) {
    copyError()
  }
}
