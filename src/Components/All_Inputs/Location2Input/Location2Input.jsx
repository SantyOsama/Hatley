import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./Location2Input.css";
import GovernmentAddressInput from "../AddressInput/GovernmentAddressInput";
import CityAddressInput from "../AddressInput/CityAddressInput";
import RegionAddressInput from "../AddressInput/RegionAddressInput";

function Location2Input({
  address = {},
  onChange,
  label,
  onGetCurrentLocation,
}) {
  const [governName, setGovernName] = useState("");
  const [cityId, setCityId] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...address,
      [name]: value,
    });
    if (name === "govern") {
      setGovernName(value);
    }
    if (name === "city") {
      setCityId(value);
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col md={4} className="mb-3 custom-col-1">
          <GovernmentAddressInput
            value={address.govern || ""}
            onChange={(value) =>
              handleInputChange({ target: { name: "govern", value } })
            }
          />
        </Col>
        <Col md={4} className="mb-3 custom-col-2">
          <CityAddressInput
            value={address.city || ""}
            onChange={(value) =>
              handleInputChange({ target: { name: "city", value } })
            }
            governorateId={governName}
          />
        </Col>
        <Col md={4} className="mb-3 custom-col-3">
          <RegionAddressInput
            value={address.city ? address.state : ""}
            onChange={(value) =>
              handleInputChange({ target: { name: "state", value } })
            }
            cityId={cityId}
          />
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
