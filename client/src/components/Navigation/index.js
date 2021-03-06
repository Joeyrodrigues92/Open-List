import React, { useState } from 'react';


import SignOutButton from '../SignOut';
import * as ROUTES from '../../routes/routes';

import { AuthUserContext } from '../Session';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';




//the Navigation component uses the new context to consume the authenticated user

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {
        authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Open-House Log</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={ROUTES.LANDING}>Landing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={ROUTES.HOME}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={ROUTES.ACCOUNT}>Account</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href={ROUTES.ADMIN}>Admin</NavLink>
            </NavItem> */}
          </Nav>
          <SignOutButton />
        </Collapse>
      </Navbar>
    </div>
  );
}


const NavigationNonAuth = () => (
  <div>
    <Navbar color="light" light expand="md">
    <NavbarBrand href="/">reactstrap</NavbarBrand>
    <NavbarToggler />
      <Collapse navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href={ROUTES.LANDING}>Landing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={ROUTES.SIGN_IN}>Sign In</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
);


export default Navigation;
