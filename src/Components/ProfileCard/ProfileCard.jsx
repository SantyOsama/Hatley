import React, { useState, useRef } from "react";
import { Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileCard.css"; // Ensure this import statement is here
import defaultProfileImage from "../../Tools/Images/MyProfile.svg";
import axios from "axios";

const ProfileCard = () => {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      uploadImageToServer(file); // Upload image to server
    }
  };

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("profile_img", file);

    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/UserAccount/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-image-container" onClick={handleImageClick}>
        <Image
          src={profileImage}
          roundedCircle
          style={{ width: "100px", height: "100px" }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <div className="overlay">
          <span>new image</span>
        </div>
      </div>
      <h3 className="profile-name">John Doe</h3>
      <Button variant="primary" onClick={handleImageClick}>
        Upload New Photo
      </Button>
    </div>
  );
};

export default ProfileCard;
