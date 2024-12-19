import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./ContactUsPage.css";
import { validateEmail } from "../../Tools/validations/validateEmail.js";
import {
  EmailInput,
  MessageInput,
  NameInput,
  PhoneNumberInput,
  Spinners,
  contactUsImage,
} from "../../Components/index.js";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarDelivery from "../../Components/NavbarDelivery/NavbarDelivery.jsx";

function Contact() {
  const [formData, setFormData] = useState({
    name: { value: "", isValid: true, error: "" },
    email: { value: "", isValid: true, error: "" },
    phoneNumber: { value: "", isValid: true, error: "" },
    message: { value: "", isValid: true, error: "" },
  });
  const [loading, setLoading] = useState(false);
  const [requestDuration, setRequestDuration] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    let error = "";

    if (name === "email") {
      isValid = validateEmail(value);
      error = isValid ? "" : "Invalid email format";
    } else if (name === "message" && value.trim() === "") {
      isValid = false;
      error = "The message field is required";
    } else {
      isValid = value.trim() !== "";
      error = isValid ? "" : `The ${name} field is required`;
    }

    setFormData({
      ...formData,
      [name]: { value: value, isValid: isValid, error: error },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now(); //

    const payload = {
      name: formData.name.value,
      email: formData.email.value,
      phone: formData.phoneNumber.value,
      message: formData.message.value,
    };

    // console.log(formData.message.value);
    // console.log(payload);
    try {
      const response = await axios.post(
        "https://hatley.runasp.net/api/ContactMail/contact",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(payload);
      const endTime = Date.now();
      const duration = endTime - startTime;
      setRequestDuration(duration);
      console.log(requestDuration);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // delete form data
        setFormData({
          name: { value: "", isValid: true, error: "" },
          email: { value: "", isValid: true, error: "" },
          phoneNumber: { value: "", isValid: true, error: "" },
          message: { value: "", isValid: true, error: "" },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        const updatedFormData = { ...formData };

        Object.keys(errors).forEach((key) => {
          if (updatedFormData[key]) {
            updatedFormData[key].isValid = false;
            updatedFormData[key].error = errors[key].join(" ");
          }
        });

        setFormData(updatedFormData);

        Swal.fire({
          title: "Error!",
          text: "Error submitting your message. Please correct the errors and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an error sending your message. Please try again.",
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
      <NavbarDelivery />
      <Container>
        <Row>
          <Col>
            <div className="contactContent">
              <div className="contactIcon">
                <img className="abt-img" src={contactUsImage} alt="Contact" />
              </div>
              <div className="contactContentText">
                If you have questions or just want to get in touch, use the form
                below. We look forward to hearing from you!
              </div>
              <div className="socialMediaIcons">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
              </div>
            </div>
          </Col>
          <Col>
            {loading ? (
              <Spinners />
            ) : (
              <div className="contactForm">
                <form onSubmit={handleSubmit} className="input-contact">
                  <div className="span">Contact form</div>
                  <NameInput
                    value={formData.name.value}
                    onChange={handleInputChange}
                    isValid={formData.name.isValid}
                    error={formData.name.error}
                    label="Name"
                    type="text"
                  />
                  <EmailInput
                    value={formData.email.value}
                    onChange={handleInputChange}
                    isValid={formData.email.isValid}
                    error={formData.email.error}
                    label="Email Address"
                    type="email"
                  />
                  <PhoneNumberInput
                    value={formData.phoneNumber.value}
                    onChange={handleInputChange}
                    isValid={formData.phoneNumber.isValid}
                    error={formData.phoneNumber.error}
                    label="Phone Number"
                  />
                  <Form.Label className="form-label-contact">
                    Message
                  </Form.Label>
                  <MessageInput
                    value={formData.message.value}
                    onChange={handleInputChange}
                    isValid={formData.message.isValid}
                    error={formData.message.error}
                    name="message"
                    label="Message"
                    placeholder="Enter your message"
                    className="textarea-form-contact"
                  />
                  <div style={{ textAlign: "end" }}>
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contact;
