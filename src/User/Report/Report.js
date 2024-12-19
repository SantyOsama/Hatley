import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import "./Report.css";
import {
  MessageInput,
  NameInput,
  EmailInput,
  PhoneNumberInput,
  // OrderIdInput,
  Spinners,
} from "../../Components";
import { validateEmail } from "../../Tools/validations/validateEmail";
const ReportPage = ({ orderId }) => {
  const [formData, setFormData] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phoneNumber: { value: "", isValid: true },
    orderId: { value: orderId, isValid: true },
    message: { value: "", isValid: true },
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    if (name === "email") {
      isValid = validateEmail(value);
    }

    setFormData({
      ...formData,
      [name]: { value, isValid },
    });
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: { value, isValid: true },
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every((field) => field.isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isFormValid()) {
      const data = new FormData();
      data.append("name", formData.name.value);
      data.append("toEmail", formData.email.value); // Update the key to match the expected 'toEmail'
      data.append("phone", formData.phoneNumber.value); // Update the key to match the expected 'phone'
      data.append("order_ID", formData.orderId.value); // Update the key to match the expected 'order_ID'
      data.append("body", formData.message.value); // Update the key to match the expected 'body'

      try {
        const response = await axios.post(
          "https://hatley.runasp.net/api/Mailing/send",
          data,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Form submitted successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          setLoading(false);
          // Clear form after successful submission
          setFormData({
            name: { value: "", isValid: true },
            email: { value: "", isValid: true },
            phoneNumber: { value: "", isValid: true },
            orderId: { value: "", isValid: true },
            message: { value: "", isValid: true },
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Form submission failed",
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.errors
            ? Object.values(error.response.data.errors).flat().join("\n")
            : "Form submission failed due to bad request";
          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);
        } else {
          Swal.fire({
            title: "Error",
            text: `An error occurred while submitting the form: ${error.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);
        }
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Please fill out the form correctly",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <div style={{ height: "400px" }}>
          {" "}
          <Spinners />
        </div>
      ) : (
        <div className="report-wrapper">
          <form onSubmit={handleSubmit} className="report-form">
            <div className="input-container">
              <NameInput
                value={formData.name.value}
                onChange={handleInputChange}
                isValid={formData.name.isValid}
                label="Name"
                type="text"
                name="name"
              />
            </div>
            <div className="input-container">
              <EmailInput
                value={formData.email.value}
                onChange={handleInputChange}
                isValid={formData.email.isValid}
                label="Email Address"
                type="email"
                name="email"
              />
            </div>
            <div className="input-container">
              <PhoneNumberInput
                value={formData.phoneNumber.value}
                onChange={handleInputChange}
                isValid={formData.phoneNumber.isValid}
                label="Phone Number"
                name="phoneNumber"
              />
            </div>
            {/* <div
              className="input-container"
              style={{
                backgroundColor: "white",
                border: "0px solid white",
                borderRadius: "10px",
              }}
            >
              <OrderIdInput
                value={formData.orderId.value}
                onChange={handleInputChange}
                isValid={formData.orderId.isValid}
                label="Order ID"
                name="orderId"
                readOnly={true}
              />
            </div> */}
            <div className="input-container">
              <Form.Label className="form-label-contact">Message</Form.Label>
              <MessageInput
                value={formData.message.value}
                onChange={(e) => handleChange("message", e.target.value)}
                isValid={formData.message.isValid}
                name="message"
                label="Message"
                placeholder="Enter your message"
                className="textarea-form-contact"
              />
            </div>
            <button type="submit" className="submit-button-report">
              Report
            </button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default ReportPage;
