import React from "react";
import { Form } from "react-bootstrap";
import "./MessageInput.css";

function MessageInput({
  value,
  onChange,
  placeholder,
  label,
  name,
  textareaStyle,
  read,
}) {
  return (
    <Form.Group controlId={name}>
      {/* {label && (
        <Form.Label className="form-label-make-order">{label}</Form.Label>
      )} */}
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        name={name}
        required
        style={textareaStyle} // Apply textareaStyle directly
        readOnly={read}
      />
    </Form.Group>
  );
}

export default MessageInput;
