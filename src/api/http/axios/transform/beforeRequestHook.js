import { RequestEnum } from "@/constants";
import { setObjToUrlParams, isString } from "@/utils";
import { formatRequestDate, joinTimestamp } from "./helper";

/**
 * @description 请求之前处理config
 */
export const beforeRequestHook = (config, options) => {
  const {
    apiUrl,
    joinPrefix,
    joinParamsToUrl,
    formatDate,
    joinTime = true,
    urlPrefix,
  } = options;

  if (joinPrefix) {
    config.url = `${urlPrefix}${config.url}`;
  }
  if (apiUrl && isString(apiUrl)) {
    config.url = `${apiUrl}${config.url}`;
  }
  const params = config.params || {};
  const data = config.data || {};
  formatDate && data && !isString(data) && formatRequestDate(data);
  if (config.method?.toUpperCase() === RequestEnum.GET) {
    if (!isString(params)) {
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      config.params = Object.assign(
        params || {},
        joinTimestamp(joinTime, false)
      );
    } else {
      // 兼容restful风格
      config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
      config.params = undefined;
    }
  } else {
    if (!isString(params)) {
      formatDate && formatRequestDate(params);
      if (
        Reflect.has(config, "data") &&
        config.data &&
        Object.keys(config.data).length > 0
      ) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(
          config.url,
          Object.assign({}, config.params, config.data)
        );
      }
    } else {
      // 兼容restful风格
      config.url = config.url + params;
      config.params = undefined;
    }
  }
  return config;
};
