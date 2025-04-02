import { faCalendar, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import CustomContainer from "../../components/CustomContainer";
import queryString from "query-string";
import moment from "moment";
import { fetchHotels } from "../../store/actions/hotels";
import { fbEvent } from "../../util/fbEvent";
import FieldsModal from "./FieldsModal";

const inputStyle = { fontSize: "0.75rem" };

const Hotel = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [query, setQuery] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [fire, setFire] = useState(false);
  const hotel = useSelector(({ hotels }) =>
    hotels?.find((hotel) => hotel.hotelid === parseInt(params.id))
  );

  useEffect(() => {
    if (
      hotel &&
      query.checkin_date &&
      query.checkout_date &&
      query.num_adults &&
      !fire
    ) {
      setFire(true);
      fbEvent({
        event: "viewContent",
        object: {
          ...hotel,
          ...query,
          content_ids: hotel.hotelid,
        },
      });
    }
  }, [query, hotel, fire]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    dispatch(fetchHotels());
    if (Object.keys(query).length > 0) setQuery(query);
    else setQuery({});
  }, [location, dispatch]);

  const updateQuery = (e) => {
    let search = { ...query };
    search[e.target.id] = e.target.value;
    const searchQuery = Object.keys(search).map(
      (key) => `${key}=${search[key]}`
    );
    navigation(`${location.pathname}?${searchQuery.join("&")}`);
  };

  const purchase = () => {
    setIsOpen(true);
    fbEvent({
      event: "Purchase",
      object: { ...hotel, ...query, content_ids: hotel.hotelid },
    });
  };

  if (!hotel) return "Loading....";
  return (
    <>
      <FieldsModal />
      <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} centered>
        <ModalHeader toggle={() => setIsOpen(false)}>Confirm</ModalHeader>
        <ModalBody>Your booking has been confirmed!</ModalBody>
      </Modal>
      <CustomContainer>
        <Container className="text-center my-4">
          <h1>{hotel.name}</h1>
          <img
            src={hotel.imageurl}
            alt={hotel.name}
            width="100%"
            style={{ maxWidth: "400px" }}
          />
        </Container>
      </CustomContainer>
      <CustomContainer>
        <Container className="p-2" style={{ maxWidth: "800px" }}>
          <Row>
            <Col xs="12" md="4">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faUser} className="mx-1" /> Travellers
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="select"
                  id="num_adults"
                  onChange={updateQuery}
                  value={query.num_adults ? query.num_adults : ""}
                >
                  {[...Array(10)].map((a, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </Col>
            <Col xs="12" md="4">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faCalendar} className="mx-1" /> Check
                  In
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="date"
                  min={moment(new Date()).format("YYYY-MM-DD")}
                  max={moment(query.checkout_date)}
                  value={query.checkin_date ? query.checkin_date : ""}
                  onChange={updateQuery}
                  id="checkin_date"
                />
              </InputGroup>
            </Col>
            <Col xs="12" md="4">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faCalendar} className="mx-1" />
                  Check Out
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="date"
                  value={query.checkout_date ? query.checkout_date : ""}
                  min={moment(
                    new Date(moment(query.checkin_date).add(1, "days"))
                  ).format("YYYY-MM-DD")}
                  id="checkout_date"
                  onChange={updateQuery}
                />
              </InputGroup>
            </Col>
          </Row>
          <Card className="p-4 my-2">{hotel.description}</Card>
          <Table striped>
            <tbody style={{ fontSize: "0.75rem" }}>
              <tr>
                <td>Price</td>
                <td>${hotel.baseprice}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{hotel.addr1}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{hotel.city}</td>
              </tr>
              <tr>
                <td>Neighborhood</td>
                <td>{hotel.neighborhood}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{hotel.country}</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>
                  {[...Array(hotel.starrating)].map((a, i) => (
                    <FontAwesomeIcon icon={faStar} key={i} />
                  ))}
                </td>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col xs="auto" style={{ marginLeft: "auto" }}>
              <Button
                color="primary"
                onClick={purchase}
                disabled={
                  !(
                    query.num_adults &&
                    query.checkin_date &&
                    query.checkout_date
                  )
                }
              >
                Book
              </Button>
            </Col>
          </Row>
        </Container>
      </CustomContainer>
    </>
  );
};

export default Hotel;
