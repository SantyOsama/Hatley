import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

const LocationInput = ({ value, isValid, onChange }) => {
  const isUrlValid = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleInputChange = (e) => {
    const { value: inputValue } = e.target;
    if (!inputValue || isUrlValid(inputValue)) {
      onChange(e);
    }
  };

  return (
    <Row className="">
      <div className="floating-label-wrapper">
        <FloatingLabel
          controlId="floatingLocationInput" // Unique controlId for LocationInput
          label="Location"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter Location"
            name="location"
            value={value}
            onChange={handleInputChange}
            isValid={isValid}
            isInvalid={!isValid}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid URL.
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
};

export default LocationInput;
