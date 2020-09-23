const WIDTH = window.innerWidth
/**
 * 计算在750画布下，应该显示多大
 * @param num
 */
export function calPx (num: number) {
  return WIDTH / 750 * num
}
