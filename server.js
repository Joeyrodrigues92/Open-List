const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const nodemailer = require("nodemailer");
const nodeMailgun =  require('nodemailer-mailgun-transport');
const Email = require('email-templates');


const port = process.env.PORT || 5000;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}




app.post('/email', (req, res) =>{
  let userObjArr = [];
  let data = req.body.data;

  for (let i = 0; i < data.length; i++) {
      let userArr = data[i];
    for (let j = 0; j < userArr.length; j++) {
      let userObj = userArr[j];
      if(typeof userObj === 'object'){
          console.log('we got obj', userObj)
        userObjArr.push(userObj)
    }
  }
}
  let auth ={
    auth:{
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  }

  let transport = nodemailer.createTransport( nodeMailgun(auth) ); 

 
  const email = new Email({
    preview: false,
    message: {
      from: 'Excited User <me@samples.mailgun.org>'
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport
  });


   
  email
    .send({
      template: path.join(__dirname, 'templates'),
      message: {
        to: 'syrodrigues95@gmail.com'
      },
      locals: {
        arr: userObjArr
      }
    })
    .then(console.log)
    .catch(console.error);
}); 

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });




// app.get('/hey', function (req, res) {
//   res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
// });


app.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/public/index.html"))
);


//console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
