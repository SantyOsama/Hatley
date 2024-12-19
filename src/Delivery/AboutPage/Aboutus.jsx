import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import aboutUsImage from "../../Tools/Images/about.png";
import React from "react";
import "./Aboutus.css";
import NavbarDelivery from "../../Components/NavbarDelivery/NavbarDelivery";

function Aboutus() {
  return (
    <>
      <NavbarDelivery />
      <Container>
        <Row>
          <Col>
            <div className="aboutContent">
              <div className="Head">About Us</div>
              <p className="aboutText">
                At Hatley, we're all about delivering convenience to your
                doorstep. We understand that time is precious, and that's why
                we've created a platform that puts the power in your hands. You
                can place your order, choose from a variety of delivery offers,
                and enjoy a hassle-free delivery experience. Your satisfaction
                is our priority, and we're here to make your life easier, one
                delivery at a time.
              </p>
              <div className="aboutIcons">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
              </div>
            </div>
          </Col>
          <Col>
            <div className="aboutImage">
              <img className="abt-img" src={aboutUsImage} alt="About Us" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Aboutus;
