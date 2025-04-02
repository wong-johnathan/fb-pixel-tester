import {
  faBed,
  faCalendar,
  faMapMarkedAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  Col,
  InputGroup,
  Row,
  InputGroupText,
  Input,
  Container,
  Button,
} from "reactstrap";
import CustomContainer from "../../components/CustomContainer";

const inputStyle = { fontSize: "0.75rem" };
const Search = ({ fields, setField, hotels, reset, search }) => {
  const cities = [...new Set(hotels.map(({ city }) => city))];
  return (
    <CustomContainer>
      <Container className="py-4">
        <div className="text-center">
          <Row>
            <Col>
              <h1>
                <FontAwesomeIcon icon={faBed} /> Hotels
              </h1>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6" xl="2" className="align-items-center">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="mx-1" />
                  Cities
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="select"
                  value={fields.city}
                  onChange={setField}
                  id="city"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </Col>
            <Col xs="12" md="6" xl="2">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faUser} className="mx-1" /> Travellers
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="select"
                  id="num_adults"
                  onChange={setField}
                  value={fields.num_adults}
                >
                  {[...Array(10)].map((a, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </Col>
            <Col xs="12" md="6" xl="3">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faCalendar} className="mx-1" /> Check
                  In
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="date"
                  min={moment(new Date()).format("YYYY-MM-DD")}
                  max={moment(fields.checkout_date)}
                  value={fields.checkin_date}
                  onChange={setField}
                  id="checkin_date"
                />
              </InputGroup>
            </Col>
            <Col xs="12" md="6" xl="3">
              <InputGroup className="customInput">
                <InputGroupText style={inputStyle}>
                  <FontAwesomeIcon icon={faCalendar} className="mx-1" />
                  Check Out
                </InputGroupText>
                <Input
                  style={inputStyle}
                  type="date"
                  value={fields.checkout_date}
                  min={moment(
                    new Date(moment(fields.checkin_date).add(1, "days"))
                  ).format("YYYY-MM-DD")}
                  id="checkout_date"
                  onChange={setField}
                />
              </InputGroup>
            </Col>
            <Col xs="12" xl="2" className="d-flex justify-content-end">
              <Button className="mx-2" onClick={reset}>
                Clear
              </Button>
              <Button color="primary" onClick={search} disabled={!fields.city}>
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </CustomContainer>
  );
};

export default Search;
