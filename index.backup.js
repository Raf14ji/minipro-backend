//import module
// const http = require("http")
import http from "http";

//database
const database = [
    {
        id: 1,
        name: "john",
        birtday: "2000-01-01",
        email: "john@gmail.com"
    }
]

//request url
// GET -> http://localhost:2000/ -> welcome to my rest api
// GET -> http://localhost:2000/api/users -> database
// POST -> http://localhost:2000/api/users -> create users on database
// PUT/PATCH -> http://localhost:2000/api/users/1 -> update users on database 1 itu parameter id
// DELETE -> http://localhost:2000/api/users/1 -> delete users on database

//@http method
//GET : READ
//POST : CREATE
//PUT/PATCH : UPDATE
//DELETE : DELETE

//create server
const server = http.createServer((req,res)=>{
    // console.log("request recieved", req.url, req.method, req.headers    )
// GET USER
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end("<h1>welcome to my rest api</h1>")
    }
    if (req.url === "/api/users" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(database))
    }
// CREATE USER
    if (req.url === "/api/users" && req.method === "POST") {
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        }) 
        req.on ("end", ()=>{
            const { name, birtday, email } = JSON.parse(body)
            database.push({
                id: database.length + 1,
                name,
                birtday,
                email
            })
            // create respon client
            res.writeHead(201, { "Content-Type": "application/json"})
            res.end(JSON.stringify(database))
            //201 artinya created
        })
    }
    //update users
    if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PUT"){
        const id = req.url.split("/")[3]
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on("end", ()=>{
            const { name, birtday, email } = JSON.parse(body)
            database[id - 1] = {
                id: Number(id),
                name,
                birtday,
                email
            }
            //update client
            res.writeHead(200 , { "Content-Type": "application/json"})
            res.end(JSON.stringify(database))
        })
    }
    //delete users
    if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE"){
        const id = req.url.split("/")[3]
        database.splice(id - 1, 1)
        //delete client
        res.writeHead(200 , { "Content-Type": "application/json"})
        res.end(JSON.stringify(database))
    }
})


//listen
const PORT = 2000
server.listen(PORT, ()=> console.log(`server running on port ${PORT}.`))