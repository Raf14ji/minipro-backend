import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

//config dotenv
dotenv.config();

// create express application
const app = express();

//use body parser
app.use(bodyParser.json());

//resource
const database = [
    {
        id: 1,
        name: "john",
        birtday: "2000-01-01",
        email: "john@gmail.com"
    }
]
//create route
app.get("/", (req, res)=>{
    res.status(200).send("<h1>welcome to my rest api</h1>")
})

// handle basic CRUD untuk database dgn route /api/users get database
app.get("/api/users", (req, res) => {
    res.status(200).json(database)
})

//update users
app.post("/api/users", (req, res)=>{
    const body = req.body
//create users
    database.push({...body, id: database.length + 1})
//respon client
    res.status(201).json(database)
})

// put users
app.put("/api/users/:id", (req, res)=>{
    const body = req.body
    const id = req.params.id
//update data
    database[id - 1] = {...body, id}
    res.status(200).json(database)
})

//delete users
app.delete("/api/users/:id", (req, res)=>{
    const id = req.params.id
//delete data
    database.splice(id - 1, 1)
    res.status(200).json(database)
})

//listen to port
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`server running on port ${PORT}.`));
