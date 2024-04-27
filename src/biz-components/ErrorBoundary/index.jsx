import { Component } from "react";

/**
 * ErrorBoundary是一个React组件，用于捕获子组件中发生的JavaScript错误，
 * 防止整个应用崩溃，并提供错误信息。它也提供了错误重载页面的UI。
 */
export default class ErrorBoundary extends Component {
  /**
   * 构造函数，初始化状态。
   * @param {Object} props - 组件传入的props。
   */
  constructor(props) {
    super(props);
    // 状态初始化：没有错误发生。
    this.state = { hasError: false, errorInfo: null };
  }

  /**
   * 当子组件抛出异常，此静态方法会被调用，用于更新父组件的状态。
   * @returns {Object} 返回一个对象，标记错误已经发生。
   */
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /**
   * 组件错误捕获方法。当捕获到错误，会将错误信息存储到组件的状态中。
   * @param {Object} error - 发生的错误对象。
   * @param {Object} errorInfo - 关于错误的详细信息。
   */
  componentDidCatch(error, errorInfo) {
    // 控制台打印错误信息。
    console.error("ErrorBoundary caught an error", error, errorInfo);
    // 更新状态，包含错误信息。
    this.setState({ errorInfo });
  }

  /**
   * 渲染方法，根据错误状态显示不同的内容。
   * @returns {JSX.Element} 返回错误页面或子组件。
   */
  render() {
    // 如果有错误发生，显示错误页面。
    if (this.state.hasError) {
      const { errorInfo } = this.state;
      // 获取错误发生的位置。
      const errorLocation = errorInfo
        ? errorInfo.componentStack.split("\n")[1].trim()
        : "Unknown location";

      // 渲染错误页面UI。
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="max-w-lg w-full bg-white shadow-md rounded-md p-8">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-800 mb-4">
              Error occurred at: {errorLocation}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    // 如果没有错误，渲染子组件。
    return this.props.children;
  }
}
