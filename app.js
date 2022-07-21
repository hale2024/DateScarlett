const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const request = require("request");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mailchimp.setConfig({
  apiKey: "70c1992f2f88303924063f310111994b-us11",
  server: "us11"
});

app.get("/", function(req, res) {
  console.log("get is working");
  res.sendFile(__dirname + "/signup.html")

})

app.post("/", function(req, res) {
  const listId = "64813f1a1e";
  const subscribingUser = {

    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.Email
  }
  async function run() {
    try{
            const response = await mailchimp.lists.addListMember(listId, {
              email_address: subscribingUser.email,
              status: "subscribed",
              merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
              }
            });
            console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
            res.sendFile(__dirname+'/success.html')
          }catch(e){
            res.sendFile(__dirname+'/failure.html')
          }
    }
  run();
})


// 70c1992f2f88303924063f310111994b-us11

// audience/list id
//64813f1a1e
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running");
})
