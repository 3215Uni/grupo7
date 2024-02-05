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
app.use('/users', userRouter);



const productRouter=require('./routers/productsRoutes.js');
app.use('/product', productRouter);









app.listen( 3000, () => console.log(`Server up on PORT:  http://localhost:3000`) )
