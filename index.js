const express=require("express");
const bodyParser =require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){
var firstName= req.body.top;
var lastName= req.body.middle;
var emailId= req.body.bottom;

var data={
members:[
  {email_address:emailId,
  status:"subscribed",
  merge_fields:{
    Fname:firstName,
    Lname:lastName
  }
}]
};
var jsonData=JSON.stringify(data);
var options={
  url:"https://us1.api.mailchimp.com/3.0/lists/1ba589d82c",
  method:"POST",
  headers:{
    "Authorization":"Kushagra1 d330002ef492db4da2b264e9055dcb39-us1"
  },
  body:jsonData
};
request(options,function(error,response,body)
{if(error)
  {res.sendFile(__dirname+"/failure.html");}
  else {
    if(response.statusCode===200)
    {res.sendFile(__dirname+"/success.html");}
    else {res.sendFile(__dirname+"/failure.html");}
  }
});
//console.log(firstName,lastName,emailId);
});
app.post("/failure",function(req,res){
res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000")
});
// d330002ef492db4da2b264e9055dcb39-us1
// 1ba589d82c.
