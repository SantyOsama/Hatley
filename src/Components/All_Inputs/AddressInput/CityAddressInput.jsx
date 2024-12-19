import React, { useState, useEffect } from "react";
import { Row, Form } from "react-bootstrap";
import axios from "axios";
import "./GovernmentAddressInput.css";

const CityAddressInput = ({
  value,
  onChange,
  disabled = false,
  governorateId,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (governorateId) {
      const fetchZones = async () => {
        try {
          const governorateResponse = await axios.get(
            `https://hatley.runasp.net/api/Governorate/${governorateId}`,
            {
              headers: {
                Accept: "*/*",
              },
            }
          );
          // console.log(governorateResponse.data.name);
          const zoneResponse = await axios.get(
            `https://hatley.runasp.net/api/Zone/ZonesForGovernorate/${governorateResponse.data.name}`,
            {
              headers: {
                Accept: "*/*",
              },
            }
          );

          const formattedOptions = zoneResponse.data.map((zone) => ({
            value: zone.zone_id,
            label: zone.name,
          }));
          setOptions(formattedOptions);
        } catch (error) {
          console.error("Error fetching data:", error);
          setOptions("");
        }
      };

      fetchZones();
    } else {
      setOptions([]);
    }
  }, [governorateId]);

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
        <option value="">Select a city</option>
        {options.length === 0 ? (
          <option disabled>No cities available</option>
        ) : (
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </Form.Select>
    </Row>
  );
};

export default CityAddressInput;
