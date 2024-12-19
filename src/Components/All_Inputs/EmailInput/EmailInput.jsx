// EmailInput.js
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

const EmailInput = ({ value, isValid, onChange, disabled = false }) => {
  return (
    <Row className="mb-2">
      <div className="floating-label-wrapper">
        <FloatingLabel
          controlId="floatingEmailInput"
          label="Email Address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={value}
            onChange={onChange}
            isValid={isValid}
            isInvalid={!isValid}
            required
            disabled={disabled}
            autoComplete="email" // Add autocomplete attribute
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
};

export default EmailInput;
