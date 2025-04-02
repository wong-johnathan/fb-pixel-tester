import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import queryString from "query-string";

const inputStyle = { fontSize: "0.75rem" };
const FieldsModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(queryString.parse(location.search));
  const [fields, setFields] = useState({
    checkin_date: moment(new Date()).format("YYYY-MM-DD"),
    checkout_date: moment(new Date(moment(new Date()).add(1, "days"))).format(
      "YYYY-MM-DD"
    ),
    num_adults: 1,
  });

  useEffect(() => {
    if (new Date(fields.checkin_date) > new Date(fields.checkout_date)) {
      setFields({
        ...fields,
        checkout_date: moment(
          new Date(moment(fields.checkin_date).add(1, "days"))
        ).format("YYYY-MM-DD"),
      });
    }
  }, [fields.checkin_date, fields]);

  const updateField = (e) =>
    setFields({ ...fields, [e.target.id]: e.target.value });

  const submit = () => {
    const search = { ...fields, ...query };
    setQuery(search);
    navigate(
      `${location.pathname}?${Object.keys(search)
        .map((key) => `${key}=${search[key]}`)
        .join("&")}`
    );
  };

  return (
    <Modal
      isOpen={!(query.checkin_date && query.checkout_date && query.num_adults)}
      centered
    >
      <ModalHeader>Booking</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="12">
            <InputGroup className="customInput">
              <InputGroupText style={inputStyle}>
                <FontAwesomeIcon icon={faUser} className="mx-1" /> Travellers
              </InputGroupText>
              <Input
                style={inputStyle}
                type="select"
                id="num_adults"
                onChange={updateField}
                value={fields.num_adults ? fields.num_adults : ""}
              >
                {[...Array(10)].map((a, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Input>
            </InputGroup>
          </Col>
          <Col xs="12">
            <InputGroup className="customInput">
              <InputGroupText style={inputStyle}>
                <FontAwesomeIcon icon={faCalendar} className="mx-1" /> Check In
              </InputGroupText>
              <Input
                style={inputStyle}
                type="date"
                min={moment(new Date()).format("YYYY-MM-DD")}
                max={moment(fields.checkout_date)}
                value={fields.checkin_date ? fields.checkin_date : ""}
                onChange={updateField}
                id="checkin_date"
              />
            </InputGroup>
          </Col>
          <Col xs="12">
            <InputGroup className="customInput">
              <InputGroupText style={inputStyle}>
                <FontAwesomeIcon icon={faCalendar} className="mx-1" />
                Check Out
              </InputGroupText>
              <Input
                style={inputStyle}
                type="date"
                value={fields.checkout_date ? fields.checkout_date : ""}
                min={moment(
                  new Date(moment(fields.checkin_date).add(1, "days"))
                ).format("YYYY-MM-DD")}
                id="checkout_date"
                onChange={updateField}
              />
            </InputGroup>
          </Col>
          <Col xs="auto" style={{ marginLeft: "auto" }}>
            <Button
              color="primary"
              onClick={submit}
              disabled={
                !(
                  fields.checkin_date &&
                  fields.checkout_date &&
                  fields.num_adults
                )
              }
            >
              Submit
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default FieldsModal;
