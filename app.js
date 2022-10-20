const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const date = require(__dirname + "/date.js")
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://DEMENTORX:nitnem121@cluster0.ewwuvo9.mongodb.net/todolistDB", {useNewUrlParser: true});

const itemsSchema={
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1=new Item({
name: "Welcome to your To-Do List"
});

const item2=new Item({
    name: "Hit + button to add a new item"
    });

const item3=new Item({
        name: "<-- Hit this to delete an item"
});

const defaultItems =[];




app.get("/", function (request, result) {
   
     let day=date();
    Item.find({}, function(err, foundItems){
    
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Sucessfull");
                }
                });

                
        
                result.render("list", { Xday : day, newlistitems :  foundItems});
        
            });
   
    
});

app.post("/", function(request, result){
    var Newitem=request.body.newitem;
const item=new Item({
    name: Newitem
});
   item.save();
   result.redirect("/");
});

app.get("/about", function(request, result){
result.render("about");
});

app.post("/delete",  function(request, result){
const checkedItemId= request.body.checkbox;

Item.findByIdAndDelete(checkedItemId, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Sucessful");
    }
    
})
result.redirect("/")
});

let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }

app.listen(port || 3000, function () {
    console.log("Server started sucessfully");
});

