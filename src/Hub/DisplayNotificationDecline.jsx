import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Store } from "react-notifications-component";
import "animate.css/animate.min.css";

const DisplayNotificationDecline = ({ message }) => {
  const notificationDisplayedRef = useRef(false);

  useEffect(() => {
    if (message && !notificationDisplayedRef.current) {
      Store.addNotification({
        title: "Offer Declined",
        message,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });

      notificationDisplayedRef.current = true;
    }
  }, [message]);

  return null;
};

DisplayNotificationDecline.propTypes = {
  message: PropTypes.string.isRequired,
};

export default DisplayNotificationDecline;
