/**
 * 定义HTTP请求成功和资源未找到的状态码。
 */
export const HTTP_SUCCESS = 200; // HTTP请求成功的状态码
export const HTTP_NOT_FOUND = 404; // 请求的资源未找到的状态码

/**
 * 定义HTTP请求方法的枚举。
 */
export const RequestEnum = {
  GET: "GET", // 获取资源
  POST: "POST", // 提交数据并获取资源
  PUT: "PUT", // 更新资源
  DELETE: "DELETE", // 删除资源
};

/**
 * 定义HTTP请求内容类型的枚举。
 */
export const ContentTypeEnum = {
  // 表示请求体为JSON格式
  JSON: "application/json;charset=UTF-8",
  // 表示请求体为URL编码格式（通常用于表单提交）
  FORM_URLENCODED: "application/x-www-form-urlencoded;charset=UTF-8",
  // 表示请求体为多部分表单数据格式（通常用于文件上传）
  FORM_DATA: "multipart/form-data;charset=UTF-8",
};
