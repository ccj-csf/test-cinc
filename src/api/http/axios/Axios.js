import axios from "axios";
import qs from "qs";
import { AxiosCanceler } from "./axiosCancel";
import { isFunction } from "@/utils";
import { cloneDeep } from "lodash-es";
import { ContentTypeEnum, RequestEnum } from "@/constants";
export * from "./axiosTransform";

export class Axios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description: 创建axios实例
   */
  createAxios(config) {
    this.axiosInstance = axios.create(config);
  }

  getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  /**
   * @description: 重新配置Axios
   */
  configAxios(config) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: 设置通用 header
   */
  setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: 拦截器配置
   */
  setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config) => {
      const { ignoreCancelToken } = config.headers;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;
      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }

  /**
   * @description: 文件上传
   */
  uploadFile(config, params) {
    const formData = new window.FormData();
    const customFilename = params.name || "file";

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, value);
      });
    }

    return this.axiosInstance.request({
      ...config,
      method: "POST",
      data: formData,
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  // 支持Form-Data
  supportFormData(config) {
    const headers = config.headers || this.options.headers;
    const contentType = headers["Content-Type"] || headers["content-type"];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, "data") ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" }),
    };
  }

  get(config, options) {
    return this.request({ ...config, method: "GET" }, options);
  }

  post(config, options) {
    return this.request({ ...config, method: "POST" }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: "PUT" }, options);
  }

  patch(config, options) {
    return this.request({ ...config, method: "PATCH" }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: "DELETE" }, options);
  }

  request(config, options) {
    let conf = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;
    const opt = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          console.log("res1111 :>> ", res);
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res);
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          reject(e);
        });
    });
  }
}
