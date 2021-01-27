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

//生成uuid
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
  })
}

//滚动
export function scrollTo(el?: HTMLElement, duration: number = 2000, toY: number = 0): void {
  el = el ? el : document.body
  // duration = duration ? duration : 2000 //滚动时长
  // offsetY = offsetY ? offsetY : 0  //滚动的位置
  //初始位置
  const startY = el.scrollTop
  const offsetY = startY - toY
  let startTime: number
  const ease = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
  window.requestAnimationFrame(function step(timestamp: number) {
    !startTime && (startTime = timestamp)
    const diffTime = timestamp - startTime
    const percent = ease(Math.min(diffTime/duration, 1))
    el!.scrollTo(0, offsetY * (1 - percent))
    if (diffTime < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
