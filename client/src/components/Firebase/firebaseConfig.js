import app from 'firebase';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: process.env.REACT_APP_API_KEY || process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {

  constructor() {
    console.log('YOOOOOOO', config)
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }


  // *** AuTHENTICATION METHODS,  API ***



          //SIGN-UP
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

          //LOGIN / SIGN-IN
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

          //SIGN-OUT
    doSignOut = () => this.auth.signOut();

          //RESET PSSWRD
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });

          //UPDATE PSSWRD
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

        // *** User API  ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    //WE WILL ALSO CALL THIS TO REMOVE FROM OUR DB WHEN ADMIN CLOSES OUT LIST.
    createNewList = uid => this.db.ref(`users/${uid}/openList`);

    addToList = (uid, listKey) => this.db.ref(`users/${uid}/openList/${listKey}/regUser`);

  
  } 


export default Firebase;


// starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// addToList.on('value', function(snapshot) {
//   console.log(snapshot.val())
//  // updateStarCount(postElement, snapshot.val());
// });




// *****TO YOU WHEN WE CREATE TWO DBs, PRODUCTION AND TESTING*****

// import app from 'firebase/app';
// const prodConfig = {
//   apiKey: process.env.REACT_APP_PROD_API_KEY,
//   authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };
// const devConfig = {
//   apiKey: process.env.REACT_APP_DEV_API_KEY,
//   authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//   projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
// };
// const config =
//   process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//   }
// }
// export default Firebase;

//=========================================
//DOC FOR AUTH USING FIREBASE 
// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#session-handling-with-higher-order-components