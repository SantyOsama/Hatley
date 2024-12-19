// DateInput.jsx
import React from "react";
import { Form } from "react-bootstrap";

function DateInput({ value, onChange, name, label }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <div className="date-picker-container">
        {/* <FontAwesomeIcon icon={faCalendar} className="calendar-icon" /> */}
        <Form.Control
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="details-content date-input" // Make sure to style it correctly in your CSS
        />
      </div>
    </Form.Group>
  );
}

export default DateInput;
