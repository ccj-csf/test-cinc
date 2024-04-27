// 导入配置、常量、工具函数和Axios实例
import config from "@/config";
import { ContentTypeEnum } from "@/constants";
import { deepMerge } from "@/utils";
import { Axios } from "./Axios";
import { transform } from "./transform";

// 从配置中解构出URL前缀和API地址
const { urlPrefix, apiUrl } = config;

/**
 * 创建一个Axios实例
 * @param {Object} opt - 用户自定义配置，将与默认配置合并
 * @returns {Axios} - 返回一个配置好的Axios实例
 */
const createAxios = (opt) => {
  // 使用deepMerge合并默认配置和用户自定义配置
  return new Axios(
    deepMerge(
      {
        // 认证方案，默认为Bearer
        authenticationScheme: "Bearer",
        // 请求超时时间，默认为50秒
        timeout: 50 * 1000,
        // 基础接口地址，会加在apiUrl前
        // baseURL: '',
        // 请求头，默认使用JSON格式
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 数据处理方法
        transform,
        // 请求配置项，以下选项均可在单个接口请求中覆盖
        requestOptions: {
          // 默认将URL前缀加入到URL中
          joinPrefix: true,
          // 是否返回原生响应头，例如当需要访问头部信息时
          isReturnNativeResponse: false,
          // 是否转换响应数据
          isTransformResponse: true,
          // POST请求是否将参数加入到URL中
          joinParamsToUrl: false,
          // 提交参数日期格式化，默认开启
          formatDate: true,
          // 错误消息提示类型
          errorMessageMode: "message",
          // API地址
          apiUrl,
          // API拼接地址
          urlPrefix: urlPrefix,
          // 请求是否添加时间戳
          joinTime: false,
          // 是否忽略重复请求
          ignoreCancelToken: true,
          // 请求是否携带Token
          withToken: true,
        },
      },
      opt || {}
    )
  );
};

/**
 * 请求类，封装了HTTP请求方法
 */
class Request {
  constructor() {
    this.http = createAxios(); // 创建Axios实例
  }

  /**
   * GET请求
   * @param {Object} config - 请求配置
   * @returns {Promise} - 返回一个Promise对象
   */
  async get(config) {
    return this.http.get(config, config);
  }

  /**
   * POST请求
   * @param {Object} config - 请求配置
   * @returns {Promise} - 返回一个Promise对象
   */
  async post(config) {
    return this.http.post(config, config);
  }

  /**
   * DELETE请求
   * @param {Object} config - 请求配置
   * @returns {Promise} - 返回一个Promise对象
   */
  async delete(config) {
    return this.http.delete(config, config);
  }

  /**
   * PUT请求
   * @param {Object} config - 请求配置
   * @returns {Promise} - 返回一个Promise对象
   */
  async put(config) {
    return this.http.put(config, config);
  }

  /**
   * PATCH请求
   * @param {Object} config - 请求配置
   * @returns {Promise} - 返回一个Promise对象
   */
  async patch(config) {
    return this.http.patch(config, config);
  }
}

export default Request;
