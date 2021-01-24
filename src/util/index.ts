/*
 * @Author : wa
 * @Date : 2020-12-27 00:09:43
 */

export class Debounced {
  use(fn: Function, delay?: number, immediate?: boolean): any | Function {
    delay = delay ? delay : 20
    immediate = immediate ? immediate : false
    let timer: number | undefined
    return (...args: any) => {
      if (immediate) {
        immediate = false
        fn.apply(this, args)
      }
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

export function sortObjList<T>(list: T[], sortBy: string): T[] {
  return list.sort((a, b) => {
    return a[sortBy] - b[sortBy]
  })
}
