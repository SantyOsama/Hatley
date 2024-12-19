import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./LoadingButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      className="Loading-Button"
    >
      {isLoading ? (
        "Loading…"
      ) : (
        <>
          <span className="me-2">Use Current Location</span>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </>
      )}
    </Button>
  );
}

export default LoadingButton;
