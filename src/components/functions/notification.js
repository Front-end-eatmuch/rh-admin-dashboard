import { notification } from "antd";

const openNotificationWithIcon = (type, text) => {
  notification[type]({
    message: "Notification",
    description: text
  });
};

export { openNotificationWithIcon };
