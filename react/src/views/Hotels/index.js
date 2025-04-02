import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Col, Container, Row } from "reactstrap";
import CustomContainer from "../../components/CustomContainer";
import Hotel from "./Hotel";
import Search from "./Search";
import queryString from "query-string";
import { NavLink } from "react-router-dom";
import { fetchHotels } from "../../store/actions/hotels";
import { fbEvent } from "../../util/fbEvent";

const initialState = {
  checkin_date: moment(new Date()).format("YYYY-MM-DD"),
  checkout_date: moment(new Date(moment(new Date()).add(1, "days"))).format(
    "YYYY-MM-DD"
  ),
  num_adults: 1,
  city: "",
};

const Hotels = () => {
  const dispatch = useDispatch();
  const hotels = useSelector(({ hotels }) => hotels);
  const navigate = useNavigate();
  const location = useLocation();
  const [fields, setFields] = useState(initialState);
  const [outputHotel, setOutputHotel] = useState(hotels);
  const [query, setQuery] = useState({});
  const reset = () => {
    setQuery({});
    setFields(initialState);
    navigate("/hotels");
    setOutputHotel(hotels);
  };

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

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (hotels.length === 0) dispatch(fetchHotels());
    else if (Object.keys(query).length > 0) {
      setFields(query);
      setOutputHotel(
        query.city
          ? hotels.filter((hotel) => hotel.city === query.city)
          : hotels
      );
    } else setOutputHotel(hotels);
    setQuery(query);
  }, [location, hotels, dispatch]);

  const setField = (e) =>
    setFields({ ...fields, [e.target.id]: e.target.value });

  const search = () => {
    
    fbEvent({ event: "Search", object: {...fields,country:fields.city,region:fields.city} });
    setOutputHotel(
      fields.city
        ? hotels.filter((hotel) => hotel.city === fields.city)
        : hotels
    );
    const searches = Object.keys(fields).map((key) => `${key}=${fields[key]}`);
    navigate(`/hotels?${searches.join("&")}`);
  };

  return (
    <>
      <Search
        fields={fields}
        setField={setField}
        hotels={hotels}
        reset={reset}
        search={search}
      />
      <CustomContainer>
        <Container className="my-4">
          {Object.keys(query).length > 0 && (
            <Row>
              <Col>
                <p style={{ fontSize: "0.75rem" }}>
                  Found <b>{outputHotel.length}</b> hotels in {query.city} for{" "}
                  <b>{moment(query.checkin_date).format("MMM DD, YYYY")}</b> -{" "}
                  <b>{moment(query.checkout_date).format("MMM DD, YYYY")}</b>
                </p>
              </Col>
            </Row>
          )}
          <Row>
            {outputHotel.map((hotel) => (
              <Col key={hotel.hotelid} xs="12" md="6" lg="4">
                <NavLink
                  to={`/hotels/${hotel.hotelid}?${Object.keys(query)
                    .map((key) => `${key}=${query[key]}`)
                    .join("&")}`}
                >
                  <Hotel hotel={hotel} />
                </NavLink>
              </Col>
            ))}
          </Row>
        </Container>
      </CustomContainer>
    </>
  );
};

export default Hotels;
