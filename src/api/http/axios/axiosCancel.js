import axios from "axios";
import { isFunction } from "@/utils";

// 用于存储每个请求的标识和取消功能的映射
let pendingMap = new Map();

// 根据配置生成唯一的请求标识
export const getPendingUrl = (config) => [config.method, config.url].join("&");

/**
 * AxiosCanceler 类用于管理请求的取消和添加。
 */
export class AxiosCanceler {
  /**
   * 添加一个请求到待处理映射中。
   * @param {Object} config Axios请求配置对象。
   */
  addPending(config) {
    // 先尝试移除之前的同名请求，避免重复
    this.removePending(config);
    const url = getPendingUrl(config);
    // 设置取消令牌，如果配置中已有则使用，否则创建新的
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果待处理映射中不存在当前请求，则添加到映射中
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * 清除所有待处理请求。
   */
  removeAllPending() {
    // 遍历所有待处理请求并取消它们
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    // 清空映射
    pendingMap.clear();
  }

  /**
   * 删除一个请求从待处理映射中。
   * @param {Object} config Axios请求配置对象。
   */
  removePending(config) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果存在对应的请求标识，则获取取消函数并执行，然后从映射中移除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * 重置待处理映射到空状态。
   */
  reset() {
    // 用新的空映射替换当前映射，实现重置
    pendingMap = new Map();
  }
}
