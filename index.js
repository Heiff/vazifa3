const http = require('http');
const express = require('express')
const { Server } = require('socket.io')
const cookie = require('cookie-parser')
const routers = require('./routes/admin.Route')

const app = express()

const server = http.createServer(app)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie())
app.set("view engine", "ejs");
app.set("views", "public/views");
app.use(routers)
app.use(express.static(process.cwd() + "/public/views"));

const global = new Server(server,{
    cors:{
        origin:"*"
    }
})

global.on('connection',(private)=>{
private.on('message',(data)=>{
    global.emit('admin',data)
})
})





server.listen(4000,()=>{
    console.log(4000);
})