import React, { useState, useRef, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Alert,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import {
  Sidebar,
  NavbarUser,
  Spinners,
  PasswordInput,
  PhoneNumberInput,
  EmailInput,
  NameInput,
  ConfirmPasswordInput,
} from "../../../Components";
import "./Settings.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  validateLowercase,
  validateNumber,
  validateSpecialChar,
  validateUppercase,
} from "../../../Tools/validations/validatePassword";
import Swal from "sweetalert2";

function Settings() {
  const originalInputs = useRef(null);
  const [inputs, setInputs] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
    phoneNumber: { value: "", isValid: true },
    oldPassword: { value: "", isValid: true },
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [Id, setId] = useState("");
  const profileImage = useSelector((state) => state.auth.profileImage);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "https://hatley.runasp.net/api/User/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies for authentication
          }
        );
        if (response.ok) {
          const data = await response.json();
          originalInputs.current = {
            name: { value: data.name || "", isValid: true },
            email: { value: data.email || "", isValid: true },
            phoneNumber: { value: data.phone || "", isValid: true },
            password: { value: "", isValid: true }, // Ensure these are correctly set
            confirmPassword: { value: "", isValid: true },
            oldPassword: { value: "", isValid: true },
          };
          setInputs(originalInputs.current);
          setId(data.id);
          setLoading(false);
        } else if (response.status === 401) {
          setError("Unauthorized access. Please log in.");
          setLoading(false);
        } else if (response.status === 404) {
          setError("The user does not exist.");
          setLoading(false);
        } else {
          setError("An unknown error occurred.");
          setLoading(false);
        }
      } catch (err) {
        Swal.fire("Error", `Failed to fetch user data,${err}`, "error");
        setError("An error occurred while fetching user data.");
        setLoading(false);
      }
    }
    fetchUserData();
  }, [token]);
  const handleInputChange = (e) => {
    if (isEditing) return; // Prevent modification if not in edit mode
    const { name, value } = e.target;
    // Update inputs state based on the input name
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: {
        ...prevInputs[name],
        value: value,
      },
    }));
  };
  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: {
        ...prevInputs[name],
        value: value,
      },
    }));
  };
  async function authenticate() {
    if (!("credentials" in navigator)) {
      setError("Biometric authentication is not supported by this browser.");
      return false;
    }
    try {
      const publicKey = {
        challenge: new Uint8Array([
          0x8c, 0x75, 0xcf, 0x92, 0x4b, 0x9b, 0x1b, 0x99, 0x36, 0x74, 0x95,
          0x9a, 0x09, 0x8b, 0x4e, 0x6f,
        ]),
        rp: {
          name: "Example Corp",
        },
        user: {
          id: new Uint8Array([1, 2, 3, 4, 5]),
          name: "user@example.com",
          displayName: "User Example",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7, // ECDSA algorithm with SHA-256
          },
          {
            type: "public-key",
            alg: -257, // RS256: RSASSA-PKCS1-v1_5 with SHA-256
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      };
      setLoading(true);
      const credential = await navigator.credentials.create({ publicKey });
      Swal.fire("Success", "Authentication successful", "success");
      setLoading(false);
      console.log("Authentication successful", credential);
      return true;
    } catch (err) {
      Swal.fire("Error", `Authentication failed,${err}`, "error");
      console.error("Authentication failed", err);
      setError("Authentication failed. You cannot edit the fields.");
      setLoading(false);
      return false;
    }
  }
  const handleSubmitChange = async () => {
    if (inputs.password && inputs.confirmPassword && inputs.oldPassword.value) {
      let dataToSend = {
        old_password: inputs.oldPassword.value,
        new_password: inputs.password.value,
      };
      console.log("dataToSend", dataToSend);
      try {
        const response = await axios.post(
          `https://hatley.runasp.net/api/User/changepassword`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          Swal.fire("Success", "Password updated successfully", "success");
        }
      } catch (error) {
        if (error.response) {
          // Check for specific error messages and display corresponding alerts
          if (error.response.data === "Old password not correct") {
            Swal.fire("Error", "Old password is not correct", "error");
          } else {
            Swal.fire(
              "Error",
              "Old password cannot be the same as the new password",
              "error"
            );
          }
        } else {
          Swal.fire(
            "Error",
            `An unexpected error occurred: ${error.message}`,
            "error"
          );
        }
      }
    } else {
      Swal.fire("Warning", "You must fill in all fields", "warning");
    }
  };
  const handleSubmit = async () => {
    // Check if editing is allowed
    if (!isEditing) {
      Swal.fire(
        "Note",
        "Press Edit first to enable you save your data",
        "info"
      );
      setError("Attempt to save data while not in edit mode detected.");
      return;
    }
    // Check if passwords match
    if (inputs.password.value !== inputs.confirmPassword.value) {
      setError("Password and confirm password do not match.");
      return; // Stop the function if passwords do not match
    }
    if (inputs.name && inputs.email && inputs.phoneNumber) {
      let dataToSend = {
        id: Id,
        name: inputs.name.value,
        phone: inputs.phoneNumber.value,
        email: inputs.email.value,
        photo: profileImage,
      };
      console.log("dataToSend", dataToSend);
      try {
        const response = await axios.put(
          `https://hatley.runasp.net/api/User`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          Swal.fire("success", "User updated successfully", "success");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError("There is no User");
          } else if (error.response.status === 400) {
            const errorData = error.response.data;
            if (errorData === "The email already exists") {
              Swal.fire(
                "Error",
                "The email already exists Write another one",
                "error"
              );
              setError("The email already exists");
            } else {
              setError("Bad Request: " + JSON.stringify(errorData));
            }
          } else if (error.response.status === 401) {
            setError("Unauthorized");
          } else {
            Swal.fire("Error", "An unexpected error occurred", "error");
            setError("An unexpected error occurred");
          }
        } else {
          Swal.fire("Error", `An error occurred:${error.message}`, "error");
          setError("An error occurred: " + error.message);
        }
        setIsEditing(false);
      }
      console.log("Saved Data:", inputs);
    } else {
      Swal.fire("warning", "You must fill in all field", "warning");
    }
    setError("");
  };
  const handleEdit = async () => {
    const isAuthenticated = await authenticate();
    if (!isAuthenticated) {
      setIsEditing(true);
      setError("");
    } else {
      setIsEditing(false);
      Swal.fire(
        "Error",
        "Authentication failed. You cannot edit the fields.",
        "error"
      );
      setError("Authentication failed. You cannot edit the fields.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    // If password is currently hidden, request authentication before toggling visibility
    // if (!showPassword) {
    //   authenticate().then((isAuthenticated) => {
    //     if (isAuthenticated) {
    //       setShowPassword((prevShowPassword) => !prevShowPassword);
    //     } else {
    //       setError(
    //         "Authentication failed. You cannot toggle password visibility."
    //       );
    //     }
    //   });
    // } else {
    //   // If password is currently shown, toggle visibility without authentication
    //   setShowPassword((prevShowPassword) => !prevShowPassword);
    // }
  };
  return (
    <Container fluid>
      <Row>
        <NavbarUser />
      </Row>
      <Row className={` flex-column-sm ${"header-order-details-to-right"}`}>
        <Col xs={12} sm={3} md={4} lg={2} className="order-1">
          <div className="sidebar-container">
            <Sidebar />
          </div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={8} className="order-lg-2 order-md-2">
          {loading ? (
            <Spinners />
          ) : (
            <>
              <div className="user-profile setting">
                <p>
                  <strong>Your Info</strong>
                </p>
                <p>press Edit and wait for seconds to enable editing</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                  <NameInput
                    value={inputs.name.value}
                    onChange={handleInputChange}
                    isValid={true}
                    label="Name"
                    disabled={!isEditing}
                    type="text"
                  />
                  <EmailInput
                    value={inputs.email.value}
                    onChange={handleInputChange}
                    isValid={true}
                    label="Email Address"
                    type="email"
                    disabled={!isEditing}
                  />
                  <PhoneNumberInput
                    value={inputs.phoneNumber.value}
                    onChange={handleInputChange}
                    isValid={true}
                    disabled={!isEditing}
                    label="Phone Number"
                  />
                </Row>
                <div className="edit-save mt-4">
                  <Button
                    onClick={handleEdit}
                    className="mx-2 button-edit"
                    variant="outline-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleSubmit();
                      setShowPassword(false);
                    }}
                    className="mx-2 button-save"
                    variant="primary"
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div className="user-profile setting">
                <p>
                  <strong>Change Password:</strong>
                </p>
                <Row>
                  <div className="floating-label-wrapper mb-4">
                    <FloatingLabel
                      controlId="floatingOldPassword"
                      label="Old Password"
                    >
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Old Password"
                        name="oldPassword"
                        value={inputs.oldPassword.value}
                        onChange={handlePassChange}
                        isValid={true}
                        isInvalid={!true}
                        required
                        autoComplete="new-password" // Use autoComplete instead of autocomplete
                      />
                    </FloatingLabel>
                  </div>
                </Row>
                <Row>
                  <PasswordInput
                    value={inputs.password.value}
                    onChange={handlePassChange}
                    isValid={true}
                    showPassword={showPassword}
                    validateSpecialChar={validateSpecialChar(
                      inputs.password.value
                    )}
                    validateNumber={validateNumber(inputs.password.value)}
                    validateUppercase={validateUppercase(inputs.password.value)}
                    validateLowercase={validateLowercase(inputs.password.value)}
                    togglePasswordVisibility={togglePasswordVisibility}
                    enableValidation={true}
                    label="New Password"
                  />
                </Row>
                <ConfirmPasswordInput
                  value={inputs.confirmPassword.value}
                  onChange={handlePassChange}
                  passwordValue={inputs.password.value}
                  isValid={true}
                  togglePasswordVisibility={togglePasswordVisibility}
                  showPassword={showPassword}
                />
                <div className="edit-save mt-4">
                  <Button
                    onClick={() => {
                      handleSubmitChange();
                      setShowPassword(false);
                    }}
                    variant="primary"
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default Settings;
