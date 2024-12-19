import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {
  validateSpecialChar,
  validateNumber,
  validateUppercase,
  validateLowercase,
  validatePassword,
} from "../../Tools/validations/validatePassword";
import "./RegisterDelivery2.css";
import { useNavigate } from "react-router-dom";
import {
  CardBackgroundImageInput,
  CardFrontImageInput,
  CityAddressInput,
  ConfirmPasswordInput,
  EmailInput,
  GovernmentAddressInput,
  Logo,
  NameInput,
  NationalIDInput,
  PasswordInput,
  PhoneNumberInput,
  SelfieWithCardInput,
  Spinners,
  VerticalLinks,
} from "../../Components";
import { validateEmail } from "../../Tools/validations/validateEmail";

function RegisterUser2() {
  const [formData, setFormData] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
    phoneNumber: { value: "", isValid: true },
    location: { value: "", isValid: true },
    nationalID: { value: "", isValid: true },
    privacyPolicyChecked: false,
    cardFrontImage: { value: null, isValid: true },
    cardBackgroundImage: { value: null, isValid: true },
    selfieWithCard: { value: null, isValid: true },
    governmentAddress: { value: "", isValid: true },
    // cityAddress: { value: "", isValid: true },
    cityAddress_id: { value: "", isValid: true },
  });
  // console.log("formData is ", formData);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isValid =
      name === "email"
        ? validateEmail(value)
        : name === "password"
        ? validatePassword(value)
        : name === "location" || name === "nationalID"
        ? value.trim() !== ""
        : true;
    setFormData({
      ...formData,
      [name]: { value: value, isValid: isValid },
    });
  };
  const [loading, setLoading] = useState(false);
  const [requestDuration, setRequestDuration] = useState(null);

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
      formData.privacyPolicyChecked &&
      formData.location.isValid &&
      formData.nationalID.isValid &&
      formData.cardFrontImage.isValid &&
      formData.cardBackgroundImage.isValid &&
      formData.selfieWithCard.isValid
    );
  };

  const handleGovernmentAddressChange = (newAddress) => {
    // console.log("New Address:", newAddress);
    setFormData({
      ...formData,
      governmentAddress: { value: newAddress, isValid: true },
    });
  };

  const handleCityAddressChange = (newAddress) => {
    // console.log("New Address:", newAddress);
    setFormData({
      ...formData,
      cityAddress_id: { value: newAddress, isValid: true },
    });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      privacyPolicyChecked: checked,
    });
  };

  const handleFileChange = (name, file) => {
    setFormData({
      ...formData,
      [name]: { value: file, isValid: true },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();
    if (!formData.privacyPolicyChecked) {
      // alert("Please agree to the privacy policy.");
      Swal.fire({
        title: "Error!",
        text: "Please agree to the privacy policy.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("national_id", formData.nationalID.value);
    dataToSend.append("Name", formData.name.value);
    dataToSend.append("Phone", formData.phoneNumber.value);
    // dataToSend.append("cityAddress", 1);
    dataToSend.append("zone_ID", formData.cityAddress_id.value);
    dataToSend.append("frontImage", formData.cardFrontImage.value);
    dataToSend.append("backImage", formData.cardBackgroundImage.value);
    dataToSend.append("Password", formData.password.value);
    dataToSend.append("Email", formData.email.value);
    dataToSend.append("Governorate_ID", formData.governmentAddress.value); // Assuming Governorate_ID is 1 for now
    // dataToSend.append("Governorate_ID", 1);
    dataToSend.append("faceImage", formData.selfieWithCard.value);
    // const jsonObject = {};
    // dataToSend.forEach((value, key) => {
    //   jsonObject[key] = value;
    // });

    // console.log("dataToSend JSON", JSON.stringify(jsonObject, null, 2));
    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/DeliveryAccount/register",
        dataToSend
      );
      const endTime = Date.now();
      const duration = endTime - startTime;
      setRequestDuration(duration);
      console.log(requestDuration);
      console.log(duration);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Registration Successful",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/delivery/loginDelivery");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        if (errorMessage === "The email not valid") {
          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        } else if (errorMessage === "The email already exists") {
          Swal.fire({
            title: "Error!",
            text: errorMessage + ".",
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
      <div className="container div-container-register mb-5">
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
            Sign Up as Delivery
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
            Please sign up to create your account
          </p>
        </Row>
        {loading ? (
          <Spinners />
        ) : (
          <div>
            <Form onSubmit={handleSubmit}>
              <NameInput
                value={formData.name.value}
                onChange={handleInputChange}
                isValid={formData.name.isValid}
                label="Name"
                type="text"
              />
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
              <NationalIDInput
                value={formData.nationalID.value}
                onChange={handleInputChange}
                isValid={formData.nationalID.isValid}
                label="National ID"
                name="nationalID"
              />
              <PasswordInput
                value={formData.password.value}
                onChange={handleInputChange}
                isValid={formData.password.isValid}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                validateSpecialChar={validateSpecialChar(
                  formData.password.value
                )}
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
              <GovernmentAddressInput
                value={formData.governmentAddress.value}
                onChange={handleGovernmentAddressChange}
              />
              <CityAddressInput
                value={formData.cityAddress_id.value}
                onChange={handleCityAddressChange}
                governorateId={formData.governmentAddress.value}
              />
              <CardFrontImageInput
                value={formData.cardFrontImage.value}
                onChange={(file) => handleFileChange("cardFrontImage", file)}
              />
              <CardBackgroundImageInput
                value={formData.cardBackgroundImage.value}
                onChange={(file) =>
                  handleFileChange("cardBackgroundImage", file)
                }
              />
              <SelfieWithCardInput
                value={formData.selfieWithCard.value}
                onChange={(file) => handleFileChange("selfieWithCard", file)}
              />
              <Form.Group controlId="formBasicCheckbox" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="By signing up you agree to our privacy policy."
                  checked={formData.privacyPolicyChecked}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
              <Button
                type="submit"
                className={`submit-button ${
                  !isFormValid() ? "disabled-button" : ""
                }`}
                disabled={!isFormValid()}
              >
                Create account
              </Button>
            </Form>
            <VerticalLinks
              link1="I have an account"
              path1="/delivery/loginDelivery"
              link2="Sign Up as User"
              path2="/registerUser"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default RegisterUser2;

// function formDataToJson(formData) {
//   const json = {};
//   formData.forEach((value, key) => {
//     if (json[key]) {
//       if (Array.isArray(json[key])) {
//         json[key].push(value);
//       } else {
//         json[key] = [json[key], value];
//       }
//     } else {
//       json[key] = value;
//     }
//   });
//   return json;
// // Convert FormData to JSON object
// const jsonData = formDataToJson(dataToSend);
// // Print JSON object
// console.log(JSON.stringify(jsonData, null, 2));
// }
