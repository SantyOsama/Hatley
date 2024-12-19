import React from "react";
import { FloatingLabel, Form, Row } from "react-bootstrap";

const ConfirmPasswordInput = ({
  value,
  onChange,
  passwordValue,
  isValid,
  showPassword,
  disabled = false,
}) => {
  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <Row className="mb-2">
      <div className="floating-label-wrapper">
        <FloatingLabel
          controlId="floatingConfirmPassword"
          label="Confirm Password"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={value}
            onChange={handleInputChange}
            isValid={value === passwordValue && isValid}
            isInvalid={value !== passwordValue || !isValid}
            required
            disabled={disabled}
            autoComplete="new-password" // Add autocomplete attribute
          />
          <Form.Control.Feedback type="invalid">
            {value !== passwordValue && <>Passwords do not match.</>}
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
};

export default ConfirmPasswordInput;
