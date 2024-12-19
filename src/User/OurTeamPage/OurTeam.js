import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./OurTeam.css";
import OurTeamPageImage from "../../Tools/Images/avatar.jpg";
import NavbarUser from "../NavbarUser/NavbarUser";
import Person from "./Person";
import AbdullahImage from "../../Tools/Images/our-Team/AbdullahImage.jpg";
import DAliImage from "../../Tools/Images/our-Team/D-Ali.jpg";
import AhmedImage from "../../Tools/Images/our-Team/Ahmed3.jpg";
function OurTeam() {
  return (
    <>
      <Container>
        <NavbarUser />
        <Row>
          <div className="Head mt-2" id="our-team">
            Our Team
          </div>
        </Row>
        <Row>
          <Person
            img={DAliImage}
            name="D/Ali Hussein"
            position="Supervisor"
            description="Director of the Management Information Systems (MIS)"
            linkedin="linkedin"
          />
          <Person
            img={AbdullahImage}
            name="Abdullah Salah "
            position="Backend Developer"
            description="Team Leader & .NET Core Developer "
            linkedin="https://www.linkedin.com/in/abdullah-salah-697257228"
          />
          <Person
            img={AhmedImage}
            name="Ahmed Ali"
            position="Frontend Developer"
            description="React.js Developer & UI/UX Designer"
            linkedin="https://www.linkedin.com/in/ahmed-ali-51736222a/"
          />
          <Person
            img={OurTeamPageImage}
            name="Abdelrahman"
            position="Mobile Developer"
            description="ReactNative Developer Android & iOS "
            linkedin="linkedin"
          />
          <Person
            img={OurTeamPageImage}
            name="Santy Osama"
            position="Frontend Developer"
            description="React.js Developer & UI/UX Designer"
            linkedin="linkedin"
          />
          <Person
            img={OurTeamPageImage}
            name="Rahma Bahaa"
            position="Backend Developer"
            description=".NET Core Developer & .NET MVC Developer"
            linkedin="linkedin"
          />
        </Row>
        {/*<Col className="team-col">
            <Row className="img-row">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Row>
            <Row className="person-details">
              <p className="person-name">Name</p>
              <p className="person-position">Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Row>
          </Col>

          <Col className="team-col">
            <Row className="img-row">
              {" "}
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Row>
            <Row className="person-details">
              <p className="person-name">Name</p>
              <p className="person-position">Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Row>
          </Col>

          <Col className="team-col">
            <Row className="img-row">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Row>
            <Row className="person-details">
              <p className="person-name">Name</p>
              <p className="person-position">Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Row>
          </Col>

          <Col className="team-col">
            <Row className="img-row">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Row>
            <Row className="person-details">
              <p className="person-name">Name</p>
              <p className="person-position">Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Row>
          </Col>}
       {//////////////////////////////////////////////////////////////////////////////////////}
        {/* <Row>
            <Col>
              <div className="Head">Our Team</div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-md-center">
            <Col className="img-col">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Col>
            <Col className="img-col">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Col>
            <Col className="img-col">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Col>
            <Col className="img-col">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Col>
            <Col className="img-col">
              <img className="rounded-img" src={OurTeamPageImage} alt=""></img>
            </Col>
          </Row>
        </Container>
        <Container className="team-details">
          <Row className="justify-content-center">
            <Col>
              <p>Name</p>
              <p>Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Col>
            <Col className="person-details">
              <p>Name</p>
              <p>Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Col>
            <Col className="person-details">
              <p>Name</p>
              <p>Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Col>
            <Col className="person-details">
              <p>Name</p>
              <p>Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Col>
            <Col className="person-details">
              <p>Name</p>
              <p>Position</p>
              <p className="description">
                Lorem ipsum dolor sit amat, mails consectetur
              </p>
              <p>linkedin</p>
            </Col>
          </Row> */}
      </Container>{" "}
      <div className="floating"></div>
    </>
  );
}
export default OurTeam;
