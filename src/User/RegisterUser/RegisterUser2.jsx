import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import "./RegisterUser2.css";
import { validateEmail } from "../../Tools/validations/validateEmail";
import {
  validateSpecialChar,
  validateNumber,
  validateLowercase,
  validatePassword,
  validateUppercase,
} from "../../Tools/validations/validatePassword";
import { useNavigate } from "react-router-dom";
import {
  ConfirmPasswordInput,
  EmailInput,
  Logo,
  NameInput,
  PasswordInput,
  PhoneNumberInput,
  Spinners,
  VerticalLinks,
} from "../../Components";
import axios from "axios";
import Swal from "sweetalert2";

function RegisterUser2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
    phoneNumber: { value: "", isValid: true },
    privacyPolicyChecked: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestDuration, setRequestDuration] = useState(null);
  console.log(requestDuration);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isValid =
      name === "email"
        ? validateEmail(value)
        : name === "password"
        ? validatePassword(value)
        : true;
    setFormData({
      ...formData,
      [name]: { value: value, isValid: isValid },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return (
      formData.name.isValid &&
      formData.email.isValid &&
      formData.password.isValid &&
      formData.confirmPassword.isValid &&
      formData.confirmPassword.value === formData.password.value &&
      formData.phoneNumber.isValid &&
      formData.privacyPolicyChecked
    );
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      privacyPolicyChecked: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.value);
    formDataToSend.append("phone", formData.phoneNumber.value);
    formDataToSend.append("email", formData.email.value);
    formDataToSend.append("password", formData.password.value);

    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/UserAccount/register",
        formDataToSend
      );
      const endTime = Date.now();
      const duration = endTime - startTime;
      setRequestDuration(duration);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Registration Successful",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/loginUser");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        if (errorMessage === "The email not valid") {
          Swal.fire({
            title: "Error!",
            text: "The email is not valid.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        } else if (errorMessage === "The email already exists") {
          Swal.fire({
            title: "Error!",
            text: "The email already exists.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        } else {
          Swal.fire({
            title: "Error!",
            html:
              "<strong>Error submitting your registration:</strong><br>" +
              Object.values(error.response.data.errors).join("<br>"),
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send registration data",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container div-container-register-user">
        <Row className="mb-2">
          <Logo />
        </Row>
        <Row className="mb-4">
          <h1
            className="bold-text"
            style={{ fontWeight: "bold", opacity: "75%", fontSize: "2rem" }}
          >
            Sign Up as User
          </h1>
        </Row>
        <Row className="mb-2">
          <p
            style={{
              fontSize: "20px",
              fontWeight: "normal",
              color: "#9C9C9C",
            }}
          >
            Please sign in to your account
          </p>
        </Row>
        {loading ? (
          <Spinners />
        ) : (
          <form onSubmit={handleSubmit}>
            <Row>
              <div>
                <NameInput
                  value={formData.name.value}
                  onChange={handleInputChange}
                  isValid={formData.name.isValid}
                  label="Name"
                  type="text"
                />
              </div>
            </Row>
            <EmailInput
              value={formData.email.value}
              onChange={handleInputChange}
              isValid={formData.email.isValid}
              label="Email Address"
              type="email"
            />
            <PhoneNumberInput
              value={formData.phoneNumber.value}
              onChange={handleInputChange}
              isValid={formData.phoneNumber.isValid}
              label="Phone Number"
            />
            <PasswordInput
              value={formData.password.value}
              onChange={handleInputChange}
              isValid={formData.password.isValid}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              validateSpecialChar={validateSpecialChar(formData.password.value)}
              validateNumber={validateNumber(formData.password.value)}
              validateUppercase={validateUppercase(formData.password.value)}
              validateLowercase={validateLowercase(formData.password.value)}
              enableValidation={true}
            />
            <ConfirmPasswordInput
              value={formData.confirmPassword.value}
              onChange={handleInputChange}
              passwordValue={formData.password.value}
              isValid={formData.confirmPassword.isValid}
              showPassword={showPassword}
            />
            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="By signing up you agree to our privacy policy."
                checked={formData.privacyPolicyChecked}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <button
              type="submit"
              className={`submit-button ${
                !isFormValid() ? "disabled-button" : ""
              }`}
              disabled={!isFormValid()}
            >
              Create account
            </button>
          </form>
        )}
        <VerticalLinks
          link1="I have an account"
          path1="/loginUser"
          link2="Sign Up as Delivery"
          path2="/registerDelivery"
        />
      </div>
    </>
  );
}

export default RegisterUser2;
