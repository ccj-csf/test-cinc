import Auth from "@/utils/auth";

/**
 * @description: 请求拦截器处理
 */
export const requestInterceptors = (config, options) => {
  // 请求之前处理config
  console.log(
    " Auth.getToken()?.access_token :>> ",
    Auth.getToken()?.access_token
  );
  if (config?.requestOptions?.withToken === true) {
    const token = Auth.getToken() || "";
    // jwt token
    config.headers.Authorization = options.authenticationScheme
      ? `${options.authenticationScheme} ${token}`
      : token;
  }
  console.log("config-requestInterceptors", config);
  return config;
};
