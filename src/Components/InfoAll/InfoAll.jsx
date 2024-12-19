import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import SectionInfo from "../../Components/SectionInfo/SectionInfo";
import "../../Delivery/ProfileDelivery/DeliveryInformation/DeliveryInformation.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinners from "../Spinners/Spinners";
import "./info.css";
import MyProfileImage from "./../../Tools/Images/MyProfile.svg";
import { Col, Container, Row } from "react-bootstrap";
import StarForComment from "../StarForComment/StarForComment";

function InfoALL() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const type = useSelector((state) => state.auth.userType);
  const profileImage = useSelector((state) => state.auth.profileImage);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiEndpoint =
          type === "USER"
            ? "https://hatley.runasp.net/api/User/profile"
            : "https://hatley.runasp.net/api/Delivery/profile";
        const response = await axios.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setUserData(response.data);
        } else if (response.status === 401) {
          setError("Unauthorized");
        } else if (response.status === 404) {
          setError("The user does not exist");
        } else {
          setError("An unexpected error occurred");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized");
        } else if (err.response && err.response.status === 404) {
          setError("The user does not exist");
        } else {
          setError("Failed to fetch data");
        }
      }
    };
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "https://hatley.runasp.net/api/Order/Statistics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setStatistics(response.data);
        } else {
          setError("Failed to fetch statistics");
        }
      } catch (err) {
        setError("Failed to fetch statistics");
      }
    };

    if (token) {
      fetchProfile();
      fetchStatistics();
    }
  }, [token, type]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {!userData || !statistics ? (
        <Spinners />
      ) : (
        <>
          <div className="border-red">
            <Container>
              <Row>
                <h2>Personal Info:</h2>
              </Row>
              <Row>
                <div
                  className="info-container"
                  style={{ marginBottom: "50px" }}
                >
                  <Col>
                    <div style={{ width: "75%", height: "100%" }}>
                      {profileImage ? (
                        <img
                          alt="profilephoto"
                          src={profileImage}
                          className="national-id-image"
                          style={{ height: "200px", borderRadius: "50%" }}
                        />
                      ) : (
                        <img
                          alt="profilephoto"
                          src={MyProfileImage}
                          style={{ height: "200px", borderRadius: "50%" }}
                          className="national-id-image"
                        />
                      )}
                      <Row>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <StarForComment coloredStars={1} />
                          <span style={{ marginLeft: "5px", color: "#626262" }}>
                            {statistics.rate.toFixed(2)}
                          </span>
                        </div>
                      </Row>
                    </div>

                    <Row>Rate</Row>
                  </Col>
                  <Col xs lg="8">
                    {" "}
                    <div className="user-profile">
                      <div className="user-info">
                        <SectionInfo name="Name" value={userData.name} />
                        <SectionInfo name="Email" value={userData.email} />
                        <SectionInfo name="Phone" value={userData.phone} />
                        {type === "DELIVERY" && (
                          <>
                            <SectionInfo
                              name="National ID"
                              value={userData.national_id}
                            />
                            <SectionInfo
                              name="Governorate"
                              value={userData.governorate_Name}
                            />
                            <SectionInfo
                              name="Zone"
                              value={userData.zone_Name}
                            />
                          </>
                        )}
                        <div className="personal-info-edit">
                          {type === "USER" ? (
                            <Link to={"/home/profile/settings"}>
                              Edit <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                          ) : (
                            <Link
                              to={"/home-delivery/profile-delivery/settings"}
                            >
                              Edit <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="user-profile">
                  <p style={{ fontWeight: "700", fontSize: "x-large" }}>
                    Statistics:
                  </p>
                  <Row className="statistics-row">
                    <Col className="statistics-col">
                      <Row>
                        <strong>Pending Orders:</strong>
                      </Row>
                      <Row>{statistics.pending}</Row>
                    </Col>
                    <Col className="statistics-col">
                      <Row>
                        <strong>Completed Orders:</strong>
                      </Row>
                      <Row>{statistics.complete_orders}</Row>
                    </Col>
                    <Col className="statistics-col">
                      <Row>
                        <strong>Incomplete Orders:</strong>
                      </Row>
                      <Row>{statistics.incomplete_orders}</Row>
                    </Col>
                  </Row>
                  <Row className="statistics-row">
                    <Col className="statistics-col">
                      <Row>
                        <strong>Total Orders:</strong>
                      </Row>
                      <Row>{statistics.total_orders}</Row>
                    </Col>
                    <Col className="statistics-col">
                      <Row>
                        <strong>Orders last 30 days</strong>
                      </Row>
                      <Row>{statistics.orders_last_30_days}</Row>
                    </Col>
                  </Row>
                </div>
              </Row>
              {/* {type === "DELIVERY" && (
                <div className="national-images">
                  <Row>
                    <Col>
                      <p>
                        <strong style={{ color: "#06004f", fontSize: "80%" }}>
                          Front National ID Image:
                        </strong>{" "}
                      </p>
                      <img
                        src={userData.front_National_ID_img}
                        alt="Front with National ID"
                        className="national-id-image"
                      />
                    </Col>
                    <Col>
                      <p>
                        <strong style={{ color: "#06004f", fontSize: "80%" }}>
                          Back National ID Image:
                        </strong>{" "}
                      </p>
                      <img
                        src={userData.back_National_ID_img}
                        alt="Back with National ID"
                        className="national-id-image"
                      />
                    </Col>
                    <Col>
                      <p>
                        <strong style={{ color: "#06004f", fontSize: "80%" }}>
                          Face with National ID Image:
                        </strong>{" "}
                      </p>
                      <img
                        src={userData.face_with_National_ID_img}
                        alt="Face with National ID"
                        className="national-id-image"
                      />
                    </Col>
                  </Row>
                </div>
              )} */}
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default InfoALL;
