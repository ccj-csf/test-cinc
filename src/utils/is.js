// 类型检查工具函数
const toString = Object.prototype.toString;

/**
 * 检查一个值是否为指定类型的对象
 * @param val 待检查的值
 * @param type 指定的类型字符串
 * @returns {boolean} 如果值是指定类型的对象则返回true，否则返回false
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 检查一个值是否定义（不是undefined）
 * @param val 待检查的值
 * @returns {boolean} 如果值已定义则返回true，否则返回false
 */
export function isDef(val) {
  return typeof val !== "undefined";
}

/**
 * 检查一个值是否未定义（是undefined）
 * @param val 待检查的值
 * @returns {boolean} 如果值未定义则返回true，否则返回false
 */
export function isUnDef(val) {
  return !isDef(val);
}

/**
 * 检查一个值是否为对象（但不包括null）
 * @param val 待检查的值
 * @returns {boolean} 如果值是对象则返回true，否则返回false
 */
export function isObject(val) {
  return val !== null && is(val, "Object");
}

/**
 * 检查一个值是否为空
 * 支持检查数组、字符串、Map、Set和对象是否为空
 * @param val 待检查的值
 * @returns {boolean} 如果值为空则返回true，否则返回false
 */
export function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

/**
 * 检查一个值是否为Date对象
 * @param val 待检查的值
 * @returns {boolean} 如果值是Date对象则返回true，否则返回false
 */
export function isDate(val) {
  return is(val, "Date");
}

/**
 * 检查一个值是否为null
 * @param val 待检查的值
 * @returns {boolean} 如果值为null则返回true，否则返回false
 */
export function isNull(val) {
  return val === null;
}

/**
 * 检查一个值是否为null或undefined
 * @param val 待检查的值
 * @returns {boolean} 如果值为null或undefined则返回true，否则返回false
 */
export function isNullAndUnDef(val) {
  return isUnDef(val) && isNull(val);
}

/**
 * 检查一个值是否为null、undefined或空字符串
 * @param val 待检查的值
 * @returns {boolean} 如果值为null、undefined或空字符串则返回true，否则返回false
 */
export function isNullOrUnDef(val) {
  return isUnDef(val) || isNull(val);
}

/**
 * 检查一个值是否为数字
 * @param val 待检查的值
 * @returns {boolean} 如果值为数字则返回true，否则返回false
 */
export function isNumber(val) {
  return is(val, "Number");
}

/**
 * 检查一个值是否为Promise对象
 * @param val 待检查的值
 * @returns {boolean} 如果值为Promise对象则返回true，否则返回false
 */
export function isPromise(val) {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

/**
 * 检查一个值是否为字符串
 * @param val 待检查的值
 * @returns {boolean} 如果值为字符串则返回true，否则返回false
 */
export function isString(val) {
  return is(val, "String");
}

/**
 * 检查一个值是否为函数
 * @param val 待检查的值
 * @returns {boolean} 如果值为函数则返回true，否则返回false
 */
export function isFunction(val) {
  return typeof val === "function";
}

/**
 * 检查一个值是否为布尔值
 * @param val 待检查的值
 * @returns {boolean} 如果值为布尔值则返回true，否则返回false
 */
export function isBoolean(val) {
  return is(val, "Boolean");
}

/**
 * 检查一个值是否为正则表达式
 * @param val 待检查的值
 * @returns {boolean} 如果值为正则表达式则返回true，否则返回false
 */
export function isRegExp(val) {
  return is(val, "RegExp");
}

/**
 * 检查一个值是否为数组
 * @param val 待检查的值
 * @returns {boolean} 如果值为数组则返回true，否则返回false
 */
export function isArray(val) {
  return val && Array.isArray(val);
}

/**
 * 检查一个值是否为Window对象
 * @param val 待检查的值
 * @returns {boolean} 如果值为Window对象则返回true，否则返回false
 */
export function isWindow(val) {
  return typeof window !== "undefined" && is(val, "Window");
}

/**
 * 检查一个值是否为HTML元素
 * @param val 待检查的值
 * @returns {boolean} 如果值为HTML元素则返回true，否则返回false
 */
export function isElement(val) {
  return isObject(val) && !!val.tagName;
}

/**
 * 检查一个值是否为Map对象
 * @param val 待检查的值
 * @returns {boolean} 如果值为Map对象则返回true，否则返回false
 */
export function isMap(val) {
  return is(val, "Map");
}

// 以下两个变量用于判断代码运行的环境
export const isServer = typeof window === "undefined";
export const isClient = !isServer;

/**
 * 将对象作为参数添加到URL
 * @param baseUrl URL的基础部分
 * @param obj 要添加到URL的参数对象
 * @returns {string} 完整的带有参数的URL字符串
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = "";
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
    }
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}

/**
 * 深度合并两个对象
 * @param src 待合并源对象，默认为空对象
 * @param target 目标对象，默认为空对象
 * @returns {Object} 合并后的对象
 */
export function deepMerge(src = {}, target = {}) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}
