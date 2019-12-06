
// To keep the App component clean and concise, I like to extract the session handling 
// for the authenticated user to a separate higher-order component

import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }

    //We also want to avoid memory leaks that lead to performance issues, so we'll remove the listener if the component unmounts.

    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
                //The  component can use the new context to provide the authenticated user to components that are interested in it

        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;