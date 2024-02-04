const express = require('express');
const app = express();
const path = require('path');


app.use(express.static('public'))
// Routes

///////////////// EJS TEMPLATE /////////////////

// Indicamos el motor de plantilla
app.set('view engine',  'ejs');
//Direccionamos a las vistas
app.set('views', path.join(__dirname, 'views'));






const homeRoute = require('./routers/homeRoutes.js')
app.use('/', homeRoute);

const userRouter = require('./routers/userRoutes.js')
app.use('/login', userRouter);



app.get('/productCart', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productCart.html')
    res.sendFile(pathHome);
})
app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/products/productDetail.html')
    res.sendFile(pathHome);
})
app.get('/register', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/register.html')
    res.sendFile(pathHome);
})




app.listen( 3000, () => console.log(`Server up on PORT:  http://localhost:3000`) )
