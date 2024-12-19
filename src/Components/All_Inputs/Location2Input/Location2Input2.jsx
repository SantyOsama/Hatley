import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./Location2Input.css";
import GovernmentAddressInput from "../AddressInput/GovernmentAddressInput";
import CityAddressInput from "../AddressInput/CityAddressInput";
const statesData = {
  1: ["State 1-1", "State 1-2", "State 1-3"],
  2: ["State 2-1", "State 2-2", "State 2-3"],
  3: ["State 3-1", "State 3-2", "State 3-3"],
  4: ["State 4-1", "State 4-2", "State 4-3"],
  5: ["State 5-1", "State 5-2", "State 5-3"],
};

function Location2Input({
  address = {},
  onChange,
  label,
  onGetCurrentLocation,
}) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (address.city) {
      const newStates = statesData[address.city] || [];
      setStates(newStates);
      if (address.state !== "" && !newStates.includes(address.state)) {
        onChange({
          ...address,
          state: "",
        });
      }
    } else {
      setStates([]);
    }
  }, [address, onChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...address,
      [name]: value,
    });
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col md={4} className="mb-3">
          <GovernmentAddressInput
            value={address.govern || ""}
            onChange={(value) =>
              handleInputChange({ target: { name: "govern", value } })
            }
          />
        </Col>
        <Col md={4} className="mb-3">
          <CityAddressInput
            value={address.city || ""}
            onChange={(value) =>
              handleInputChange({ target: { name: "city", value } })
            }
          />
        </Col>
        <Col md={4} className="mb-3">
          <Row className="mb-3 floating-select-wrapper input-address-container">
            <Form.Select
              aria-label="Select location"
              name="state"
              value={address.city ? address.state : ""}
              onChange={handleInputChange}
              required
              className="custom-select"
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Row>
        </Col>
      </Row>
      <div className="mt-3">
        <Form.Control
          as="textarea"
          name="detailedAddress"
          value={address.detailedAddress || ""}
          onChange={handleInputChange}
          placeholder="Detailed Address"
          required
          className="detailed-address"
        />
      </div>
    </Form.Group>
  );
}

export default Location2Input;
