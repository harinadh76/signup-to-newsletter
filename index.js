const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName,lastName,email);
  const data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/db518f9529"
  const options = {
    method : "POST",
    auth : "knight11:cee3083e050a89db6c24751d5bf8ff48-us14"
  }
const request =   https.request(url,options, function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname+"/success.html");
  //  res.send("sucess")
  }else{
     res.sendFile(__dirname+"/failure.html");
  //  res.send("failed")
  }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})
app.listen(process.env.port || 3000, function(){
  console.log("server running on port 3000");
})

//cee3083e050a89db6c24751d5bf8ff48-us14  (api-key)
