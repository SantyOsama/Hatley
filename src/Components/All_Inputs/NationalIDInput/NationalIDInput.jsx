import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

const NationalIDInput = ({ value, isValid, onChange, disabled = false }) => {
  const [inputLengthValid, setInputLengthValid] = useState(true);
  const [inputValid, setInputValid] = useState(true);

  const handleInputChange = (e) => {
    const { value: inputValue } = e.target;
    // Remove non-numeric characters
    const cleanedValue = inputValue.replace(/[^0-9]/g, "");
    // Ensure the length is 14 or less
    const truncatedValue = cleanedValue.slice(0, 14);
    // Check if the length is exactly 14
    setInputLengthValid(truncatedValue.length === 14);
    setInputValid(
      inputValue.match(
        /(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/
      )
    );
    onChange({ target: { name: "nationalID", value: truncatedValue } });
  };

  return (
    <Row className="">
      <div className="floating-label-wrapper">
        <FloatingLabel
          controlId="floatingNationalIDInput"
          label="National ID"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter National ID"
            name="nationalID"
            value={value}
            onChange={handleInputChange}
            isValid={isValid && inputLengthValid && inputValid}
            isInvalid={!isValid || !inputLengthValid || !inputValid}
            disabled={disabled}
            required
          />
          <Form.Control.Feedback type="invalid">
            {inputLengthValid ? (
              ""
            ) : (
              <>
                National ID must be exactly 14 characters. <br />
              </>
            )}

            {inputValid ? "" : "Please enter a valid National ID."}
          </Form.Control.Feedback>
        </FloatingLabel>
      </div>
    </Row>
  );
};

export default NationalIDInput;
