import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import GovernmentAddressInput from "../AddressInput/GovernmentAddressInput";
import CityAddressInput from "../AddressInput/CityAddressInput";
import RegionAddressInput from "../AddressInput/RegionAddressInput";

function Location2InputTo({ address, onChange }) {
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    address.govern
  );
  const [selectedCity, setSelectedCity] = useState(address.city);
  const [selectedRegion, setSelectedRegion] = useState(address.region);

  useEffect(() => {
    setSelectedGovernorate(address.govern);
    setSelectedCity(address.city);
    setSelectedRegion(address.region);
  }, [address]);

  const handleGovernorateChange = (value) => {
    setSelectedGovernorate(value);
    onChange({ ...address, govern: value, city: "", region: "" });
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    onChange({ ...address, city: value, region: "" });
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    onChange({ ...address, region: value });
  };

  const handleInputChange = (e) => {
    onChange({ ...address, detailedAddress: e.target.value });
  };

  return (
    <Form.Group>
      <Form.Label>To Address</Form.Label>
      <Row>
        <Col md={4} className="mb-3">
          <GovernmentAddressInput
            value={selectedGovernorate}
            onChange={handleGovernorateChange}
          />
        </Col>
        <Col md={4} className="mb-3">
          <CityAddressInput
            governorateId={selectedGovernorate}
            value={selectedCity}
            onChange={handleCityChange}
          />
        </Col>
        <Col md={4} className="mb-3">
          <RegionAddressInput
            value={selectedRegion}
            onChange={handleRegionChange}
            cityId={selectedCity}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <Form.Control
          as="textarea"
          name="detailedAddress"
          value={address.detailedAddress}
          onChange={handleInputChange}
          placeholder="Detailed Address"
          required
        />
      </div>
    </Form.Group>
  );
}

export default Location2InputTo;
