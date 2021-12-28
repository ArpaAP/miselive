import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Navibar = () => {
  return (
    <div style={{ paddingTop: 65.94 }}>
      <Navbar
        bg="white"
        expand="sm"
        fixed="top"
        className="nav-item shadow no-drag"
      >
        <Navbar.Brand href="/" className="ps-3">
          MiseLive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">홈</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navibar;
