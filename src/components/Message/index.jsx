import { createRoot } from "react-dom/client";
import Message from "./Message";
// 定义一个消息管理对象，用于创建和管理不同类型的消息提示
const message = {
  dom: null,
  /**
   * 创建一个成功类型的消息提示
   * @param {Object} options 包含消息内容和显示时长的对象
   * @param {string} options.content 消息内容
   * @param {number} [options.duration=1500] 消息显示的时长，单位为毫秒
   */
  success({ content, duration = 1500 }) {
    // 创建DOM元素用于放置消息组件
    this.dom = document.createElement("div");
    // 定义成功类型的消息组件
    const JSXdom = (
      <Message content={content} duration={duration} type="success"></Message>
    );
    // 渲染消息组件到创建的DOM元素中
    createRoot(this.dom).render(JSXdom);
    // 将消息DOM元素添加到页面的body中
    document.body.appendChild(this.dom);
  },
  /**
   * 创建一个错误类型的消息提示
   * @param {Object} options 包含消息内容和显示时长的对象
   * @param {string} options.content 消息内容
   * @param {number} [options.duration] 消息显示的时长，单位为毫秒
   */
  error({ content, duration }) {
    // 创建DOM元素用于放置错误类型的消息组件
    this.dom = document.createElement("div");
    // 定义错误类型的消息组件
    const JSXdom = (
      <Message content={content} duration={duration} type="error"></Message>
    );
    // 渲染错误消息组件
    createRoot(this.dom).render(JSXdom);
    // 将错误消息DOM元素添加到页面的body中
    document.body.appendChild(this.dom);
  },
  /**
   * 创建一个警告类型的消息提示
   * @param {Object} options 包含消息内容和显示时长的对象
   * @param {string} options.content 消息内容
   * @param {number} [options.duration] 消息显示的时长，单位为毫秒
   */
  warning({ content, duration }) {
    // 创建DOM元素用于放置警告类型的消息组件
    this.dom = document.createElement("div");
    // 定义警告类型的消息组件
    const JSXdom = (
      <Message content={content} duration={duration} type="warning"></Message>
    );
    // 渲染警告消息组件
    createRoot(this.dom).render(JSXdom);
    // 将警告消息DOM元素添加到页面的body中
    document.body.appendChild(this.dom);
  },
  /**
   * 创建一个信息类型的消息提示（此方法似乎存在错误，应为info而非warning）
   * @param {Object} options 包含消息内容和显示时长的对象
   * @param {string} options.content 消息内容
   * @param {number} [options.duration] 消息显示的时长，单位为毫秒
   */
  info({ content, duration }) {
    // 创建DOM元素用于放置信息类型的消息组件
    this.dom = document.createElement("div");
    // 定义信息类型的消息组件
    const JSXdom = (
      <Message content={content} duration={duration} type="warning"></Message>
    );
    // 渲染信息消息组件
    createRoot(this.dom).render(JSXdom);
    // 将信息消息DOM元素添加到页面的body中
    document.body.appendChild(this.dom);
  },
};

export default message;
