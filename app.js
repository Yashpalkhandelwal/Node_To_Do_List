//requring the required modules for app
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

//creating an instant of the express module
const app = express();

//Declaring the items and workItems array
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

//using "use" method for body-parser and express modules
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Using the "set" method on app to set the view engine to ejs
app.set('view engine', 'ejs');

//GET method for home route("/")
app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newItemList: items
  });
});

// GET method for root route("/del")
app.post("/del", function(req, res) {
const checkedIteam = req.body.checkbox;
items.pop(checkedIteam);
res.redirect("/");


});
// GET method for work route("/work")
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItemList: workItems
  });
});

// GET method for about route("/about")
app.get("/about", function(req, res) {
  res.render("about");
});


// POST method for home route("/")
app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }

});

// POST method for wrok route("/work")
app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
});


// Spinning of server at localhost on port=3000
app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000");
});
