import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SidebarDelivery, NavbarDelivery, Header } from "../../../Components";
import "./DeliveryInformation.css";
import InfoALL from "../../../Components/InfoAll/InfoAll";
function DeliveryInformation() {
  return (
    <Container fluid>
      <Row>
        <NavbarDelivery />
      </Row>
      <Row className={` flex-column-sm ${"header-order-details-to-right"}`}>
        <Col xs={12} sm={3} md={4} lg={2} className="order-1">
          <div className="sidebar-container">
            <SidebarDelivery />
          </div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={10} className="order-lg-2 order-md-2">
          <Header text={"Information"} />
          <InfoALL />
        </Col>
      </Row>
    </Container>
  );
}
export default DeliveryInformation;
