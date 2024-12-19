// PriceInput.jsx
import React from "react";
import { Form } from "react-bootstrap";

function PriceInput({ value, onChange, name, label }) {
  return (
    <Form.Group>
      <Form.Label className="form-label-make-order">{label}</Form.Label>
      <Form.Control
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min="0"
        placeholder="Enter price"
        required
        className="details-content" // Make sure to style it correctly in your CSS
      />
    </Form.Group>
  );
}

export default PriceInput;
