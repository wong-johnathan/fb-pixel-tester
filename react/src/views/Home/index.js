import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import CustomContainer from "../../components/CustomContainer";

const Home = () => {
  return (
    <>
      <CustomContainer>
        <Container className="py-4">
          <div className="text-center">
            <Row>
              <Col>
                <h1>Smartly.io Travel Agency</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Your number 1 choice for virtual travel</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <NavLink to="/hotels">
                  <Button>
                    <FontAwesomeIcon icon={faBed} className="mx-2" />
                    Hotels
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </div>
        </Container>
      </CustomContainer>
    </>
  );
};

export default Home;
