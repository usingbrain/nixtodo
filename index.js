 //import db from "./db"

var weatherConditions = {
    bad: [
        "How about visiting a museum or a gallery you haven't been to?",
        "Is there a planetarium? Go look at the stars!",
        "Well, this weather is best for a marathon! Bingewatching marathon that is. Harry Potter or Lord of the Rings?"
    ],
    good: ["Try geocaching in your area!",
            "A zoo is always fun!",
            "How about a picnic in the nearest park?"
    ],
    all: ["Try new cuisine. Takeout, restaurant or as a recipe if you are feeling brave!",
        "Create an art piece from stuff you can find at home. Search #mixedmedia for inspiration",
        "Sing your heart at a karaoke!"
    ]
}


document.getElementsByClassName("btn")[0].addEventListener("click", function () {

    var weatherInput = {
        temp: document.getElementById("formInput").elements[0].value,
        isSunny: document.getElementById("formInput").elements[1].value == "yes",
        isRainy: document.getElementById("formInput").elements[2].value == "yes"
    };

    console.log(weatherInput);
    

    var wetter = document.getElementsByClassName("weather")[0];
    wetter.style.visibility = "visible";
    var sky
    if (weatherInput.isSunny) {
        sky = "it's sunny";
    }
    else {
        sky = "it's cloudy";
    }
    var rain
    if (weatherInput.isRainy) {
        rain = "it rains!";
    }
    else {
        rain = "there is no rain!"
    };
    wetter.innerHTML = `Today there is ${weatherInput.temp} degrees outside, ${sky} and ${rain}`;

    var activity = document.getElementsByClassName("activity")[0];
    activity.style.visibility = "visible";

    var randomN = Math.floor(Math.random() * 3);

    if ((weatherInput.temp > 18) && (!weatherInput.isRainy)) {
        activity.innerHTML = weatherConditions.good[randomN];
    }
    else if (weatherInput.isRainy || (weatherInput.temp <=18) ) {
        activity.innerHTML = weatherConditions.bad[randomN];
    }
    else {
        activity.innerHTML = weatherConditions.all[randomN];
    };
})

// //console.log(db);