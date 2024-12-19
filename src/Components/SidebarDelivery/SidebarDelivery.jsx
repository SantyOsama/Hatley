import React, { useState, useEffect, useRef } from "react";
import { Image, Nav } from "react-bootstrap";
import "./SidebarDelivery.css";
import Avatar from "./../../Tools/Images/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfileImage } from "../../Redux/actions/authActions";
import { persistor } from "../../Redux/store/store";

function SidebarDelivery() {
  const [activeLink, setActiveLink] = useState("deliveries");
  const profileImage = useSelector((state) => state.auth.profileImage);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveLink(getActiveLinkFromPathname(pathname));
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://hatley.runasp.net/api/Delivery/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (token) {
      fetchUserProfile();
    }
  }, [token, profileImage]);

  const getActiveLinkFromPathname = (pathname) => {
    switch (pathname) {
      case "/home-delivery/profile-delivery/information":
        return "home-delivery/profile-delivery/information";
      case "/home-delivery/profile-delivery/questions":
        return "home-delivery/profile-delivery/questions";
      case "/home-delivery/profile-delivery/ratings":
        return "home-delivery/profile-delivery/ratings";
      case "/deliveries":
        return "deliveries";
      case "/home-delivery/profile-delivery/settings":
        return "home-delivery/profile-delivery/settings";
      case "/home-delivery/profile-delivery/orders":
        return "home-delivery/profile-delivery/orders";
      default:
        return "home-delivery/profile-delivery/information";
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(`/${link}`);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // const base64Image = reader.result;
        // setProfileImage(base64Image);
        uploadImageToServer(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("profile_img", file);

    Swal.fire({
      title: "Uploading...",
      text: "Please wait while the image is being uploaded",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/Delivery/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response", response.data);
      dispatch(setProfileImage(response.data));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Image uploaded successfully",
      });
    } catch (error) {
      if (error.response) {
        console.error("Error uploading image:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error uploading image: ${error.response.data.message}`,
        });
      } else if (error.request) {
        console.error(
          "Error uploading image: No response received from server",
          error.request
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error uploading image: No response received from server",
        });
      } else {
        console.error("Error uploading image:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error uploading image: ${error.message}`,
        });
      }
    }
  };

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
    <>
      <div className="sideLeft">
        <Nav defaultActiveKey="/home" className="flex-column nav-side-bar">
          <Nav.Link
            eventKey="profile"
            className="d-flex flex-column align-items-center nav-side-bar-image"
          >
            <div
              className="sidebar-profile-image-container"
              onClick={handleImageClick}
            >
              {" "}
              {profileImage ? (
                <Image
                  src={profileImage}
                  className="profile-image mb-2"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Image
                  src={Avatar}
                  className="profile-image mb-2"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
              <div className="sidebar-overlay">
                <span>New Image</span>
              </div>
            </div>
            <span
              className={`profile-text ${
                activeLink === "home/profile/myOrderPage" ? "active" : ""
              }`}
            >
              (305)
            </span>
          </Nav.Link>
          <Nav.Link
            eventKey="home-delivery/profile-delivery/information"
            className={`nav-side-link ${
              activeLink === "home-delivery/profile-delivery/information"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/home-delivery/profile-delivery/information")
            }
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-clock-rotate-left"
                className="me-3"
              />
              Information
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home-delivery/profile-delivery/orders"
            className={`nav-side-link ${
              activeLink === "home-delivery/profile-delivery/orders"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/home-delivery/profile-delivery/orders")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon="fa-solid fa-bars" className="me-3" />
              Orders
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home-delivery/profile-delivery/ratings"
            className={`nav-side-link ${
              activeLink === "home-delivery/profile-delivery/ratings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleLinkClick("home-delivery/profile-delivery/ratings")
            }
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon="fa-solid fa-plus" className="me-3" />
              Ratings
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home-delivery/profile-delivery/questions"
            className={`nav-side-link ${
              activeLink === "home-delivery/profile-delivery/questions"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleLinkClick("home-delivery/profile-delivery/questions")
            }
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-location-dot"
                className="me-3"
              />
              Questions
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home-delivery/profile-delivery/settings"
            className={`nav-side-link ${
              activeLink === "home-delivery/profile-delivery/settings"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/home-delivery/profile-delivery/settings")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon="fa-solid fa-gear" className="me-3" />
              Settings
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="loginUser"
            className={`nav-side-link ${
              activeLink === "loginUser" ? "active" : ""
            }`}
            onClick={handleLogout}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-right-from-bracket"
                className="me-3"
              />
              <span>Logout</span>
            </div>
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
}

export default SidebarDelivery;
