const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,res){


  const query=req.body.CityName;
 const apiKey="983178b74b2cb721d85587d9c448ce6c#";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;

 https.get(url, function(response){
   console.log(response.statusCode);
   response.on("data",function(data){
     const weatherData=JSON.parse(data);
 const temp=weatherData.main.temp
 const weatherDes=weatherData.weather[0].description
 const icon=weatherData.weather[0].icon;
 const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
 res.write("<p>The weather is currently "+weatherDes+"</p>");
 res.write("<h1>The temperature in "+query+" is: "+temp+" kelvin.</h1>");
 res.write("<img src="+imageURL+">")
 res.send();







   })
 })
})





















app.listen(3000,function(){
  console.log("server is running on port 3000");
});
