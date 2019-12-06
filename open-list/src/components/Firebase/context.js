//An alternative way is to use React's Context API to provide a Firebase instance once at the top-level of your component hierarchy.

import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default  FirebaseContext ;


//he createContext() function essentially creates two components. 
//The FirebaseContext.Provider component is used to provide a Firebase instance once at the top-level of your
// React component tree

