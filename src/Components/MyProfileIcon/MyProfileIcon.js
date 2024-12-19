import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./MyProfileIcon.css";
// import { useNavigate } from "react-router-dom";
function MyProfileIcon() {
  // const navigate = useNavigate();

  return (
    <div className="my-profile-icon">
      <FontAwesomeIcon
        icon={faUser}
        // onClick={() => navigate("/home/profile/myOrderPage")}
      />
    </div>
  );
}

export default MyProfileIcon;
