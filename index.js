const express = require("express");
const path = require("path"); // Missing import for 'path'

const app = express();
const port = 8080;

const {v4:uuidv4}=require('uuid');
// uuidv4(); // => 'creates random id like 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const methodOverride= require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4(),
        username: "shane bond",
        content:"I love bowling",
    },
     {
        id:uuidv4(),
        username: "virat kohli",
        content:"And he enters,man of big stage and big ocassion.Bigger the game,the more he wants to contribute.He likes to fight and he likes to scrap as well.Look at that! that bloke is briallant,THIS IS WHAT HE DOES WHEN HE COMES TO LIVE.come on virat you gone take india into semis.",
    },
     {
        id:uuidv4(),
        username: "abdevillers",
        content:"Talent is overused word.what does it mean to have talent.Is it the ability to hit ball further than someone else.I will tell u what talent is .It is to be a scratch golfer and to be best at rugby,hockey,tennis and swimming.It is to be the man described as the greatest batsman that cricket has ever seen.If you are all those things you are TALENTED you areAB DEVILLERS.",
    },
];
app.get("/posts", (req, res) => {
   res.render("index.ejs",{posts});
});

app.get("/posts/new", (req,res) =>{
   res.render("new.ejs");
});


app.post("/posts",(req,res) =>{
    // console.log(req.body);
    let {username,content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) =>{
    let {id}=req.params;
    let post =posts.find((p) => id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res) =>{
    let {id}=req.params;
    let newcontent =req.body.content;
    let post=posts.find((p) => id===p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
     let {id}=req.params;
     let post =posts.find((p) => id==p.id);
     res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req,res) => {
  let {id}=req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});


app.listen(port, () => {
   console.log(`Listening on port: ${port}`);
});
