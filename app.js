const express = require('express');
const app = express();
const path = require('node:path');


app.use(express.static('public'))
// Routes
app.get('/', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/index.html')
    res.sendFile(pathHome);
})
app.get('/login', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/login.html')
    res.sendFile(pathHome);
})
app.get('/productCart', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productCart.html')
    res.sendFile(pathHome);
})
app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productDetail.html')
    res.sendFile(pathHome);
})
app.get('/register', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/register.html')
    res.sendFile(pathHome);
})




app.listen( 3000, () => console.log(`Server up on PORT:  http://localhost:3000`) )
