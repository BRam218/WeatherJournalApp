// Personal API Key for OpenWeatherMap API
const apiKey = "d75678a2d59fb26e39a8daf33f5df685&units=metric";
const apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener

document.getElementById("generate").addEventListener("click", performAction);

// Function called by Event listener

function performAction(e) {
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  const url = `${apiBaseUrl}${zip}&appid=${apiKey}`;

  getWeatherData(url)
    .then(function (userData) {
      postData("/add", {
        date: newDate,
        temp: userData.main.temp,
        content: content,
        name: userData.name,
      });
    })
    .then(function (newData) {
      updateUI();
    });
}

// GET API Data

const getWeatherData = async (url) => {
  let res = await fetch(url);
  try {
    let userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

// POST Data

const postData = async (url, data) => {
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
      name: data.name,
    }),
  });

  try {
    let newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp + " ℃";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("name").innerHTML = allData.name;
  } catch (error) {
    console.log("error", error);
  }
};
