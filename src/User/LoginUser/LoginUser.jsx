import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import "./LoginUser.css";
import {
  EmailInput,
  Logo,
  PasswordInput,
  Spinners,
  VerticalLinks,
} from "../../Components";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setProfileImage,
  setToken,
  setUserType,
} from "../../Redux/actions/authActions";

function LoginUser2({
  title = "Sign in as User",
  link1 = "",
  path1 = "",
  link2 = "",
  path2 = "",
  link3 = "",
  path3 = "",
}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [requestDuration, setRequestDuration] = useState(null);
  console.log(requestDuration);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();
    if (!formData.email || !formData.password) {
      Swal.fire(
        "Validation Error",
        "Please fill all required fields.",
        "error"
      );
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/UserAccount/login",
        formData
      );
      const endTime = Date.now();
      const duration = endTime - startTime;
      setRequestDuration(duration);

      if (response.status === 200 && response.data) {
        const token = response.data.token;
        dispatch(setToken(token));
        dispatch(setEmail(formData.email));
        dispatch(setUserType("USER"));
        try {
          const response = await axios.get(
            "https://hatley.runasp.net/api/User/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setProfileImage(response.data.photo));
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
        // navigate("/test");
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire("Error", "Password not correct", "error");
        } else if (error.response.status === 404) {
          Swal.fire("Error", "Email not correct", "error");
        } else {
          Swal.fire(
            "Error",
            error.response.data || "An unexpected error occurred",
            "error"
          );
        }
      } else {
        Swal.fire("Error", "Network error or server not responding", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="div-container-login-user">
      <Row className="mb-2">
        <Logo />
      </Row>
      <Row className="mb-4">
        <h1
          className="bold-text"
          style={{ fontWeight: "bold", opacity: "75%", fontSize: "2rem" }}
        >
          {title}
        </h1>
      </Row>
      <Row className="mb-2">
        <p style={{ fontSize: "20px", fontWeight: "normal", color: "#9C9C9C" }}>
          Please sign in to your account
        </p>
      </Row>
      {loading ? (
        <Spinners />
      ) : (
        <form onSubmit={handleSubmit}>
          <Row className="input-email-user">
            <EmailInput
              value={formData.email}
              onChange={handleInputChange}
              isValid={true}
              label="Email Address"
              type="email"
              name="email"
              required
            />
          </Row>
          <Row>
            <PasswordInput
              value={formData.password}
              onChange={handleInputChange}
              isValid={true}
              label="Password"
              type="password"
              name="password"
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </Row>
          <button type="submit" className="mt-1 submit-button">
            Login
          </button>
        </form>
      )}
      <VerticalLinks
        link1={link1}
        path1={path1}
        link2={link2}
        path2={path2}
        link3={link3}
        path3={path3}
      />
    </div>
  );
}

export default LoginUser2;
