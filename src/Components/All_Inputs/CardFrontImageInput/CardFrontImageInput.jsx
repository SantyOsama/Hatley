// CardFrontImageInput.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./CardFrontImageInput.css"; // make sure this is the correct path
import { Row } from "react-bootstrap";

const CardFrontImageInput = ({ value, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (!file) return; // Do nothing if no file is selected
    setSelectedFile(file);
    onChange(file);
    uploadFile(file);
  };

  const uploadFile = (file) => {
    setIsLoading(true);
    // Mock upload function - replace with actual upload logic
    setTimeout(() => {
      console.log("File uploaded:", file.name);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Row className="">
      <div className="image-input-component all-div">
        <label className="image-input-label">Front of ID</label>
        <label htmlFor="frontFileInput" className="file-button">
          {isLoading ? "Uploading..." : "Choose File"}
          <span className="file-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
        </label>
        <input
          type="file"
          id="frontFileInput"
          style={{ display: "none" }}
          onChange={handleFileInput}
          required
        />
        {selectedFile && <div className="file-name">{selectedFile.name}</div>}
      </div>
    </Row>
  );
};

export default CardFrontImageInput;
