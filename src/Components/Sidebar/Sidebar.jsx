import React, { useState, useEffect, useRef } from "react";
import { Image, Nav } from "react-bootstrap";
import "./Sidebar.css";
import Avatar from "./../../Tools/Images/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarUser from "../../User/NavbarUser/NavbarUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfileImage } from "../../Redux/actions/authActions";
import { persistor } from "../../Redux/store/store";
import Swal from "sweetalert2";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("deliveries");
  const profileImage = useSelector((state) => state.auth.profileImage);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveLink(getActiveLinkFromPathname(pathname));
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://hatley.runasp.net/api/User/profile",
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
      case "/home/profile/myOrderPage":
        return "home/profile/myOrderPage";
      case "/home/profile/questions":
        return "home/profile/questions";
      case "/home/profile/delivery":
        return "home/profile/delivery";
      case "/home/profile/information":
        return "home/profile/information";
      case "/deliveries":
        return "deliveries";
      case "/home/profile/settings":
        return "home/profile/settings";
      case "loginUser":
        return "/loginUser";
      default:
        return "home";
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
        // setProfileImageLocal(base64Image);
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
        "https://hatley.runasp.net/api/User/uploadImage",
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
            "https://hatley.runasp.net/api/UserAccount/logout"
          );
          if (
            response.status === 200 &&
            response.data.message === "Logout successful"
          ) {
            dispatch(logout());
            persistor.purge();
            navigate("/loginUser");
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
      <NavbarUser />
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
              {profileImage ? (
                <Image src={profileImage} className="profile-image mb-2" />
              ) : (
                <Image src={Avatar} className="profile-image mb-2" />
              )}

              <div className="sidebar-overlay">
                <span>New image</span>
              </div>
            </div>
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
            <span className={`profile-text `}>(305)</span>
          </Nav.Link>
          <Nav.Link
            eventKey="home/profile/myOrderPage"
            className={`nav-side-link ${
              activeLink === "home/profile/myOrderPage" ? "active" : ""
            }`}
            onClick={() => navigate("/home/profile/myOrderPage")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-clock-rotate-left"
                className="me-2"
              />
              My Orders
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="deliveries"
            className={`nav-side-link ${
              activeLink === "home/profile/delivery" ? "active" : ""
            }`}
            onClick={() => navigate("/home/profile/delivery")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon="fa-solid fa-bars" className="me-3" />
              Deliveries
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home/profile/information"
            className={`nav-side-link ${
              activeLink === "home/profile/information" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("home/profile/information")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-circle-info"
                style={{ fontSize: "22px", marginRight: "12px" }}
              />
              Information
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home/profile/questions"
            className={`nav-side-link ${
              activeLink === "home/profile/questions" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("home/profile/questions")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon
                icon="fa-solid fa-question"
                className="me-3"
                style={{ fontSize: "25px" }}
              />
              Questions
            </div>
          </Nav.Link>
          <Nav.Link
            eventKey="home/settings"
            className={`nav-side-link ${
              activeLink === "home/profile/settings" ? "active" : ""
            }`}
            onClick={() => navigate("/home/profile/settings")}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <FontAwesomeIcon icon="fa-solid fa-gear" className="me-3" />
              Settings
            </div>
          </Nav.Link>
          <Nav.Link
            className={`nav-side-link ${
              activeLink === "/loginUser" ? "active" : ""
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

export default Sidebar;
