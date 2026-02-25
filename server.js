const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./Task");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentTasks")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.post("/tasks", async (req,res)=>{
 const task = await Task.create(req.body);
 res.json(task);
});

app.get("/tasks", async (req,res)=>{
 const tasks = await Task.find();
 res.json(tasks);
});

app.put("/tasks/:id", async (req,res)=>{
 const task = await Task.findByIdAndUpdate(req.params.id, req.body);
 res.json(task);
});

app.delete("/tasks/:id", async (req,res)=>{
 await Task.findByIdAndDelete(req.params.id);
 res.json({message:"Deleted"});
});

app.listen(3000,()=>{
 console.log("Server running on 3000");
});