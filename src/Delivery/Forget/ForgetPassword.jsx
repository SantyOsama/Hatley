import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./ForgetPassword.css";
import { validateEmail } from "../../Tools/validations/validateEmail.js";
import Swal from "sweetalert2";
import { VerticalLinks, EmailInput, Spinners } from "../../Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isValid = name === "email" ? validateEmail(value) : true;
    if (name === "email") {
      setEmail(value);
      setEmailValid(isValid);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hatley.runasp.net/api/DeliveryAccount/forget?mail=${email}`
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Login with new password that has been sent to your email.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "submit-button",
          },
        }).then(() => {
          navigate("/delivery/loginDelivery");
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          Swal.fire("Error", "Email does not exist.", "error");
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
    <div className="forget-password-wrapper">
      <div className="forget-password-container">
        {loading ? (
          <Spinners />
        ) : (
          <>
            <FontAwesomeIcon icon={faEnvelope} className="mail-icon" />
            <h1 className="forget-password-title">Forgot Password?</h1>
            <p className="forget-password-instruction">
              Enter your email below to receive your password reset
              instructions.
            </p>
            <form onSubmit={handleSubmit} className="forget-password-form">
              <EmailInput
                value={email}
                onChange={handleInputChange}
                isValid={emailValid}
                label="Email Address"
                type="email"
              />
              {!emailValid && (
                <span className="invalid-feedback">
                  Please enter a valid email address.
                </span>
              )}
              <button className="submit-button" type="submit">
                Send Reset Link
              </button>
              <VerticalLinks link1="Try Sign in again" path1="/loginUser" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
