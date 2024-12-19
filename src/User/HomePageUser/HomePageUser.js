import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../User/NavbarUser/NavbarUser";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomePageUser.css";
import HomePageImage from "../../Tools/Images/HomePageImage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/Footer/Footer";

function HomePageUser() {
  const navigate = useNavigate();

  return (
    <>
      <NavbarUser />
      <Container>
        <Row>
          <Col xs={12} md={6} id="have-margin">
            <div className="text-content">
              <h2 className="large-homepageuser">
                Hatley – The easiest way to get your orders delivered
              </h2>
              <p className="large-homepageuser">
                Post your order now and let our delivery staff provide you with
                the best offers!
              </p>
              <Col xs={12} md={12}>
                <div className="text-center">
                  <Button
                    variant="primary"
                    className="order-button "
                    onClick={() => navigate("/home/makeOrder")}
                  >
                    Make Order Now{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Button>
                </div>
              </Col>
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-md-end"
            id="have-margin"
          >
            <div className="image-container">
              <img
                src={HomePageImage}
                alt=""
                className="img-fluid smaller-image"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default HomePageUser;
