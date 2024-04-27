import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

// 创建一个用于消息提示的上下文
const MessageContext = createContext(null);

// 自定义Alert组件，使用forwardRef来传递ref
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * MessageProvider组件：提供消息提示功能的上下文提供者。
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 子组件
 * @returns {JSX.Element} - 包含MessageContext.Provider和Snackbar的JSX元素
 */
export const MessageProvider = ({ children }) => {
  // 状态管理：消息是否显示
  const [open, setOpen] = useState(false);
  // 状态管理：消息内容和严重性
  const [alertProps, setAlertProps] = useState({
    message: "",
    severity: "success",
  });
  // 状态管理：消息自动隐藏的持续时间
  const [autoHideDuration, setAutoHideDuration] = useState(3000);

  // 使用useCallback优化 showMessage函数，避免不必要的渲染
  const showMessage = useCallback((props, duration = 3000) => {
    setAlertProps({
      ...props,
      key: new Date().getTime(), // 为每个消息设置唯一key
    });
    setOpen(true);
    setAutoHideDuration(duration);
  }, []);

  // 使用useCallback优化 handleClose函数，避免不必要的渲染
  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }, []);

  // 使用useMemo优化，避免不必要的计算
  const contextValue = useMemo(
    () => ({
      showMessage,
      showSuccessMessage: (message, duration) =>
        showMessage({ message, severity: "success" }, duration),
      showErrorMessage: (message, duration) =>
        showMessage({ message, severity: "error" }, duration),
    }),
    [showMessage]
  );

  // 渲染上下文提供者和消息提示框
  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert {...alertProps}>{alertProps.message}</Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
};

/**
 * useMessage钩子：用于从上下文中消费消息功能。
 * @returns {Object} - 包含 showMessage 等方法的对象
 */
export const useMessage = () => useContext(MessageContext);
