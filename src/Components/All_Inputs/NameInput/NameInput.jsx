// NameInput.js
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

const NameInput = ({ value, isValid, onChange, label, disabled = false }) => {
  return (
    <Row className="mb-2">
      <div className="floating-label-wrapper">
        <FloatingLabel
          controlId="floatingNameInput" // Unique controlId for NameInput
          label={label}
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={value}
            onChange={onChange}
            isValid={isValid}
            isInvalid={!isValid}
            required
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid name.
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
};

export default NameInput;
