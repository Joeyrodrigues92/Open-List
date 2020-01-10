import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';




//the Navigation component uses the new context to consume the authenticated user

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
    
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

// const NavigationAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.HOME}>Home</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ACCOUNT}>Account</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ADMIN}>Admin</Link>
//     </li>
//     <li>
//       <SignOutButton />
//     </li>
//   </ul>
// );


const NavigationAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
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
            <NavItem>
              <NavLink href={ROUTES.ADMIN}>Admin</NavLink>
            </NavItem>
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
        <SignOutButton />
      </Collapse>
    </Navbar>
  </div>
);


export default Navigation;
