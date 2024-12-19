import { Button, Col, Row } from "react-bootstrap";
import "./NotificationDelivery.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NotificationImage from "./../../Tools/Images/MyProfile.svg";
// import NotifyOfAcceptOrDeclineForDeliveryOffer from "../../Hub/NotifyOfAcceptOrDeclineForDeliveryOffer";

function NotificationDelivery() {
  const navigate = useNavigate();
  // const [visible, setVisible] = useState(true);
  // const [fadeOut, setFadeOut] = useState(false); // State to trigger fade out
  // const noOp = () => {};
  // noOp(fadeOut);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setFadeOut(true); // Start fading out
  //     setTimeout(() => {
  //       setVisible(false); // Completely hide after fade out
  //     }, 500); // Matches the CSS transition time
  //   }, 43500); // Start fading out 0.5 seconds before the timer ends

  //   return () => clearTimeout(timeout);
  // }, []);

  // const handleDeclineClick = () => {
  //   setFadeOut(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 50050);
  // };
  return (
    <>
      {/* <NotifyOfAcceptOrDeclineForDeliveryOffer /> */}

      <div className="notification">
        <Row>
          <div className="two-col ms-3">
            <div className="image-icon">
              <img src={NotificationImage} alt="Notification" />
            </div>
            <div className="text-start ms-4">
              <Col xs={12} md={6} className="Not-det mb-3">
                <span>Motorcycle</span>
                <span>Ahmed Mohamed</span>
                <span>
                  <FontAwesomeIcon icon={faStar} className="not-star" />
                  4.0 <span className="ms-1">(40)</span>
                </span>
              </Col>
            </div>
            <div className="text-start">
              <Col xs={12} md={6} className="Not-info  mb-3">
                <span>EGP25</span>
                <span>3 min.</span>
                <span>1.0 km</span>
              </Col>
            </div>
          </div>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="Not-buttons">
            <Button className="me-2 mb-3">Decline</Button>
            <Button
              className="mb-3"
              onClick={() =>
                navigate("/delivery/home-delivery/trackingOrdersDelivery")
              }
            >
              Accept
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NotificationDelivery;
