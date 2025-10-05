const apiKey = "7174ffc996624ba8bcd190316250310"; // Replace with your WeatherAPI key
const checkWeatherBtn = document.getElementById("checkWeather");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

checkWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.current) { // Check if the response contains the 'current' property
        weatherResult.innerHTML = `
          <p style= "text-align: center;"><strong>${data.location.name}, ${data.location.country}</strong></p><br><hr style= "width: 50%"><br>
          <p>Temperature: ${data.current.temp_c}°C</p><br>
          <p>Weather: ${data.current.condition.text}</p><br>
          <p>Humidity: ${data.current.humidity}%</p><br>
          <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        `;
      } else {
        weatherResult.innerHTML = `City not found.`;
      }
    })
    .catch(error => {
      weatherResult.innerHTML = "Error fetching weather data.";
      console.error(error);
    });
});
