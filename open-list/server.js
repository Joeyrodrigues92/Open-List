const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;




// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//NodeMailer

// nodemailer.createTestAccount((err, account) => {
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//           user: account.user, // generated ethereal user
//           pass: account.pass  // generated ethereal password
//       }
//   });
// });

// transporter.sendMail(...).then(info=>{
//   console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
// });



app.post('/email', (req, res) =>{
  console.log('REQQQQQQ', req.body)
})


// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });




// app.get('/hey', function (req, res) {
//   res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
// });


// app.use((req, res) =>
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// );


//console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
