import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationIcon.css";
// import { useNavigate } from "react-router-dom";
function NotificationIcon() {
  // const navigate = useNavigate();
  return (
    <div className="notification-icon">
      <FontAwesomeIcon
        icon={faBell}
        // onClick={() => navigate("/home/notificationPage")}
      />
    </div>
  );
}

export default NotificationIcon;
