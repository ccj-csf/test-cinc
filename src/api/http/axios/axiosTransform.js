/**
 * 数据处理类，可根据项目配置
 */
export class AxiosTransform {
  constructor(options = {}) {
    this.authenticationScheme = options.authenticationScheme;
    this.transform = options.transform;
    this.requestOptions = options.requestOptions;
  }

  /**
   * @description: 请求前的流程配置
   */
  beforeRequestHook(config, options) {
    // 子类中需要提供具体实现
  }

  /**
   * @description: 请求成功处理
   */
  transformRequestHook(res, options) {
    // 子类中需要提供具体实现
  }

  /**
   * @description: 请求失败处理
   */
  requestCatchHook(e, options) {
    // 子类中需要提供具体实现
    return Promise.reject(e);
  }

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors(config, options) {
    // 子类中需要提供具体实现
    return config;
  }

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors(res) {
    // 子类中需要提供具体实现
    return res;
  }

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch(error) {
    // 子类中需要提供具体实现
  }

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch(error) {
    // 子类中需要提供具体实现
  }
}
