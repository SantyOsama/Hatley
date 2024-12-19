import React from "react";
import { Row, Form } from "react-bootstrap";
import "./GovernmentAddressInput.css";

const statesData = {
  1: [
    "Al-Nemis Street",
    "Al-Mohfaza Street",
    "Gomhoriyah Street",
    "Almaktabat Street",
  ],
  2: ["State 4-1", "State 4-2", "State 4-3"],
  3: ["Al-Malag'a", "Al-Wosta", "Al-Arab"],
  4: ["Al-Ghanaim-1", "Al-Ghanaim-2", "Al-Ghanaim-3"],
  // 5: ["aaaaaaaaaaaa", "bbbbbbb", " cccccccccc", "ddddddd"],
};

const RegionAddressInput = ({ value, onChange, cityId }) => {
  const options = cityId ? statesData[cityId] : [];

  return (
    <Row className="mb-3 floating-select-wrapper input-address-container">
      <Form.Select
        aria-label="Select State"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="custom-select"
        required
      >
        <option value="">Select a State</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Row>
  );
};

export default RegionAddressInput;
