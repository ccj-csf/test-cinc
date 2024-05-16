// useMessage.ts
import { message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useMemo(
    () => ({
      success: (content: string) => {
        messageApi.open({
          type: "success",
          content,
        });
      },
      error: (content: string) => {
        messageApi.open({
          type: "error",
          content: <span className="text-red-500">{content}</span>,
          icon: <ExclamationCircleOutlined />,
        });
      },
      warning: (content: string) => {
        messageApi.open({
          type: "warning",
          content,
        });
      },
    }),
    [messageApi]
  );

  // 返回显示消息的方法和contextHolder，contextHolder需要在组件的顶层渲染
  return { showMessage, contextHolder };
};

export default useMessage;
