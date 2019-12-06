import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;


// the authenticated user still needs to be passed down from the App 
// component to interested parties. That can become tedious over time, 
// because the authenticated user has to be passed through all components 
// until it reaches all the leaf components. You used the React Context API 
// to pass down the Firebase instance to any component before