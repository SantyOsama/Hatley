import React from "react";
import { Row, Form, FloatingLabel } from "react-bootstrap";

function OrderIdInput({ value, isValid, onChange, label, name }) {
  return (
    <Row className="mb-3">
      <div className="floating-label-wrapper">
        <FloatingLabel
          controlId={`floating-${name}`}
          label={label}
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder={label}
            name={name}
            value={value}
            onChange={onChange}
            isValid={isValid}
            isInvalid={!isValid}
            required
          />
          <Form.Control.Feedback type="invalid">
            Invalid {label}
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
}

export default OrderIdInput;
