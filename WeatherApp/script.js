const apiKey = "618f201202cbbc0bb47923f35da622d6";

async function getWeather (city) {
  
document.getElementById("errorMessage").innerHTML =
    "⏳ Loading weather...";
  
  
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found. Please check the spelling and try again.");
}
      
        const data = await response.json();
        
        const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastResponse = await fetch(forecastUrl);
const forecastData = await forecastResponse.json();

      document.getElementById("errorMessage").innerHTML = "";

if (!forecastResponse.ok) {
    throw new Error("Forecast request failed: " + forecastResponse.status);
}

let forecastList = document.getElementById("forecastList");
forecastList.innerHTML = "";

for (let i = 0; i < forecastData.list.length; i += 8) {
    const forecast = forecastData.list[i];

    const date = new Date(forecast.dt * 1000);

const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
});
  
    const forecastItem = document.createElement("div");
    
const forecastIconCode = forecast.weather[0].icon;
    
    forecastItem.innerHTML = `
        <h3>${formattedDate}</h3>
        <p>🌡️ ${forecast.main.temp}°C</p>
<img src="https://openweathermap.org/img/wn/${forecastIconCode}@2x.png">

<p>${forecast.weather[0].description}</p>
`;
    forecastList.appendChild(forecastItem);
}

const iconCode = data.weather[0].icon;

document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

document.getElementById("weatherIcon").style.display = "block";

        document.getElementById("city").innerHTML = data.name;

        document.getElementById("temperature").innerHTML =
            "🌡️ Temperature: " + data.main.temp + "°C";
            
            let temperature = data.main.temp;

if (temperature < 20) {
    document.getElementById("temperature").style.color = "blue";
} else if (temperature < 30) {
    document.getElementById("temperature").style.color = "green";
} else {
    document.getElementById("temperature").style.color = "red";
}
            
            document.getElementById("feelsLike").innerHTML =
    "🥵 Feels Like: " + data.main.feels_like + "°C";
    
    let feelsLikeTemp = data.main.feels_like;

if (feelsLikeTemp < 20) {
    document.getElementById("feelsLike").style.color = "blue";
} else if (feelsLikeTemp < 30) {
    document.getElementById("feelsLike").style.color = "green";
} else {
    document.getElementById("feelsLike").style.color = "red";
}

let weatherCondition = data.weather[0].main;

document.getElementById("description").innerHTML =
    getWeatherEmoji(weatherCondition) + " Weather: " + data.weather[0].description;

if (weatherCondition === "Clear") {
    document.getElementById("description").style.color = "orange";
} else if (weatherCondition === "Clouds") {
    document.getElementById("description").style.color = "gray";
} else if (weatherCondition === "Rain") {
    document.getElementById("description").style.color = "blue";
} else if (weatherCondition === "Drizzle") {
    document.getElementById("description").style.color = "deepskyblue";
} else if (weatherCondition === "Thunderstorm") {
    document.getElementById("description").style.color = "purple";
} else if (weatherCondition === "Snow") {
    document.getElementById("description").style.color = "lightblue";
} else if (
    weatherCondition === "Mist" ||
    weatherCondition === "Fog" ||
    weatherCondition === "Haze" ||
    weatherCondition === "Smoke"
) {
    document.getElementById("description").style.color = "darkgray";
}

        document.getElementById("humidity").innerHTML =
            "💧 Humidity: " + data.main.humidity + "%";
            
            document.getElementById("wind").innerHTML =
    "💨 Wind Speed: " + data.wind.speed + " m/s";
    
    document.getElementById("pressure").innerHTML =
    "🧭 Pressure: " + data.main.pressure + " hPa";
    
    document.getElementById("cloudiness").innerHTML =
    "☁️ Cloudiness: " + data.clouds.all + "%";
    
    let sunrise = new Date(data.sys.sunrise * 1000);
let sunset = new Date(data.sys.sunset * 1000);

document.getElementById("sunrise").innerHTML =
    "🌅 Sunrise: " + sunrise.toLocaleTimeString();

document.getElementById("sunset").innerHTML =
    "🌇 Sunset: " + sunset.toLocaleTimeString();

    } catch (error) {
        document.getElementById("errorMessage").textContent = error.message;
    }

}


function searchWeather() {
    let city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // Clear old error message before searching
    document.getElementById("errorMessage").innerHTML = "";

    getWeather(city);
}

