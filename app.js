let giveawayEndDate = document.querySelector("#giveawayEndDate");
let days = document.querySelector("#days");
let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");
let endTime;

if (localStorage.getItem("endTime") === null) {
  let temporaryTime = new Date().getTime();
  temporaryTime += 689859500;
  localStorage.setItem("endTime", temporaryTime);
}
endTime = new Date(parseInt(localStorage.getItem("endTime")));

setGiveawayEndDate(endTime);

function setGiveawayEndDate(time) {
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  giveawayEndDate.innerHTML = `${day[time.getDay()]},  ${
    month[time.getMonth()]
  } ${time.getDate()}, ${time.getFullYear()}, ${
    time.getHours() % 12 || 12
  }:${time.getMinutes()} ${time.getHours() >= 12 ? "PM" : "AM"}`;
}

let countDownInterval = setInterval(setCountDown, 1000, endTime);

function setCountDown(endTime) {
  let currentTime = new Date().getTime();
  let timeLeftSeconds = (endTime.getTime() - currentTime) / 1000;

  if (timeLeftSeconds <= 0) {
    localStorage.removeItem("endTime");
    window.alert("Giveaway ended");
    clearInterval(countDownInterval);
    return;
  }

  seconds.innerText = Math.floor(timeLeftSeconds % 60);
  minutes.innerText = Math.floor((timeLeftSeconds % 3600) / 60);
  hours.innerText = Math.floor((timeLeftSeconds % (3600 * 24)) / 3600);
  days.innerText = Math.floor(timeLeftSeconds / (3600 * 24));
}
