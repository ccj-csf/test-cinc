import CommonApi from "./common";

// 用户API类，继承自CommonApi，提供用户相关的API调用
class UserApi extends CommonApi {
  /**
   * 登录方法
   * @param {Object} params - 登录参数，具体结构根据实际需求定义
   * @return {Promise} 返回一个Promise对象，成功或失败会相应resolve或reject
   */
  login(params) {
    return this.post({
      url: `/auth/v1/token?grant_type=password`,
      params,
      // errorMessageMode: "none", // 错误消息模式为模态框
    });
  }

  /**
   * 获取用户信息
   * @return {Promise} 返回一个Promise对象，成功或失败会相应resolve或reject，成功时resolve用户信息
   */
  getUserInfo() {
    return this.get({
      url: "/getUserInfo",
      errorMessageMode: "none", // 不显示错误消息
    });
  }

  /**
   * 登出方法
   * @return {Promise} 返回一个Promise对象，表示登出操作的成功或失败
   */
  logout() {
    return this.delete({
      url: "/logout",
    });
  }

  /**
   * 获取用户列表
   * @param {Object} params - 请求参数，用于过滤用户列表，具体结构根据实际需求定义
   * @return {Promise} 返回一个Promise对象，成功或失败会相应resolve或reject，成功时resolve用户列表
   */
  getUsers(params) {
    return this.get({
      url: "/api/users",
      params,
    });
  }
}

// UserApi类的实例化对象，用于外部引用
const UserApiInstance = new UserApi();
export default UserApiInstance;
