let City = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let feelsLike = document.querySelector(".feels");
const searchbox = document.querySelector(".search-bar");
const searchbtn = document.querySelector(".search-icon");
var main = document.querySelector(".main");
let inner = document.querySelector(".inner");
let disc = document.querySelector(".discription");

const apikey = "cdbb0fbaf58828215c36099b27877ca0";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

async function checkweather(city){
    const response = await fetch(apiurl+ city + `&appid=${apikey}`);
    var data = await response.json();
    if(data.cod === "404"){
        alert("City not found");
        return;
    }   
    
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apikey}`);
    const geoData = await geoResponse.json();
    console.log(geoData);
    let correctedCity = geoData[0].name;

    City.innerHTML=correctedCity;
    temp.innerHTML=Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " kmph";
    feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";
    disc.innerHTML = data.weather[0].main;
    
    if(data.weather[0].main === "Clear"){
        main.style.backgroundImage = "url('clearbg.jpg')"; 
        inner.style.backgroundImage = "url('clearbg.jpg')";
    }
    else if(data.weather[0].main === "Haze"){
        main.style.backgroundImage = "url('clearbg.jpg')"; 
        inner.style.backgroundImage = "url('clearbg.jpg')";
        }
    else if(data.weather[0].main === "Rain"){
        main.style.backgroundImage = "url('rain.jpg')"; 
        inner.style.backgroundImage = "url('rain.jpg')";
       }
    else if(data.weather[0].main === "Drizzle"){
        main.style.backgroundImage = "url('drizzle.jpg')";  
         inner.style.backgroundImage = "url('drizzle.jpg')";
     }
    else if(data.weather[0].main === "Misty"){
        main.style.backgroundImage = "url('misty.jpg')";  
        inner.style.backgroundImage = "url('misty.jpg')"; 
     }
    else if(data.weather[0].main === "Clouds"){
        main.style.backgroundImage = "url('Clouds.jpeg')";   
        inner.style.backgroundImage = "url('Clouds.jpeg')";
     }
    
}

searchbtn.addEventListener("click", ()=>{
    checkweather(searchbox.value);

})

