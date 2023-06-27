import { NotificationType } from "../types";
const Notification = ({ content, type }: NotificationType) => {
  const styles = {
    color: type === "error" ? "red" : "green",
  };
  return <div style={styles}>{content}</div>;
};
export default Notification;
