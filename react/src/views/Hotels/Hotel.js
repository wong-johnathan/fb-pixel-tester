import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const Hotel = ({ hotel }) => {
  return (
    <Card style={{ maxHeight: "370px" }} className="my-1 customHotel">
      <div
        style={{
          backgroundImage: `url(${hotel.imageurl})`,
          backgroundSize: "cover",
          width: "100%",
          height: "250px",
        }}
      ></div>
      <CardHeader tag="h4">{hotel.name}</CardHeader>
      <CardBody>
        <Row className="align-items-center">
          <Col xs="12">
            <p style={{ fontSize: "0.9rem" }} className="mb-0">
              {hotel.addr1} - {hotel.country}{" "}
              {hotel.country !== hotel.city && `- ${hotel.city}`}
            </p>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs="auto">
            <Badge color="primary" className="py-2">
              ${hotel.baseprice} per night
            </Badge>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs="auto">
            {[...Array(hotel.starrating)].map((a, i) => (
              <FontAwesomeIcon icon={faStar} key={i} />
            ))}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Hotel;
