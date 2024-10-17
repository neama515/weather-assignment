let searchInput = document.getElementById("search");
let place = document.getElementById("place");
let cur_temp = document.getElementById("cur_temp");
let cur_icon = document.getElementById("cur_icon");
let cur_state = document.getElementById("cur_state");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let dir = document.getElementById("dir");
let cur_temp_2 = document.getElementById("cur_temp-2");
let cur_temp_2_1 = document.getElementById("cur_temp-2-1");
let cur_icon_2 = document.getElementById("cur_icon-2");
let cur_state_2 = document.getElementById("cur_state-2");
let cur_temp_3 = document.getElementById("cur_temp-3");
let cur_temp_3_1 = document.getElementById("cur_temp-3-1");
let cur_icon_3 = document.getElementById("cur_icon-3");
let cur_state_3 = document.getElementById("cur_state-3");
let contact=document.getElementById("contact")
let contact_btn=document.getElementById("contact_btn")
let con=document.getElementById("con")
let home=document.getElementById("home")
let w_day=document.getElementById("w-day")
let mon=document.getElementById("mon")
let day2=document.getElementById("day2")
let day3=document.getElementById("day3")
contact_btn.addEventListener("click",function(){
contact.classList.replace("d-none","d-flex")
con.classList.replace("d-block","d-none")
})
home.addEventListener("click",function(){
contact.classList.replace("d-flex","d-none")
con.classList.replace("d-none","d-block")
})
searchInput.addEventListener("input",function(){
display(searchInput.value)
})
async function getData(city="cairo") {
  var response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=8c79f1436da64d57abb141419241210&q=${city}&days=3`
  );

  let apiData = await response.json();
  console.log(apiData)
  return apiData;
}

async function displaycurrent(data) {
  let date = new Date();
  w_day.innerHTML=date.toLocaleDateString("en-US",{weekday:"long"})
  mon.innerHTML = date.getDate();
  mon.innerHTML += date.toLocaleDateString("en-US", { month: "long" });
  place.innerHTML = data.location.name;
  cur_temp.innerHTML = data.current.temp_c;
  cur_icon.setAttribute("src", data.current.condition.icon);
  cur_state.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  dir.innerHTML = data.current.wind_dir;
}
async function displayNextdays(data) {
  let nextdate = new Date(data.forecast.forecastday[1].date);  
  day2.innerHTML = nextdate.toLocaleDateString("en-US",{weekday:"long"})
  let nextdate2 = new Date(data.forecast.forecastday[2].date);  
  day3.innerHTML = nextdate2.toLocaleDateString("en-US",{weekday:"long"})
  cur_temp_2.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
  cur_temp_2_1.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
  cur_icon_2.setAttribute(
    "src",
    data.forecast.forecastday[1].day.condition.icon
  );
   cur_state_2.innerHTML=data.forecast.forecastday[2].day.condition.text
  cur_temp_3.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
  cur_temp_3_1.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
  cur_icon_3.setAttribute(
    "src",
    data.forecast.forecastday[2].day.condition.icon
  );
   cur_state_3.innerHTML=data.forecast.forecastday[2].day.condition.text
}
async function display(city="cairo"){
   let data=await getData(city)
displaycurrent(data);
displayNextdays(data);

}
display()