import express from "express";
import bodyParser from "body-parser";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');

var count = 0;

const prompt = require('prompt-sync')();

const app = express();
const port = 3000;

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs");
    
});

app.listen(port, ()=>{
    console.log("Listening to port: " + port);
});

app.get("/index.ejs", (req,res)=>{
    res.render("./index.ejs");
});

app.get("/partials/Alien_Truth.ejs", (req,res)=>{
    res.render("./partials/Alien_Truth.ejs");
});
app.get("/partials/Beyond_Smart.ejs", (req,res)=>{
    res.render("./partials/Beyond_Smart.ejs");
});
app.get("/partials/Founder_Mode.ejs", (req,res)=>{
    res.render("./partials/Founder_Mode.ejs");
});
app.get("/partials/How_To_Get_New_Ideas.ejs", (req,res)=>{
    res.render("./partials/How_To_Get_New_Ideas.ejs");
});
app.get("/partials/Putting_Ideas_Into_Words.ejs", (req,res)=>{
    res.render("./partials/Putting_Ideas_Into_Words.ejs");
});
app.get("/partials/The_Need_To_Read.ejs", (req,res)=>{
    res.render("./partials/The_Need_To_Read.ejs");
});
app.get("/partials/The_Reddits.ejs", (req,res)=>{
    res.render("./partials/The_Reddits.ejs");
});

app.get("/createblogs.ejs", (req,res)=>{
    res.render("./createblogs.ejs");
});

var set1 = "";
var set2 = "";
var set3 = "";
var set4 = "";
var title = [];
var content = [];
var notes = [];
var regards = [];

app.post("/submit", (req,res)=>{
    if(req.body.title=="" || req.body.content=="" || req.body.notes=="" || req.body.regards==""){
        res.render("./partials/Error1.ejs");
    }
    else{
        if(count > 2){
            res.render("./partials/Max.ejs");
        }
        else{
            res.render("./partials/submit" + count + ".ejs",{
                set1 : req.body.title,
                set2 : req.body.content,
                set3 : req.body.notes,
                set4 : req.body.regards
            });
            title.push(req.body.title);
            content.push(req.body.content);
            notes.push(req.body.notes);
            regards.push(req.body.regards);
            console.log(count);
            count++;
        }
    }
});

app.get("/viewblogs.ejs", (req,res)=>{
    res.render("./viewblogs.ejs" , {
        total : count,
        title : title
    });
});

app.get("/partials/submit0.ejs", (req,res)=>{
    res.render("./partials/submit0.ejs", {
        set1 : title[0],
        set2 : content[0],
        set3 : notes[0],
        set4 : regards[0]
    });
});

app.get("/partials/submit1.ejs", (req,res)=>{
    res.render("./partials/submit1.ejs", {
        set1 : title[1],
        set2 : content[1],
        set3 : notes[1],
        set4 : regards[1]
    });
});

app.get("/partials/submit2.ejs", (req,res)=>{
    res.render("./partials/submit2.ejs", {
        set1 : title[2],
        set2 : content[2],
        set3 : notes[2],
        set4 : regards[2]
    });
});

app.get("/editblogs.ejs", (req,res)=>{
    res.render("./editblogs.ejs", {
        title : title
    });
});

app.get("/partials/edit0.ejs", (req,res)=>{
    res.render("./partials/edit0.ejs", {
        title : title,
        content : content,
        notes : notes,
        regards : regards
    });
});

app.get("/partials/edit1.ejs", (req,res)=>{
    res.render("./partials/edit1.ejs", {
        title : title,
        content : content,
        notes : notes,
        regards : regards
    });
});

app.get("/partials/edit2.ejs", (req,res)=>{
    res.render("./partials/edit2.ejs", {
        title : title,
        content : content,
        notes : notes,
        regards : regards
    });
});

app.post("/edit0", (req,res)=>{
    if(req.body.title=="" || req.body.content=="" || req.body.notes=="" || req.body.regards==""){
        res.render("./partials/Error1.ejs");
    }
    else{
        res.render("./partials/submit0.ejs",{
            set1 : req.body.title,
            set2 : req.body.content,
            set3 : req.body.notes,
            set4 : req.body.regards
        });
        title[0] = req.body.title;
        content[0] = req.body.content;
        notes[0] = req.body.notes;
        regards[0] = req.body.regards;
    }
});

app.post("/edit1", (req,res)=>{
    if(req.body.title=="" || req.body.content=="" || req.body.notes=="" || req.body.regards==""){
        res.render("./partials/Error1.ejs");
    }
    else{
        res.render("./partials/submit1.ejs",{
            set1 : req.body.title,
            set2 : req.body.content,
            set3 : req.body.notes,
            set4 : req.body.regards
        });
        title[1] = req.body.title;
        content[1] = req.body.content;
        notes[1] = req.body.notes;
        regards[1] = req.body.regards;
    }
});

app.post("/edit2", (req,res)=>{
    if(req.body.title=="" || req.body.content=="" || req.body.notes=="" || req.body.regards==""){
        res.render("./partials/Error1.ejs");
    }
    else{
        res.render("./partials/submit2.ejs",{
            set1 : req.body.title,
            set2 : req.body.content,
            set3 : req.body.notes,
            set4 : req.body.regards
        });
        title[2] = req.body.title;
        content[2] = req.body.content;
        notes[2] = req.body.notes;
        regards[2] = req.body.regards;
    }
});

app.get("/deleteblogs.ejs", (req,res)=>{
    res.render("./deleteblogs.ejs", {
        title : title
    });
});

app.get("/partials/delete0.ejs", (req,res)=>{
    count--;
    title.splice(0,1);
    content.splice(0,1);
    notes.splice(0,1);
    regards.splice(0,1);
    res.render("./partials/deleted.ejs");
});

app.get("/partials/delete1.ejs", (req,res)=>{
    count--;
    title.splice(1,1);
    content.splice(1,1);
    notes.splice(1,1);
    regards.splice(1,1);
    res.render("./partials/deleted.ejs");
});

app.get("/partials/delete2.ejs", (req,res)=>{
    count--;
    title.splice(2,1);
    content.splice(2,1);
    notes.splice(2,1);
    regards.splice(2,1);
    res.render("./partials/deleted.ejs");
});