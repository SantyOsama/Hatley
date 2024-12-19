import React from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Person(props) {
  // img      name     position      description    linkedin
  return (
    <Col xs={12} sm={6} md={4} lg={2} className="team-col ">
      <div className="img-row ">
        <img className="rounded-img" src={props.img} alt={props.name} />
      </div>
      <div className="person-details mt-5">
        <p className="person-name">{props.name}</p>
        <p className="person-position">{props.position}</p>
        <p className="description">{props.description}</p>
        <a href={props.linkedin} className="linkedin-icon">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </Col>
  );
}

export default Person;
