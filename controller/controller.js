const Io = require('../Io');
const Data = new Io('database/users.json')
const jwt = require('jsonwebtoken')


const Login = async(req,res) => {
    const {user,pass} = req.body
    console.log(user);
const data = await Data.read()
const token = jwt.sign(pass,'@secret')
for (let i = 0; i < data.length; i++) {
   if (data[i].user == user && data[i].pass == pass) {
    res.cookie('token',token)
    res.redirect('/admin')
   } 
}
}


const Auth = async(req,res,next) =>{
    let yes = true
    if (req.cookies.token) {
        const token = req.cookies.token
        const pass = jwt.verify(token,'@secret')
        const data = await Data.read()
        for (let i = 0;i < data.length; i++) {
           if (data[i].pass == pass) {
            yes = false
            next()
           }  
        }
    }
    if (yes) {
      res.redirect('/login')  
    }
}


const Admin = async(req,res) => {
    res.render('Admin')
}

const LoginEjs = async(req,res) => {
    res.render('Login')
}

const Index = async(req,res) => {
    res.render('index')
}

module.exports = {
    Login,
    Admin,
    LoginEjs,
    Index,
    Auth
}