import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebaseConfig';

export default Firebase;
export { FirebaseContext, withFirebase };



// The Firebase Context from the Firebase module (folder) is used to provide a Firebase instance to your entire application 
// in the src/index.js file. You only need to create the Firebase instance with the Firebase class
//  and pass it as value prop to the React's Contex

//*****HOW TO USE FIRBASECONTEXT IN COMPONENTS **********
// import React from 'react';
// import  { FirebaseContext } from '../Firebase';
// const SomeComponent = () => (
//   <FirebaseContext.Consumer>
//     {firebase => {
//       return <div>I've access to Firebase and render something.</div>;
//     }}
//   </FirebaseContext.Consumer>
// );
// export default SomeComponent;