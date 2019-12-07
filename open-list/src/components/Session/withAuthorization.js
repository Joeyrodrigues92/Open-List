import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from './context';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../routes/routes';


const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        // The protection of both pages/routes is almost done. 
        // One refinement can be made in the withAuthorization higher-order component 
        // using the authenticated user from the context:
        <AuthUserContext.Consumer>
        {authUser =>
          condition(authUser) ? <Component {...this.props} /> : null
        }
      </AuthUserContext.Consumer>
      );
    }
  }
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};


export default withAuthorization;