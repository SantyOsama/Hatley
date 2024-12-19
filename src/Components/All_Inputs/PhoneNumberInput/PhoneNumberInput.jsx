import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

function PhoneNumberInput({
  value,
  onChange,
  isValid,
  label,
  disabled = false,
}) {
  const [inputValid, setInputValid] = useState(true);
  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setInputValid(newValue.match(/^01[0125][0-9]{8}$/));
    onChange({ target: { name: e.target.name, value: newValue } });
  };

  return (
    <Row className="mb-2">
      <div className="floating-label-wrapper">
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
          <Form.Control
            type="tel"
            placeholder={`Enter ${label}`}
            name="phoneNumber"
            value={value}
            onChange={handleInputChange}
            isValid={isValid && inputValid}
            isInvalid={!isValid || !inputValid}
            required
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            {inputValid ? "" : <>Please enter a valid {label.toLowerCase()}.</>}
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
}

export default PhoneNumberInput;
