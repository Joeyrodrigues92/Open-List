import React from 'react';
import './style.css';
import * as ROUTES from '../../routes/routes';
// import { withAuthorization } from '../Session';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { AuthUserContext } from '../Session';


const Landing = () => (
  <div>

    <AuthUserContext.Consumer> 
      {authUser =>
        authUser ? <LandingIn /> : <LandingOut />
      }
    </AuthUserContext.Consumer>
    <Container>
        <Row>
          <Col>Create A List</Col>
          <Col>Visitors Registor</Col>
          <Col>Recevie Emails With Visitors Info</Col>
        </Row>
      </Container>
  </div>
);

const LandingOut = () => (
  
    <Jumbotron>
        <h1 className="display-3">Open-House Log</h1>
        <p className="lead">We Make It Easy To Handle Your Open House</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button href={ROUTES.SIGN_IN} color="primary">Sign Up</Button>
        </p>
      </Jumbotron>

);

const LandingIn = () => (
 
    <Jumbotron>
        <h1 className="display-3">Open-House Log</h1>
        <p className="lead">We Make It Easy To Handle Your Open House</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        {/* <p className="lead">
          <Button href={ROUTES.SIGN_IN} color="primary">Sign Up</Button>
        </p> */}
      </Jumbotron>

);

// const condition = authUser => !!authUser;

export default Landing
