import store from "store2";
import { PROFILE, ACCESS_TOKEN } from "@/constants";

/**
 * Auth类用于处理认证相关的操作，包括设置和移除token、新用户标志及用户信息。
 */
export default class Auth {
  /**
   * 设置访问令牌。
   * @param accessToken {string} 访问令牌。
   */
  static setToken(accessToken) {
    store.set(ACCESS_TOKEN, accessToken);
  }

  static getToken() {
    return store.get(ACCESS_TOKEN) || {};
  }
  /**
   * 设置用户信息。
   * @param profile {any} 用户信息，可以是任意格式。
   */
  static setProfile(profile) {
    // 默认头像链接
    profile.avatarUrl =
      profile.avatarUrl ||
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
    store.set(PROFILE, profile);
  }

  /**
   * 获取用户信息。
   * @returns {Object} 返回存储的用户信息或空对象。
   */
  static getProfile() {
    return store.get(PROFILE) || {};
  }

  /**
   * 移除登录时存储的信息。
   * 该方法用于登出操作，清除用户认证相关的所有本地存储数据。
   */
  static removeLoginWithEmailInfo() {
    store.remove(ACCESS_TOKEN);
    store.remove(PROFILE);
  }
}
