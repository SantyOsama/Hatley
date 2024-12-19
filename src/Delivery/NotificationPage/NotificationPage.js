import "./NotificationPage.css";
import NavbarDelivery from "../../Components/NavbarDelivery/NavbarDelivery";
// import { NotificationDelivery } from "../../Components";
import NotificationDisplay from "../../Hub/NotificationDisplay";
function NotificationPage() {
  return (
    <>
      <NavbarDelivery />
      <div className="notification-one">
        <NotificationDisplay />
      </div>
    </>
  );
}
export default NotificationPage;
