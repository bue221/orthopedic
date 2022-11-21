import { notification } from "antd";
import { ArgsProps } from "antd/es/notification/interface";
import { NotificationType } from "src/types/notifyAntd.interfaces";

const useNotify = (): {
  toast: (type: NotificationType, args: ArgsProps) => void;
} => {
  // const [api, contextHolder] = notification.useNotification();

  // const toast = (type: NotificationType, args: ArgsProps) => {
  //   api[type]({ ...args, message: args.message ?? "" });
  // };

  const toast = (type: NotificationType, args: ArgsProps) => {
    notification[type]({
      ...args,
      message: args.message ?? "",
    });
  };

  return { toast };
};

export default useNotify;
