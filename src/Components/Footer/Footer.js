import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAndroid,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg text-white py-4">
      <Container>
        <Row>
          <Col xs={6} sm={3} className="mb-3 mb-md-0 ">
            <h5>My Account</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/home/profile/myOrderPage"}>
                  <span style={{ color: "#fff", textDecoration: "underline" }}>
                    MyProfile
                  </span>
                </Link>{" "}
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={3} className="mb-3 mb-md-0">
            <h5>Facebook</h5>
            <ul className="list-unstyled">
              <li>
                <FontAwesomeIcon icon={faFacebookF} /> Facebook/Hatley
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={3} className="mb-3 mb-md-0">
            <h5>Android</h5>
            <ul className="list-unstyled">
              <li>
                <FontAwesomeIcon icon={faAndroid} /> Android
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={3}>
            <h5>Complaints</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/home/contact"}>
                  <span style={{ color: "#fff", textDecoration: "underline" }}>
                    Complaints
                  </span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-white" />
        <Row>
          <Col xs={6} sm={3} className="mb-3 mb-md-0">
            <h5>Arabic</h5>
            <ul className="list-unstyled">
              <li>Arabic</li>
            </ul>
          </Col>
          <Col xs={6} sm={3} className="mb-3 mb-md-0">
            <h5>Instagram</h5>
            <ul className="list-unstyled">
              <li>
                <FontAwesomeIcon icon={faInstagram} /> Instagram/Hatley
              </li>
            </ul>
          </Col>
          <Col xs={6} sm={3} className="mb-3 mb-md-0">
            <h5>iOS</h5>
            <ul className="list-unstyled">
              <li>iOS</li>
            </ul>
          </Col>
          <Col xs={6} sm={3}>
            <h5>Login as Delivery</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/delivery/loginDelivery"}>
                  <span style={{ color: "#fff", textDecoration: "underline" }}>
                    {" "}
                    Login as Delivery
                  </span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
