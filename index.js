import { apiKey } from "./modules/apikey.js";
import { activities } from "./modules/activities.js";

function suggestActivity(temp, rain, snow) {
  const activity = document.getElementsByClassName("activity")[0];
  activity.style.visibility = "visible";

  function randomN(x) {
    return Math.floor(Math.random() * x);
  }

  if (temp > 18 && !rain) {
    const good = activities.goodWeather;
    const num = randomN(good.length);
    activity.innerHTML = good[num];
  } else if (rain & (temp <= 18)) {
    const bad = activities.badWeather;
    const num = randomN(bad.length);
    activity.innerHTML = bad[num];
  } else {
    const any = activities.any;
    const num = randomN(any.length);
    activity.innerHTML = any[num];
  }
}

document
  .getElementsByClassName("weatherForm")[0]
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const cityName = document.getElementById("city").value;
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const weatherConditions = data.weather[0].description;
        const temp = Math.floor(data.main.temp);
        const rain = data.rain;
        const snow = data.snow;
        const clouds = data.clouds;

        var wetter = document.getElementsByClassName("weather")[0];
        wetter.style.visibility = "visible";
        wetter.innerHTML = `It is ${temp} degrees outside and ${weatherConditions}!`;

        suggestActivity(temp, rain, snow);
      })
      .catch((error) => {
        console.log(error);
        const prompt = document.getElementById("prompt");
        function newPrompt() {
          prompt.innerHTML = `Sorry, I can't find this city. Is there a typo?`;
          prompt.style.color = "red";
        }

        function removePrompt() {
          prompt.innerHTML = `First tell me where you are`;
          prompt.style.color = "white";
        }

        newPrompt();
        setTimeout(removePrompt, 3000);
      });

    //
  });

document.getElementById("city").addEventListener("click", function () {
  const wetter = document.getElementsByClassName("weather")[0];
  wetter.style.visibility = "hidden";
  const activity = document.getElementsByClassName("activity")[0];
  activity.style.visibility = "hidden";
  document.getElementById("city").value = "";
});
