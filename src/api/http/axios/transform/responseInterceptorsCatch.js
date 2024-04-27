import { checkStatus } from "./checkStatus";

/**
 * @description: 响应错误处理
 */
export const responseInterceptorsCatch = (error) => {
  const { response, code, message, config } = error || {};
  const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
  const msg = response?.data?.message ?? "";
  const err = error?.toString?.() ?? "";
  let errMessage = "";

  try {
    if (code === "ECONNABORTED" && message && !message.includes("timeout")) {
      errMessage = "接口请求超时,请刷新页面重试!";
    }
    if (err.includes("Network Error")) {
      errMessage = "网络异常，请检查您的网络连接是否正常!";
    }
    console.log("错误提示", errMessage);
  } catch (error) {
    throw new Error(error.toString());
  }
  checkStatus(response?.status, msg, errorMessageMode);
  return Promise.reject(error);
};
