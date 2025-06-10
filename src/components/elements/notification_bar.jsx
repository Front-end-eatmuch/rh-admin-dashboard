import { notification } from "antd";

export const openNotificationWithIcon = (type, text) => {
  notification[type]({
    message: "Notification",
    description: text,
  });
};
