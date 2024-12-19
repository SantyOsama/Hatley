import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {
  BsCheckCircle,
  BsExclamationCircle,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";

function PasswordInput({
  value,
  onChange,
  isValid,
  showPassword,
  togglePasswordVisibility,
  enableValidation,
  validateSpecialChar,
  validateNumber,
  validateUppercase,
  validateLowercase,
  disabled = false,
  label = "Password",
}) {
  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <div className="floating-label-wrapper mb-4">
      <FloatingLabel controlId="floatingPassword" label={label}>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={label}
          name="password"
          value={value}
          onChange={handleInputChange}
          isValid={isValid}
          isInvalid={!isValid}
          required
          disabled={disabled}
          autoComplete="new-password" // Use autoComplete instead of autocomplete
        />

        <span
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </span>

        {enableValidation && (
          <Form.Control.Feedback
            type="invalid"
            className="password-requirements"
          >
            Password must be at least <strong>8 characters</strong> :
            <div
              className={`password-requirements-item ${
                validateSpecialChar && "valid"
              }`}
            >
              {validateSpecialChar ? (
                <BsCheckCircle style={{ color: "green", marginRight: "5px" }} />
              ) : (
                <BsExclamationCircle
                  style={{ color: "red", marginRight: "5px" }}
                />
              )}
              <span>One special character</span>
            </div>
            <div
              className={`password-requirements-item ${
                validateNumber && "valid"
              }`}
            >
              {validateNumber ? (
                <BsCheckCircle style={{ color: "green", marginRight: "5px" }} />
              ) : (
                <BsExclamationCircle
                  style={{ color: "red", marginRight: "5px" }}
                />
              )}
              <span>One number</span>
            </div>
            <div
              className={`password-requirements-item ${
                validateUppercase && "valid"
              }`}
            >
              {validateUppercase ? (
                <BsCheckCircle style={{ color: "green", marginRight: "5px" }} />
              ) : (
                <BsExclamationCircle
                  style={{ color: "red", marginRight: "5px" }}
                />
              )}
              <span>One uppercase letter</span>
            </div>
            <div
              className={`password-requirements-item fixed-confirm${
                validateLowercase ? " valid" : ""
              }`}
              style={{ marginBottom: "10px" }}
            >
              {validateLowercase ? (
                <BsCheckCircle style={{ color: "green", marginRight: "5px" }} />
              ) : (
                <BsExclamationCircle
                  style={{ color: "red", marginRight: "5px" }}
                />
              )}
              <span>One lowercase letter</span>
            </div>
          </Form.Control.Feedback>
        )}
      </FloatingLabel>
    </div>
  );
}

export default PasswordInput;
