import React, { FunctionComponent } from 'react';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Nav } from "react-bootstrap";
import {
  AppHeaderDropdown,
  AppSidebarToggler,
  // @ts-ignore
} from '@coreui/react';
import { Link } from 'react-router-dom';

import logo from "../../Assets/logo.svg";
import avatar from "../../Assets/avatar.jpg";

const Header: FunctionComponent = () => {
    return (
      <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile/>
          <span className="navbar-brand">
          <img src={logo} width="32" height="35" alt="Core-ui app" />
          <span>Scuti asia</span>
          </span>
          <Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <AppHeaderDropdown>
                  <NavDropdown title={
                     <img src={avatar} className="img-avatar" alt='avatar'/>
                  }
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item tag={Link} href="logout">Logout</NavDropdown.Item>
                  </NavDropdown>
                </AppHeaderDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </React.Fragment>
    );
};


export default Header;
