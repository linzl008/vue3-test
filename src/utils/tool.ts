const WIDTH = window.innerWidth
/**
 * 计算在750画布下，应该显示多大
 * @param num
 */
export function calPx (num: number) {
  return WIDTH / 750 * num
}

export function getRatio () {
  const canvas: any = document.createElement('canvas')
  const devicePixelRatio = window.devicePixelRatio || 1
  const backingStoreRatio = canvas.webkitBackingStorePixelRatio || 1
  const ratio = devicePixelRatio / backingStoreRatio
  return ratio
}
