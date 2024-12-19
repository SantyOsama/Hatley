import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import {
  EmailInput,
  Logo,
  PasswordInput,
  Spinners,
  VerticalLinks,
} from "../../Components";
import axios from "axios";
import Swal from "sweetalert2";
import {
  setEmail,
  setProfileImage,
  setToken,
  setUserType,
} from "../../Redux/actions/authActions";
import { useDispatch } from "react-redux";

function LoginUser2({
  title = "Sign in as Delivery",
  link1 = "",
  path1 = "",
  link2 = "",
  path2 = "",
  link3 = "",
  path3 = "",
}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [formData, setFormData] = useState({
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });
  const [loading, setLoading] = useState(false);
  const [requestDuration, setRequestDuration] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: { value: value, isValid: true },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/DeliveryAccount/login",
        {
          email: formData.email.value,
          password: formData.password.value,
        }
      );
      const endTime = Date.now();
      const duration = endTime - startTime;
      setRequestDuration(duration);
      console.log(requestDuration);
      if (response.status === 200) {
        const token = response.data.token;
        dispatch(setToken(token));
        dispatch(setEmail(formData.email.value));
        dispatch(setUserType("DELIVERY"));
        try {
          const response = await axios.get(
            "https://hatley.runasp.net/api/Delivery/profile",
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
        navigate("/delivery/home-delivery");
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
          style={{
            display: "block",
            fontWeight: "bold",
            opacity: "75%",
            fontSize: "2rem",
          }}
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
              value={formData.email.value}
              onChange={handleInputChange}
              isValid={formData.email.isValid}
              label={"Email Address"}
              type={"email"}
            />
          </Row>
          <Row>
            <PasswordInput
              value={formData.password.value}
              onChange={handleInputChange}
              isValid={formData.password.isValid}
              label={"Password"}
              type={"password"}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </Row>
          <button
            type="submit"
            className="mt-1 submit-button"
            // onClick={() => navigate("/delivery/home-delivery")}
          >
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
