//const { request } = require('express');
const request = require('request');
const constants = require('../config');



const weatherData = (address , callback) =>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + process.env.SECRET_KEY;
    //console.log(url);
    // callback(true);
    request({url , json:true} , (error , {body}) =>{
        //console.log(body);
        if(error){
            callback("can't fetch data from open weather map api" , undefined);
        }else{
            callback(undefined , {
                temperature : body.main.temp,
                name : body.name,
                country : body.sys.country
            })
        }
    })
}

module.exports = weatherData;