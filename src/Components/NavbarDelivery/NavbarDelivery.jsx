import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NotificationIcon from "../../Components/Logo&NotificationIcon/NotificationIcon";
import Logo from "../../Components/Logo&NotificationIcon/Logo";
import MyProfileIcon from "../../Components/MyProfileIcon/MyProfileIcon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { logout } from "../../Redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarDelivery() {
  const token = useSelector((state) => state.auth.token);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const profileImage = useSelector((state) => state.auth.profileImage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      "/delivery/home-delivery": "delivery/home-delivery",
      "/delivery/home-delivery/trackingOrdersDelivery":
        "delivery/home-delivery/trackingOrdersDelivery",
      "/delivery/home-delivery/contact": "delivery/home-delivery/contact",
      "/delivery/home-delivery/aboutUs": "delivery/home-delivery/aboutUs",
      "/delivery/home-delivery/ourTeam": "delivery/home-delivery/ourTeam",
      "/home-delivery/notification": "home-delivery/notification",
      "/home-delivery/profile-delivery/information":
        "home-delivery/profile-delivery/information",
      "/home-delivery/profile-delivery/questions":
        "home-delivery/profile-delivery/questions",
      "/home-delivery/profile-delivery/ratings":
        "home-delivery/profile-delivery/ratings",
      "/home-delivery/profile-delivery/orders":
        "home-delivery/profile-delivery/orders",
      "/home-delivery/profile-delivery/settings":
        "home-delivery/profile-delivery/settings",
      "/delivery/loginDelivery": "delivery/loginDelivery",
    };
    return paths[pathname] || "delivery/home-delivery";
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(`/${link}`);
  };

  const links = [
    { path: "home-delivery/profile-delivery/information", text: "Information" },
    { path: "home-delivery/profile-delivery/questions", text: "Questions" },
    { path: "home-delivery/profile-delivery/ratings", text: "Ratings" },
    { path: "home-delivery/profile-delivery/orders", text: "Orders" },
    { path: "home-delivery/profile-delivery/settings", text: "Settings" },
  ];

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
            "https://hatley.runasp.net/api/DeliveryAccount/logout"
          );
          if (
            response.status === 200 &&
            response.data.message === "Logout successful"
          ) {
            dispatch(logout());
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
        <Navbar.Brand onClick={() => navigate("/delivery/home-delivery")}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              active={activeLink === "delivery/home-delivery"}
              onClick={() => handleLinkClick("delivery/home-delivery")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              active={
                activeLink === "delivery/home-delivery/trackingOrdersDelivery"
              }
              onClick={() =>
                handleLinkClick("delivery/home-delivery/trackingOrdersDelivery")
              }
            >
              Tracking Orders
            </Nav.Link>
            <Nav.Link
              active={activeLink === "delivery/home-delivery/contact"}
              onClick={() => handleLinkClick("delivery/home-delivery/contact")}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              active={activeLink === "delivery/home-delivery/aboutUs"}
              onClick={() => handleLinkClick("delivery/home-delivery/aboutUs")}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              active={activeLink === "delivery/home-delivery/ourTeam"}
              onClick={() => handleLinkClick("delivery/home-delivery/ourTeam")}
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
                      activeLink === "/delivery/loginDelivery" ? "active" : ""
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
                      activeLink === "/delivery/loginDelivery" ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick("delivery/loginDelivery")}
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
            <Link to={"/home-delivery/notification"}>
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
                  <Link to={"/home-delivery/profile-delivery/information"}>
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
                  <Link to={"/home-delivery/profile-delivery/information"}>
                    <MyProfileIcon />
                  </Link>
                )}
              </>
            ) : (
              <Link to={"/delivery/loginDelivery"}>
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDelivery;
