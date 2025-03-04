// clock ************************************************
var time = document.querySelector(".line-dash small time");

function formatClock() {
  let date = new Date();
  let day = dayOfTheWeek(date.getDay());
  let month = monthOfTheYear(date.getMonth());
  let year = date.getFullYear();
  let dayDate = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} - ${day}, ${dayDate} ${month} ${year}`
}

setInterval(() => {
  time.innerHTML = formatClock();
  time.setAttribute('datetime', new Date);
}, 1000)

// Change Current Weather ************************************************

function changeCurrentWeather(data) {
  var condition = data.weather[0].main;
  const cloudy = document.querySelector('.cloudy');
  const humidity = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');
  const degrees = document.querySelector('.degrees-container #degrees');
  const cityName = document.querySelector('.city .city-name');
  const cityNameCountry = document.querySelector('.button-container .city-name');

  cityName.innerHTML = `${data.name}`;
  cityNameCountry.innerHTML = `${data.name}, ${data.sys.country}`
  cloudy.innerHTML = `${data.clouds.all}%`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${data.wind.speed} m/s`;
  degrees.innerHTML = `${Math.round(data.main.temp)}°`;

  changeBackgroundVideo(condition);
  changeInfoText(condition);
  notRain();
  if (data.hasOwnProperty('rain')) {
    isThereRain(data.rain['1h']);
  }
}

function isThereRain(data) {
  let weatherDetails = document.querySelector('.weather-details ul');
  let li = document.createElement('li');
  let p = document.createElement('p');
  let span = document.createElement('span');

  li.classList.add('precipitation');
  p.innerHTML = 'Precipitation';
  span.innerHTML = `${data}mm`;

  li.append(p);
  li.append(span);
  weatherDetails.append(li);
}

function notRain() {
  let weatherDetailsWithRain = document.querySelector('.weather-details ul li.precipitation');
  if (weatherDetailsWithRain !== null) {
    weatherDetailsWithRain.remove();
  }
}

// change background video  ************************************************************************************

function changeBackgroundVideo(condition) {
  let backgorundVideo = document.querySelector('.background-container video');
  let source = document.querySelector('.background-container video source');

  const videos = ['assets/videos/clearsky.mp4','assets/videos/clouds.mp4', 'assets/videos/rain.mp4','assets/videos/thunderstorm.mp4','assets/videos/snow.mp4','assets/videos/drizzle.mp4'];

  switch (condition) {
    case 'Clear':
      source.setAttribute('src', videos[0]);
      backgorundVideo.load();
      break;
    case 'Clouds':
      source.setAttribute('src', videos[1]);
      backgorundVideo.load();
      break;
    case 'Rain':
      source.setAttribute('src', videos[2]);
      backgorundVideo.load();
      break;
    case 'Thunderstorm':
      source.setAttribute('src', videos[3]);
      backgorundVideo.load();
      break;
    case 'Snow':
      source.setAttribute('src', videos[4]);
      backgorundVideo.load();
      break;
    case 'Drizzle':
      source.setAttribute('src', videos[5]);
      backgorundVideo.load();
      break;
    default:
      break;
  }
}

// change phrases *********************************************************************************************

function changeInfoText(condition) {
  const phrase1 = document.querySelector('.info-text-container strong');
  const phrase2 = document.querySelector('.info-text-container p');

  const phrasesToText1 = [
    `It is sunny today.`, `The sky is mostly cloudy`, `It's a rainy day`, `It’s really coming down out there.`, `It’s Freezing Out There`,`It’s Just Drizzling`
  ];
  const phrasesToText2 = [
    `There’s Not A Cloud In The Sky`, `I Think The Sun Is Trying To Come Out.`, `Don't forget an umbrella`, `I’m Soaking Wet`, `Make Sure To Bundle Up!`,''
  ];

  switch (condition) {
    case 'Clear':
      phrase1.innerHTML = phrasesToText1[0];
      phrase2.innerHTML = phrasesToText2[0];
      break;
    case 'Clouds':
      phrase1.innerHTML = phrasesToText1[1];
      phrase2.innerHTML = phrasesToText2[1];
      break;
    case 'Rain':
      phrase1.innerHTML = phrasesToText1[2];
      phrase2.innerHTML = phrasesToText2[2];
      break;
    case 'Thunderstorm':
      phrase1.innerHTML = phrasesToText1[3];
      phrase2.innerHTML = phrasesToText2[3];
      break;
    case 'Snow':
      phrase1.innerHTML = phrasesToText1[4];
      phrase2.innerHTML = phrasesToText2[4];
      break;
    case 'Drizzle':
      phrase1.innerHTML = phrasesToText1[5];
      phrase2.innerHTML = phrasesToText2[5];
      break;
    default:
      break;
  }
}

