import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";

const DisplayNotificationAll = ({ title, message, type, container }) => {
  const notificationDisplayedRef = useRef(false);

  useEffect(() => {
    if (message && !notificationDisplayedRef.current) {
      Store.addNotification({
        title: title || "Notification",
        message,
        type: type || "default",
        insert: "top",

        container: container || "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });

      notificationDisplayedRef.current = true;
    }
  }, [title, message, type, container]);

  return null;
};

DisplayNotificationAll.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "success", "danger", "info", "warning"]),
};

export default DisplayNotificationAll;
