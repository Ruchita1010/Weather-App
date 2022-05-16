
//On Window load
window.addEventListener("load", getCurrLocation);

//On clicking search cityBtn
const cityName = document.getElementById("cityBtn");
cityName.addEventListener("click", getCityWeather);

//Getting the apiKey
const apiKey = config.WEATHER_API_KEY;

function getCurrLocation() {

    //Getting the current location's longitude and latitude
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            //Based on Longitude & Latitude
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            fetch(url).then(res => {
                return res.json();
            }).then(data => {
                showCurrLocationWeather(data);
                getIcon(data.weather);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    else {
        // If the user don't allow
        apology("You didn't allow to access your location!!!");
    }
}


function getIcon(weather) {

    const getImg = document.getElementById("icon");
    getImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Icon" class="iconImg">`;
}


function showCurrLocationWeather(data) {

    //For displaying the day and date
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    document.getElementById("date").innerText = `${months[dateObj.getMonth()]} ${dateObj.getDate()}`;

    //Destructuring
    const { main, weather, wind, clouds } = data;

    //For setting the background as per the weather
    changeBackground(weather);

    // For temperature
    temperature = document.getElementById("temp");
    //Changing the temp in Kelvin to Celsius
    temperature.innerHTML = `<p>${Math.floor(main.temp - 273.15)}&#8451;</p>`;

    // For description 
    description = document.getElementById("description");
    description.innerHTML = `<p>${weather[0].description.toUpperCase()}</p>`;

    // For humidity 
    humidity = document.getElementById("humidity");
    humidity.innerHTML = `<p>${main.humidity} &#37;</p>`;

    // For cloudiness 
    cloudiness = document.getElementById("cloudiness");
    cloudiness.innerHTML = `<p>${clouds.all} &#37;</p>`;

    // For windSpeed 
    windSpeed = document.getElementById("wind-speed");
    windSpeed.innerHTML = `<p>${wind.speed} m/s</p>`;
}

function changeBackground(weather) {

    if (weather[0].main === "Clouds" || weather[0].main === "Clear") {
        document.body.style.backgroundImage = 'url("./images/clearSky.jpg")';
    }
    else if (weather[0].main === "Rain") {
        document.body.style.backgroundImage = 'url("./images/rain.jpg")';

    }
    else if (weather[0].main === "Drizzle") {
        document.body.style.backgroundImage = 'url("./images/drizzle.jpg")';

    }
    else if (weather[0].main === "Snow") {
        document.body.style.backgroundImage = 'url("./images/snow.jpg")';
    }
    else if (weather[0].main === "Thunderstorm") {
        document.body.style.backgroundImage = 'url("storm.png")';
    }

    //else By default it will show windTurbines img;
}


function getCityWeather() {

    const cityName = document.getElementById("cityName");
    if (cityName.value !== "") {

        //Based on City Name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`;

        fetch(url).then(response => {
            return response.json();

        }).then(data => {
            console.log(data);
            if (data.cod !== "404") {
                showCurrLocationWeather(data);
                getIcon(data.weather);
            }
            else {
                apology("SORRY, We're unable to provide the weather info of the City!!!");
            }
        });
    }
    else {
        apology("You Must Enter a City Name!!!");
    }
    //Clearing the textbox
    cityName.value = "";
}


function apology(msg) {

    const mainInfoDiv = document.getElementById("main-info");

    //Creating a Div of class apologyDiv
    const apologyDiv = document.createElement("div");
    apologyDiv.classList.add("apologyDiv");
    apologyDiv.innerHTML = `<p>${msg}</p>`;

    //Appending to main-info Div
    mainInfoDiv.appendChild(apologyDiv);

    setTimeout(() => {
        apologyDiv.classList.remove("apologyDiv");
        apologyDiv.innerHTML = ``;
    }, 3000);

    //No data to be shown
    temperature = document.getElementById("temp");
    temperature.innerText = "";

    descript = document.getElementById("description");
    descript.innerText = "";

    humid = document.getElementById("humidity");
    humid.innerText = "-";

    cloudiness = document.getElementById("cloudiness");
    cloudiness.innerText = "-";

    windSpeed = document.getElementById("wind-speed");
    windSpeed.innerText = "-";

    //Displaying the curr location weather
    setTimeout(() => {
        getCurrLocation();
    }, 5000);
}

