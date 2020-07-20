//jshint esversion:6

  const express = require("express");
  const bodyParser = require("body-parser");
  const app = express();

  var iteams =["Buy Food","Play Game","Game"];
  var workiteams =[];
  app.use(express.static("public1"));
  app.use(bodyParser.urlencoded({extended: true}));

  app.set("view engine", "ejs");

  app.get("/", function(req, res){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listtile: day, newElements: iteams});
});


app.post("/",function(req, res){
  var iteam = req.body.newiteam;

  if (req.body.list === "work"){
    workiteams.push(iteam);
    res.redirect("/work");
  }else {
    iteams.push(iteam)
    res.redirect("/");
  }

});

app.get ("/work", function(req, res){
  res.render("list", {listtile: "work", newElements: workiteams})
});

app.post("/work", function(req, res){
  let iteam = req.body.newiteam;
  workiteams.push(iteam);
  res.redirect("/work")
})
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
