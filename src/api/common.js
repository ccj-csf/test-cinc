import Request from "@/api/http/axios";

/**
 * CommonApi类，继承自Request类，提供常见的API功能
 */
class CommonApi extends Request {
  /**
   * 添加名称
   * @param {Object} data - 待处理的数据对象
   * @returns {Object} 返回处理后的数据对象
   */
  addName(data) {
    return data;
  }
}

export default CommonApi;
