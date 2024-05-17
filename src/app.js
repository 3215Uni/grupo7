// ************ Require's ************
const createError = require('http-errors');
const session=require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const userLoggedMiddelware=require('./middlewares/userLoggedMiddleware.js');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));


// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(bodyParser.json());

// Middleware para analizar solicitudes con cuerpos codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    secret: "Shh, I's a secret",
    resave: false,
    saveUninitialized: false,

}))
app.use(userLoggedMiddelware)
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas




const homeRoute = require('./routers/home.routes.js')
app.use('/', homeRoute);


const userRouter = require('./routers/user.routes.js')
app.use('/users', userRouter);



const productRouter=require('./routers/products.routes.js');
app.use('/product', productRouter);





// app.use((req, res, next) => next(createError(404)));

// // ************ error handler ************
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.path = req.path;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.listen( 3000, () => console.log(`Server up on PORT:  http://localhost:3000`));