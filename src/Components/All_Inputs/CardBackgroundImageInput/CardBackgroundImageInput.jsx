// CardBackgroundImageInput.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "..//CardFrontImageInput/CardFrontImageInput.css";
import { Row } from "react-bootstrap";

const CardBackgroundImageInput = ({ value, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      uploadFile(file);
      onChange(file);
    }
  };

  const uploadFile = (file) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("File uploaded:", file.name);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Row>
      <div className="image-input-component all-div mt-3">
        <label className="image-input-label">Back of ID</label>
        <label htmlFor="backFileInput" className="file-button">
          {isLoading ? "Uploading..." : "Choose File"}
          <span className="file-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
        </label>
        <input
          type="file"
          id="backFileInput"
          style={{ display: "none" }}
          onChange={handleFileInput}
          required
        />
        {selectedFile && <div className="file-name">{selectedFile.name}</div>}
      </div>
    </Row>
  );
};

export default CardBackgroundImageInput;
