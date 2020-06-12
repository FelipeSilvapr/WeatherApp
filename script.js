var time = document.querySelectorAll(".line-dash small time")[0];

setInterval(() => {
  var date = new Date();
  time.innerHTML = date;
}, 1000)

// Change UI function 

  // Change Current Weather

function changeCurrentWeather(data){  
  var condition = data.weather[0].main;  
  var cloudy = document.querySelector('.cloudy');  
  var humidity = document.querySelector('.humidity');
  var wind = document.querySelector('.wind');
  var degrees = document.querySelector('.degrees-container #degrees'); 
  var cityName = document.querySelector('.city .city-name');
  var cityNameCountry = document.querySelector('.button-container .city-name');
  
  cityName.innerHTML = `${data.name}`;
  cityNameCountry.innerHTML = `${data.name}, ${data.sys.country}`
  cloudy.innerHTML = `${data.clouds.all}%`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${data.wind.speed} m/s`;
  degrees.innerHTML = `${Math.round(data.main.temp)}°`;
  
  changeBackgroundVideo(condition);
  changeInfoText(condition);
  if(data.hasOwnProperty('rain'))  isThereRain(data.rain['1h']);
  
}

function changeBackgroundVideo(condition){  
  
}

function changeInfoText(condition){
  var phrase1 = document.querySelector('.info-text-container strong');
  var phrase2 = document.querySelector('.info-text-container p');

  const phrasesToText1 = [
    `It's a rainy day`,`esta nublado cair ` ];
  const phrasesToText2 = [
    `Don't forget an umbrella`, `nao vai ver o sun`
  ];

  switch(condition){
    case 'Rain':
      phrase1.innerHTML = phrasesToText1[0];
      phrase2.innerHTML = phrasesToText2[0];
      break;
    case 'Clouds':
      phrase1.innerHTML = phrasesToText1[1];
      phrase2.innerHTML = phrasesToText2[1];
      break;
    default:
      //console.log('nenhma categoria anterior')

  }
}

function isThereRain(data){
  var weatherDetails = document.querySelector('.weather-details ul');
  var li = document.createElement('li');
  var p = document.createElement('p');
  var span = document.createElement('span');

  p.innerHTML = 'Precipitation';
  span.innerHTML = `${data}mm`;

  li.append(p);
  li.append(span);
  weatherDetails.append(li);  
}


  // Change Forecast

function changeForecast(data){

}









var city = "new york";
const API_KEY = "56198c8989cabb3f4e52f69e1f57ab81"

var dataCurrentWeather;
var dataForecast;

fetchDataCurrentWeather();

function fetchDataCurrentWeather() {
  const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&lang=pt_br&units=metric`;

  fetch(urlCurrentWeather).then((response) => {
    return response.json();
  }).then((data) => {    
    changeCurrentWeather(data);
    console.log(data);           
    fetchDataOneCall(data);
  }).catch(err => {
    console.log('Fetch problem: ' + err.message);
  });
}



function fetchDataOneCall(data) {  
  var latitude = data.coord.lat;
  var longitudde = data.coord.lon;

  const urlOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}2&lon=${longitudde}&exclude={minutely}&appid=${API_KEY}&units=metric`;

  fetch(urlOneCall).then((response) => {
    return response.json();
  }).then((data) => {    
    console.log(data)
  }).catch(err => {
    console.log('Fetch problem: ' + err.message);
  });
}































//fetchDataForecast();


// function fetchDataForecast() {
//   const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&lang=pt_br&units=metric`;

//   fetch(urlForecast).then((response) => {
//     return response.json();
//   }).then((data) => {    
//     console.log(data)
//   }).catch(err => {
//     console.log('Fetch problem: ' + err.message);
//   });
// }