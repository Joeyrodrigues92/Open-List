// you can use the higher-order component to protect your routes (e.g. /home and /account) 
// with authorization rules using the passed condition() function. To keep it simple, 
// the following two components are only protected with a broad 
// authorization rule that checks if the authUser is not null. 
// First, enhance the HomePage component with the higher-order 
// component and define the authorization condition for it:

import React from 'react';
import { withAuthorization } from '../Session';


const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);