function clearWeather() {
    document.getElementById("cityInput").value = "";

  document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("city").innerHTML = "";
    document.getElementById("temperature").innerHTML = "";
    document.getElementById("feelsLike").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    document.getElementById("humidity").innerHTML = "";
    document.getElementById("wind").innerHTML = "";
    document.getElementById("sunrise").innerHTML = "";
    document.getElementById("sunset").innerHTML = "";

document.getElementById("pressure").innerHTML = "";


document.getElementById("cloudiness").innerHTML = "";
  document.getElementById("weatherIcon").style.display = "none";
    
    document.getElementById("forecastList").innerHTML = "";
}
  

function getMyLocation() {
    if (!navigator.geolocation) {
        document.getElementById("errorMessage").textContent = "Geolocation is not supported by your browser.";
        return;
    }

    document.getElementById("errorMessage").innerHTML = "📍 Getting your location...";

    navigator.geolocation.getCurrentPosition(
        function(position) {
            document.getElementById("errorMessage").innerHTML = "";
            getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
        },
        function(error) {
            let message = "Unable to get your location.";
            if (error.code === 1) message = "Location permission was denied.";
            else if (error.code === 2) message = "Your location could not be determined.";
            else if (error.code === 3) message = "Location request timed out.";

            document.getElementById("errorMessage").textContent = message;
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}

async function getWeatherByCoordinates(latitude, longitude) {

    try {

        // Get current weather
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            alert("Unable to get weather for your location.");
            return;
        }

        // Display current weather
        document.getElementById("city").textContent = data.name;

        document.getElementById("temperature").textContent =
            `🌡️ Temperature: ${data.main.temp}°C`;

        document.getElementById("feelsLike").textContent =
            `🥵 Feels Like: ${data.main.feels_like}°C`;

        document.getElementById("description").textContent =
            `🌤️ Weather: ${data.weather[0].description}`;

        document.getElementById("humidity").textContent =
            `💧 Humidity: ${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `💨 Wind Speed: ${data.wind.speed} m/s`;

        // Weather icon
        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherIcon").style.display = "block";


        // Get 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        if (forecastData.cod !== "200") {
            alert("Unable to get forecast for your location.");
            return;
        }

        // Display forecast
        const forecastList =
            document.getElementById("forecastList");

        forecastList.innerHTML = "";

        for (let i = 0; i < forecastData.list.length; i += 8) {

            const forecast = forecastData.list[i];

            const date = new Date(forecast.dt * 1000);

            const forecastItem = document.createElement("div");

            forecastItem.innerHTML = `
                <h3>${date.toLocaleDateString()}</h3>
                <p>🌡️ ${forecast.main.temp}°C</p>
                <p>${getWeatherEmoji(forecast.weather[0].main)} ${forecast.weather[0].description}</p>
`;

            forecastList.appendChild(forecastItem);
}

       } catch (error) {

        console.error(error);

        alert("Something went wrong while getting your location weather.");
    }
}
function getWeatherEmoji(condition) {
    if (condition === "Clear") {
        return "☀️";
    }

    if (condition === "Clouds") {
        return "☁️";
    }

    if (condition === "Rain") {
        return "🌧️";
    }

    if (condition === "Thunderstorm") {
        return "⛈️";
    }

    if (condition === "Drizzle") {
        return "🌦️";
    }

    if (condition === "Snow") {
        return "❄️";
    }

    return "🌤️";
}


darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

let isFahrenheit = false;

document.getElementById("unitToggle").addEventListener("click", function () {

    const elements = document.querySelectorAll("*");

    elements.forEach(function(element) {

        if (element.children.length === 0) {

            if (!isFahrenheit && element.textContent.includes("°C")) {

                element.textContent = element.textContent.replace(
                    /(-?\d+(?:\.\d+)?)°C/g,
                    function(match, celsius) {
                        let fahrenheit = (parseFloat(celsius) * 9 / 5) + 32;
                        return fahrenheit.toFixed(2) + "°F";
                    }
                );

            } else if (isFahrenheit && element.textContent.includes("°F")) {

                element.textContent = element.textContent.replace(
                    /(-?\d+(?:\.\d+)?)°F/g,
                    function(match, fahrenheit) {
                        let celsius = (parseFloat(fahrenheit) - 32) * 5 / 9;
                        return celsius.toFixed(2) + "°C";
                    }
                );
            }
        }
    });

    isFahrenheit = !isFahrenheit;

    this.textContent = isFahrenheit
        ? "🌡️ °F / °C"
        : "🌡️ °C / °F";
});
