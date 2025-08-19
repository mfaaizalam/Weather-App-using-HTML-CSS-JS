let place = document.querySelector(".place");
let boxes = document.querySelectorAll(".box");
let input = document.querySelector(".search");
let searchbtn = document.querySelector(".searchbtn");
let temp = document.querySelector(".temp");
let description = document.querySelector(".description");
let timezone = document.querySelector(".timezone");
let weatherimg = document.querySelector(".weatherimg");

window.addEventListener("load", () => {
  input.value = "";
  getweather("Karachi");
  getforecastcity("Karachi");
});
const getweather = async (newplace = input.value) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${newplace}&appid=5a12f529ead6fabc4b22b72ef9d3be33&units=metric`;
  const Response = await fetch(URL);
  const data = await Response.json();

  //Palce
  try {
    if (data.cod !==200) throw new Error();
    place.innerHTML = `<h1>${data.name}</h1>`;
    // Tempratue
    temp.innerHTML = `<h1>${data.main.temp}°C</h1>`;

    // Description
    description.innerHTML = `<h3>${data.weather[0].description}</h3>`;

    // timezone
    let date =new Date(data.dt*1000);
    let readabledate = date.toLocaleString();
    timezone.innerHTML = `<h3>/TimeZone:${readabledate}</h3>`;
    // for boxes
    //1
    boxes[0].querySelector("h2").innerText = `${data.main.feels_like}°C`;
    //2
    boxes[1].querySelector("h2").innerText = `${data.main.humidity}%`;
    //3
    boxes[2].querySelector("h2").innerText = `${data.wind.speed}Km/hr`;
    //4
    boxes[3].querySelector("h2").innerText = `${data.main.pressure}hpa`;
    //5
    boxes[4].querySelector("h2").innerText = `${data.main.temp_max}°C`;
    //6
    boxes[5].querySelector("h2").innerText = `${data.main.temp_min}°C`;

    if (data.weather[0].description.toLowerCase().includes("cloud")) {
  weatherimg.style.backgroundImage = "url('cloudy.webp')";
} else if (data.weather[0].description.toLowerCase().includes("clear")) {
  weatherimg.style.backgroundImage = "url('clear.png')";
} else if (data.weather[0].description.toLowerCase().includes("snow")) {
  weatherimg.style.backgroundImage = "url('snowy.png')";
} else if (data.weather[0].main.toLowerCase().includes("wind")) {
  weatherimg.style.backgroundImage = "url('windy.png')";
} else if (data.weather[0].main.toLowerCase().includes("rain")) {
  weatherimg.style.backgroundImage = "url('rainy.png')";
} else if (data.weather[0].main.toLowerCase().includes("thunder")) {
  weatherimg.style.backgroundImage = "url('thunderstorm.png')";
} else {
  weatherimg.style.backgroundImage = "url('clear.jpg')";
}

  } catch {
    alert("Wrong Country/City");
  }
};

let forecastbox = document.querySelectorAll(".forecastbox");


const getforecastcity = async (newplace = input.value) => {
  let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${newplace}&appid=5a12f529ead6fabc4b22b72ef9d3be33&units=metric`;
  let Response = await fetch(forecast);
  let data = await Response.json();

  try {
    if (data.cod != "200") throw new Error();
    console.log(data);
    const list = data.list;
    const morningToEvening = list.find(
      (item) =>
        item.dt_txt.includes("12:00:00") || item.dt_txt.includes("15:00:00")
    );
    const eveningToNight = list.find(
      (item) =>
        item.dt_txt.includes("18:00:00") || item.dt_txt.includes("21:00:00")
    );
    const nightToMorning = list.find(
      (item) =>
        item.dt_txt.includes("00:00:00") ||
        item.dt_txt.includes("03:00:00") ||
        item.dt_txt.includes("06:00:00")
    );

    if (!morningToEvening || !eveningToNight || !nightToMorning)
      throw new Error();
   
    
    let times =[morningToEvening,eveningToNight,nightToMorning];
    forecastbox.forEach((box,index)=>{
      let time =box.querySelector(".forecasttime");
      let temp =box.querySelector(".forecasttemp");
      let description =box.querySelector(".forecastdescription");

      time.innerText = `Time: ${times[index].dt_txt}`;
      temp.innerText = `Temprature: ${times[index].main.temp}°C`;
      description.innerText = `Weather: ${times[index].weather[0].description}`;

    })


  } catch(error){
    console.log("City not found or failed to fetch data.");
     console.error(error);
  }
};

searchbtn.addEventListener("click", () => {
  getweather();
  getforecastcity();
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getweather();
    getforecastcity();
  }
});
