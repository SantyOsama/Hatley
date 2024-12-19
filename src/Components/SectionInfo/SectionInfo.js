import React from "react";
import { Col, Row } from "react-bootstrap";
function SectionInfo(props) {
  return (
    <>
      <Row>
        <Col>
          {" "}
          <p>
            <strong style={{ color: "#06004f" }}>{props.name}:</strong>{" "}
            {props.value}
          </p>
        </Col>
      </Row>
    </>
  );
}
export default SectionInfo;
