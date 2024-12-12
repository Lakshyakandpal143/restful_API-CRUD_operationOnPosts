const express=require("express");
const app=express();
const path=require("path");
const {v4:uuidv4}=require('uuid');
const port=8080;
const methodOverride=require("method-override");
//parse post request
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//setting view engine to ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));//connecting present directory with ejs dir

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"lakshya",
        content:"hello everyone",
    },
    {
        id:uuidv4(),
        username:"eve",
        content:"hello everyone",
    },
    {
        id:uuidv4(),
        username:"alice",
        content:"hello everyone",
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    console.log(req.body);
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect('/posts');
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((posts)=>id===posts.id);
    // console.log(post);
    res.render("show.ejs",{post});

});
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;  
    // console.log(id);
    let newcont=req.body.content;
    let post=posts.find((posts)=>id===posts.id);
    post.content=newcont;
    // console.log(post);     
    res.redirect('/posts');
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;  
    let post=posts.find((posts)=>id===posts.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;  
    posts=posts.filter((posts)=>id!==posts.id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("app is listening");
});
