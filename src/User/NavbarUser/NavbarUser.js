import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NotificationIcon from "../../Components/Logo&NotificationIcon/NotificationIcon";
import Logo from "../../Components/Logo&NotificationIcon/Logo";
import MyProfileIcon from "../../Components/MyProfileIcon/MyProfileIcon";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarUser.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { persistor } from "../../Redux/store/store";
import { logout } from "../../Redux/actions/authActions";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarUser() {
  const token = useSelector((state) => state.auth.token);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveLink(getActiveLinkFromPathname(pathname));
  }, []);

  const getActiveLinkFromPathname = (pathname) => {
    const paths = {
      "/home": "home",
      "/home/trackingOrdersUser": "home/trackingOrdersUser",
      "/home/contact": "home/contact",
      "/home/aboutUs": "home/aboutUs",
      "/home/ourTeam": "home/ourTeam",
      "/home/notificationPage": "home/notificationPage",
      "/home/profile/myOrderPage": "home/profile/myOrderPage",
      "/home/profile/questions": "home/profile/questions",
      "/home/profile/information": "home/profile/information",
      "/home/profile/delivery": "home/profile/delivery",
      "/home/profile/settings": "home/profile/settings",
      "/loginUser": "loginUser",
    };
    return paths[pathname] || "home";
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(`/${link}`);
  };

  const links = [
    { path: "home/profile/myOrderPage", text: "My Orders" },
    { path: "home/profile/delivery", text: "Deliveries" },
    { path: "home/profile/information", text: "Information" },
    { path: "home/profile/questions", text: "Questions" },
    { path: "home/profile/settings", text: "Settings" },
  ];

  const dispatch = useDispatch();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to log out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(
            "https://hatley.runasp.net/api/UserAccount/logout"
          );
          if (
            response.status === 200 &&
            response.data.message === "Logout successful"
          ) {
            dispatch(logout());
            persistor.purge();
            navigate("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: "Logout failed. Please try again.",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error logging out: ${error.message}`,
          });
        }
      }
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`allNavbar fixed-top ${visible ? "visible" : "hidden"}`}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              active={activeLink === "home"}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              active={activeLink === "home/trackingOrdersUser"}
              onClick={() => handleLinkClick("home/trackingOrdersUser")}
            >
              Tracking Orders
            </Nav.Link>
            <Nav.Link
              active={activeLink === "home/contact"}
              onClick={() => handleLinkClick("home/contact")}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              active={activeLink === "home/aboutUs"}
              onClick={() => handleLinkClick("home/aboutUs")}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              active={activeLink === "home/ourTeam"}
              onClick={() => handleLinkClick("home/ourTeam")}
            >
              Our Team
            </Nav.Link>
            {isMobile && (
              <>
                {links.map((link) => (
                  <Nav.Link
                    key={link.path}
                    active={activeLink === link.path}
                    onClick={() => handleLinkClick(link.path)}
                  >
                    {link.text}
                  </Nav.Link>
                ))}
                {token ? (
                  <Nav.Link
                    className={`nav-side-link ${
                      activeLink === "/loginUser" ? "active" : ""
                    }`}
                    onClick={handleLogout}
                  >
                    <div style={{ whiteSpace: "nowrap" }}>
                      <FontAwesomeIcon
                        icon={["fas", "sign-out-alt"]}
                        className="me-3"
                      />
                      <span>Logout</span>
                    </div>
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    className={`nav-side-link ${
                      activeLink === "/loginUser" ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick("loginUser")}
                  >
                    <div style={{ whiteSpace: "nowrap" }}>
                      <FontAwesomeIcon
                        icon={["fas", "sign-in-alt"]}
                        className="me-3"
                      />
                      <span>Login</span>
                    </div>
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          {/* <div className="notification-icon">
            <Link to={"/home/notificationPage"}>
              <NotificationIcon />
            </Link>
          </div> */}
          <div
            className="login-button"
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarUser;
