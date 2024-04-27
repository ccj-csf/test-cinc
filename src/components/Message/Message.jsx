/**
 * 显示消息提示的组件。
 *
 * @param {Object} props 组件接收的参数。
 * @param {string} props.content 消息提示的内容。
 * @param {string} props.type 消息的类型，决定了提示框的样式。例如："success"、"error"等。
 * @param {number} [props.duration=3000] 消息提示显示的持续时间，单位为毫秒，默认为3000毫秒。
 * @returns 返回一个消息提示组件。
 */
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

function Message(props) {
  // 从props中提取content, type，并为duration设置默认值3000毫秒
  const { content, type, duration = 3000 } = props;

  // 使用开关控制消息提示的显示状态，默认为true，即打开状态
  const [open, setOpen] = useState(true);

  // 定义关闭消息提示的处理函数
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // 如果是因为点击其他区域关闭，则不进行任何操作
    }
    setOpen(false); // 对于其他原因导致的关闭，则将消息提示的状态设置为关闭
  };

  // 渲染组件
  return (
    <Snackbar
      open={open} // 根据open的状态决定是否显示消息提示
      autoHideDuration={duration} // 设置消息提示自动隐藏的持续时间
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // 设置消息提示的位置
      onClose={handleClose} // 设置关闭消息提示的处理函数
    >
      <Alert severity={type} variant="standard">
        {content}
      </Alert>
    </Snackbar>
  );
}

export default Message;
