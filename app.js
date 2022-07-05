const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require('express');
const https = require('https');
const request = require('request');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname));

mailchimp.setConfig({
  apiKey: "a336fc4a9370d7ec6aa52fc6fc23b80f-us18",
  server: "us18",
});


app.get("/", async (req, res, next) => {
  res.sendFile(__dirname + "/signup.html");
  // const response = await mailchimp.lists.getListMembersInfo("fd05d703bd");
  // console.log(response);
  // res.json(response);
});

app.post("/", async (req, res, next) => {
  const fName = req.body.user.Fname;
  const lName = req.body.user.Lname;
  const email = req.body.user.email;
  try {
    const response = await mailchimp.lists.addListMember("fd05d703bd", {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      },
    });
    console.log(response.statusCode);
    // console.log(response.status);
    if (res.statusCode===200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  } catch(err) {
    console.log(err.status);
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure", async(req, res, next)=>{
  res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT || 3000, () => console.log("The server is running on port 3000"));




// API apiKey
// a336fc4a9370d7ec6aa52fc6fc23b80f-us18
// listID
// fd05d703bd
