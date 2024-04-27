/**
 * 配置对象，包含应用运行时所需的外部资源路径配置
 *
 * urlPrefix: 请求资源时的前缀路径
 * publicPath: 静态资源的公共路径，由VITE_PUBLIC_PATH环境变量决定
 * apiUrl: API请求的基础URL，由VITE_GLOB_API_URL环境变量决定
 */
export default {
  urlPrefix: "",
  publicPath: import.meta.env.VITE_PUBLIC_PATH,
  apiUrl: import.meta.env.VITE_API_URL,
};
