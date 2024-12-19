import React from "react";

const OrderIdInput = ({
  value,
  onChange,
  isValid,
  label,
  type,
  name,
  readOnly,
}) => {
  return (
    <div className={`input-field ${!isValid ? "invalid" : ""}`}>
      <label>
        {label}: {""}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        name={name}
        readOnly={readOnly}
        style={{ border: "none", paddingLeft: "20px", fontWeight: "600" }}
      />
      {!isValid && <span className="error-message">Invalid Order ID</span>}
    </div>
  );
};

export default OrderIdInput;
