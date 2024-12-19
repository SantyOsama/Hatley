import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import StarForComment from "../StarForComment/StarForComment";
import "./Comment.css";
function Comment(props) {
  return (
    <div className="one-comment-one">
      <Row>
        <Col>
          <Image
            src={props.photo}
            className="profile-image mb-1"
            style={{
              height: "50px",
              width: "50px",
              maxWidth: "100%",
              border: "1px solid white",
              borderRadius: "50%",
            }}
          />
          <p className="comment-name"> {props.name}</p>
        </Col>
        <Col style={{ display: "flex" }}>
          <Col>
            <StarForComment coloredStars={props.coloredStars} num={props.num} />
          </Col>
        </Col>
        <Col style={{ display: "flex" }}>
          <Col>
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              {props.date}
            </Row>
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              {props.time}
            </Row>
          </Col>
        </Col>
        <Row>
          <Col>{props.content}</Col>
        </Row>
      </Row>
    </div>
  );
}
export default Comment;
