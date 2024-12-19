import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Form } from "react-bootstrap";

const GovernmentAddressInput = ({ value, onChange, disabled = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://hatley.runasp.net/api/Governorate", {
        headers: {
          accept: "*/*",
        },
      })
      .then((response) => {
        const formattedOptions = response.data.map((governorate) => ({
          value: governorate.governorate_ID,
          label: governorate.name,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => {
        console.error("Error fetching governorate:", error);
      });
  }, []);

  return (
    <Row className="mb-3 floating-select-wrapper input-address-container">
      <Form.Select
        aria-label="Select location"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="custom-select"
        required
        disabled={disabled}
      >
        <option value="">Governorate</option>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Row>
  );
};

export default GovernmentAddressInput;
