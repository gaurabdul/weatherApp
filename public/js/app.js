var weatherAPI = "/weather";


const weather_form = document.querySelector('form');
const search = document.querySelector('input');
const temperature = document.querySelector('.temperature');
const weatherCondition = document.querySelector('.weatherCondition');
const place = document.querySelector('.place');
const dateElement = document.querySelector('.date');




var today_date = new Date();
dateElement.textContent=today_date.getDate() + " | " +today_date.getMonth() + " | " +today_date.getFullYear();


weather_form.addEventListener('submit' , (event)=>{
    event.preventDefault();
    console.log(search.value);
    place.textContent="loading..";
    temperature.textContent="";
    weatherCondition.textContent="";
    const API_location = weatherAPI + "?address=" + search.value;
    fetch(API_location).then(response =>{
        response.json().then(data =>{
            //console.log(data);
            if(data.error){
                place.textContent=data.error;
                temperature.textContent="";
                weatherCondition.textContent="";
            }else{
                place.textContent =data.name;
                temperature.textContent =(data.temperature-273.15).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent =data.country;
            }
        })
    })
})