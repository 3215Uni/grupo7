const path = require('node:path');
const fs=require('fs');
const userFilePath=path.join(__dirname,'../data/users.json');
const users=JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));


function userLoggedMiddelware(req, res, next){
    
    res.locals.isLogged=false;
    const emailInCookie=req.cookies.userEmail;
    let userCokie= users.find((user)=>user.email==emailInCookie); 
    if(userCokie){
        res.locals.userLogged=userCokie;
    }
    if(req.session.userLogged ){
        res.locals.isLogged=true;
        res.locals.userLogged=req.session.userLogged;
    }
   
    
    
    next();
}


module.exports=userLoggedMiddelware;