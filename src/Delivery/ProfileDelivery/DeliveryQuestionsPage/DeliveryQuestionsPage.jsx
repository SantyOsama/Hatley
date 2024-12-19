import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import {
  Header,
  SidebarDelivery,
  Question,
  NavbarDelivery,
} from "../../../Components";
import "./DeliveryQuestionsPage.css";
import { questions } from "../../../User/ProfileUser/QuestionsPage/questionsData";
function QuestionsPage() {
  return (
    <Container fluid>
      <Row>
        <NavbarDelivery />
      </Row>
      <Row className={`flex-column-sm ${"header-order-details-to-right"}`}>
        <Col xs={12} sm={3} md={4} lg={2} className="order-1">
          <div className="sidebar-container">
            <SidebarDelivery />
          </div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={10} className="order-lg-2 order-md-2">
          <Header text="Most Common Questions" />
          <div className="all-questions">
            {questions.map((question, index) => (
              <div key={index} className="sizing">
                <Question title={question.title} content={question.content} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
}
export default QuestionsPage;
