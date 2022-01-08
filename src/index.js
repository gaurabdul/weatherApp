const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();

const weatherData = require('../utils/weatherData');

const app = express();
const port = process.env.PORT || 8000;


const staticFiles = path.join(__dirname , "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname , "../templates/partials");

app.set('view engine' , 'hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticFiles));




app.get('/' , (req , res) =>{
    res.render("index" , {
        title : 'Weather App'
    });
})
app.get('/weather' , (req , res) =>{
    const address = req.query.address
    if(!address){
        return res.send({
            error : "you should enter address in search bar"
        })
    }
    weatherData(address , (err , {temperature , name , country})=>{
        if(err){
            return res.send({
                err
            })
        }
        console.log(temperature , name , country);
        res.send({
            temperature , name , country
        })
    })
})





app.get("*" , (req , res) =>{
    res.render('404' , {
        title : "page not found"
    });
})
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
});