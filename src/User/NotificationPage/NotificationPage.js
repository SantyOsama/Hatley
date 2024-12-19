import NavbarUser from "../NavbarUser/NavbarUser";
import Notification from "../../Components/Notification/Notification";
import "./NotificationPage.css";
function NotificationPage() {
  return (
    <>
      <NavbarUser />
      <div className="notification-one">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </>
  );
}
export default NotificationPage;
