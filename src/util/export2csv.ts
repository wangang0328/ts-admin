/*
 * @Author : wa
 * @Date : 2021-1-27 00:09:43
 */

//导出csv格式文件
export default function exportCSV(list: object[], fileName?: string, keyList?: string[]): void {
  let csvContent: string
  csvContent = 'data:text/csv;charset=utf-8,'
  //头部
  if (keyList) {
    csvContent = keyList.join(',') + '\r\n'
  } else {
    const firItem = list[0]
    csvContent += Object.keys(firItem).join(',') + '\r\n'
  }

  //内容
  for (let i = 0; i < list.length; i ++) {
    csvContent += Object.values(list[i]).join(',') + '\r\n'
  }
  const encodeUri = encodeURI(csvContent)
//   window.open(encodedUri)
  const link = document.createElement('a')
  link.setAttribute('href', encodeUri)
  link.setAttribute('download', fileName ? fileName : 'document.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
