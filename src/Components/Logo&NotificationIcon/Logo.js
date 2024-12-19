import hatleyLogo from "../../Tools/Images/Logo.jpg";
import "../Logo&NotificationIcon/Logo.css";
// import LoginButton from "./LoginButton";
// import NotificationIcon from "./NotificationIcon";
function Logo() {
  return (
    <div className="logo-container " style={{ cursor: "pointer" }}>
      <img src={hatleyLogo} alt="" style={{ borderRadius: "50%" }} />
      <span className="logo-text ">Hatley</span>
    </div>
  );
}

export default Logo;
