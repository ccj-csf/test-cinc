/**
 * Helper类，提供页面滚动到顶部的功能
 */
export default class Helper {
  /**
   * 将页面平滑地滚动到顶部
   * 参数：无
   * 返回值：无
   */
  static scrollToTop() {
    window.scrollTo({
      top: 0, // 滚动到页面顶部
      behavior: "smooth", // 平滑滚动的方式
    });
  }
}
