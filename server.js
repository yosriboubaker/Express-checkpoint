const express = require('express')
const app = express();
app.set('view engine', 'ejs')

 // middleware for time app 

const authtimeMiddleware =(req, res, next)=>{

 var date = new Date();
var current_hour = date.getHours();
var current_day = date.getDay();

    if(  current_hour  > 9 && current_hour  < 17 && current_day >= 1 && current_day <= 5){
        next();
    } else {
        res.send('<h1 style="color:red;text-align:center">The web application is only available <br> :Monday to Friday,  from 9 to 17:</h1>');
    }
};
app.use(authtimeMiddleware)

// ----------------------------

// home route
app.get('/',(req, res)=>{
    res.render( 'home');
});
// contact route
app.route('/contact')
.get((req, res)=>{
    res.render('contact');
});
// ou services route
app.route('/our-services')
.get((req, res)=>{
    res.render ('ourServices');
});


app.use(express.static(__dirname + '/static'))

//404 
app.use((req, res) => {
    res.status(404).send('<h1 style="color:red">sorry cant\' find that </h1>');
}) 

const PORT = 5555
app.listen(PORT , (err)=>{err?console.log(err):console.log(`server is runnng in port ${PORT}`)});