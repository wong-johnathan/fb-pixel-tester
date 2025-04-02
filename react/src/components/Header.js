import { faBed, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  Container,
  Collapse,
  NavbarToggler,
} from "reactstrap";

const navigations = [
  {
    text: "Home",
    link: "/",
    type: "home",
    id: "home",
    icon: <FontAwesomeIcon icon={faHome} className="mx-1" />,
  },
  {
    text: "Hotels",
    link: "/hotels",
    type: "item",
    id: "hotel",
    icon: <FontAwesomeIcon icon={faBed} className="mx-1" />,
  },
];

const Header = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed-top"
        style={{
          backgroundColor: "#f8f8f8",
          borderBottom: "1px solid #d9d9d9",
          height: "62px",
        }}
      >
        <Container>
          <Navbar expand="lg" light>
            <NavbarBrand tag="span" className="me-auto">
              <NavLink
                to="/"
                className="px-4 py-2"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                Smartly Demo
              </NavLink>
            </NavbarBrand>
            <NavbarToggler
              onClick={() => setIsOpen(!isOpen)}
              className="me-2"
            />
            <Collapse
              navbar
              isOpen={isOpen}
              style={{ backgroundColor: "#f8f8f8" }}
            >
              <Nav navbar className="me-auto align-items-center">
                {navigations.map((navigation) => (
                  <NavItem key={navigation.id}>
                    <NavLink
                      to={navigation.link}
                      className="px-4 py-2"
                      style={{
                        fontSize: "0.75rem",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {navigation.icon}
                      {navigation.text}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
      <div style={{ height: "62px" }} />
      {children}
    </>
  );
};

export default Header;