// Change Forecast **********************************************************************

function changeForecast(data) {
  let dateUnix;
  let day;
  const daysOfweek = document.querySelectorAll('.next-days li p time');
  const tempOfTheDays = document.querySelectorAll('.next-days span');

  for (let i = 0; i < 7; i++) {
    dateUnix = new Date(data.daily[i + 1].dt * 1000);
    day = dayOfTheWeek(dateUnix.getDay());
    daysOfweek[i].innerHTML = day;
    daysOfweek[i].setAttribute('datetime', dateUnix);
    tempOfTheDays[i].innerHTML = `${Math.round(data.daily[i].temp.day)}°`;
  }
}

// dates ************************************************************************************************

function dayOfTheWeek(number) {
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}

function monthOfTheYear(number) {
  switch (number) {
    case 0:
      return 'Jan';
    case 1:
      return 'Fev';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec'
  }
}

//button action **************************************************************************

var buttonMain = document.querySelector('main button.change');
var buttonAside = document.querySelector('aside button.change');
var recoverCityName;

addOrRemoveEventeListener(handleChangeCity, 'add');

function handleChangeCity() {
  let cityName = document.querySelector('aside .city p');
  let inputCityName = document.createElement('input');
  inputCityName.placeholder = 'city name';
  inputCityName.type = 'text';
  cityName.replaceWith(inputCityName);
  inputCityName.focus();
  addOrRemoveEventeListener(handleChangeCity, 'remove');
  addOrRemoveEventeListener(submitCity, 'add');

  inputCityName.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      submitCity();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      event.preventDefault();
      inputCityName.replaceWith(cityName);
      addOrRemoveEventeListener(submitCity, 'remove');
      addOrRemoveEventeListener(handleChangeCity, 'add');
    }
  });

  function submitCity() {    
    cityFetch = inputCityName.value;
    recoverCityName = cityName.innerHTML;
    cityName.innerHTML = '';
    inputCityName.replaceWith(cityName);
    fetchDataCurrentWeather();
    addOrRemoveEventeListener(submitCity, 'remove');
    addOrRemoveEventeListener(handleChangeCity, 'add');
  }
}

function addOrRemoveEventeListener(callback, operation) {
  if (operation === 'remove') {
    buttonAside.removeEventListener('click', callback);
    buttonMain.removeEventListener('click', callback);
  } else if (operation === 'add') {
    buttonMain.addEventListener('click', callback);
    buttonAside.addEventListener('click', callback);
  }
}

function invalidCityName() {
  let invalidCityName = document.querySelector('aside .city p');
  //invalidCityName.innerHTML = 'Invalid city name';
  invalidCityName.innerHTML = recoverCityName;
}

// Fectch data ********************************************************************

var cityFetch = "São Paulo";
const API_KEY = "56198c8989cabb3f4e52f69e1f57ab81";

fetchDataCurrentWeather();

function fetchDataCurrentWeather() {
  const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityFetch}&APPID=${API_KEY}&units=metric`;

  fetch(urlCurrentWeather).then((response) => {
    return response.json();
  }).then((data) => {
    changeCurrentWeather(data);
    console.log(data);
    fetchDataOneCall(data);
  }).catch(err => {
    invalidCityName();
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
    console.log(data);
    changeForecast(data);
  }).catch(err => {
    console.log('Fetch problem: ' + err.message);
  });
}