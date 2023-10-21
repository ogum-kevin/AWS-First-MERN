require('dotenv').config()
const express= require('express');
const conn= require('./db')
const UserRoute= require('./Routes/user')
const cookieParser = require('cookie-parser')
const authenticateUser =require('./Utils/authenticate')


const {
    notFound,
    errorHandling
} = require('./Utils/errorHandler')



const app= express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use('/api', UserRoute)

app.get('/',async(req,res) =>{
    res.render('index')
})
app.get('/signup',async(req,res) =>{
    res.render('signup')
})
app.get('/login', async (req, res) => {
    res.render('login')
})
app.get('/success',authenticateUser,async(req,res) =>{
    res.render('successful')
})

app.use(notFound)
app.use(errorHandling)


app.listen(3000,()=>{
    console.log('I am listening')
})