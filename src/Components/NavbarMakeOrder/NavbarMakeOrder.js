import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MyProfileIcon from "../MyProfileIcon/MyProfileIcon";
import NotificationIcon from "../Logo&NotificationIcon/NotificationIcon";
import "../NavbarMakeOrder/NavbarMakeOrder.css";
// import LoginButton from "../Logo&NotificationIcon/LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
function NavbarMakeOrder() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`  ${visible ? "visible" : "hidden"} `}
    >
      <Container className="container-data-nav">
        <Navbar.Brand
          className=""
          onClick={() => navigate("/")}
          style={{ color: "#06004F", cursor: "pointer" }}
        >
          <span>
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            <span className="ms-3">Back</span>
          </span>
        </Navbar.Brand>
        <Nav className="me-bold">Make Order</Nav>
        <div className="notification-icon ">
          <Link to={"/home/notificationPage"}>
            <NotificationIcon />
          </Link>
        </div>
        <div
          className="login-button me-2"
          style={{
            maxWidth: "50px",
          }}
        >
          {token ? (
            <>
              {profileImage ? (
                <Link to={"/home/profile/myOrderPage"}>
                  <img
                    src={profileImage}
                    alt="img"
                    style={{
                      maxWidth: "100%",
                      height: "50px",
                      border: "1px solid white",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
              ) : (
                <Link to={"/home/profile/myOrderPage"}>
                  <MyProfileIcon />
                </Link>
              )}
            </>
          ) : (
            <Link to={"/loginUser"}>
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
export default NavbarMakeOrder;
