const todayDate = moment()
  .locale("pt-br")
  .format("llll");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function getCapital() {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/group?id=3448439,3451190,3470127,3450554,6322752,6320062,3663517,3397277`,
      {
        params: {
          appid: "9a7785da38bb785c064a400c73fe55c4",
          units: "metric"
        }
      }
    )
    .then(function(response) {
      // handle success
      const listCapital = document.getElementsByClassName("principal-cities");
      response.data.list.map(item => {
        const listItem = document.createElement("li");
        listItem.className = "pricipal-cities__item";
        listItem.innerHTML = `
            <div class="item__min">
              <i class="fas fa-temperature-low"></i>${item.main.temp_min}°
            </div>
            <div class="item__max">
              <i class="fas fa-temperature-high"></i>${item.main.temp_max}°
            </div>
            ${item.name}
        `;
        listCapital[0].appendChild(listItem);
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

getLocation();
getCapital();

function showElement(value, element) {
  const getElement = document.getElementsByClassName(element);
  if (value) {
    getElement[0].classList.remove(`${element}--hide`);
  } else {
    getElement[0].classList.add(`${element}--hide`);
  }
}

function createCard(cityData) {
  const currentCity = cityData;
  const currentCityCreate = document.getElementsByClassName("current-city");
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.innerHTML = `
        <div class="card-left">
          <div class="card-left__city">${currentCity.name}</div>
          <div class="card-left__today">${todayDate}</div>
          <div class="card-left__temperature">${currentCity.main.temp}°</div>
          <div class="card-left__temperature-max">Máx:${currentCity.main.temp_max}°</div>
        </div>
        <div class="card-right">
        
        </div>
      `;
  currentCityCreate[0].appendChild(newCard);
}

function clearCard() {
  const currentCityCreate = document.getElementsByClassName("current-city");
  currentCityCreate[0].innerHTML = "";
}

function showPosition(position) {
  showElement(true, "loader");
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
      {
        params: {
          appid: "9a7785da38bb785c064a400c73fe55c4",
          units: "metric"
        }
      }
    )
    .then(function(response) {
      // handle success
      createCard(response.data);
      showElement(false, "loader");
    })
    .catch(function(error) {
      // handle error
      showElement(false, "loader");
      showElement(true, "error");
    });
}

let input = document.getElementsByClassName("weatherapp__input");

input[0].addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    findWeather(input[0].value);
  }
});

function findWeather(city) {
  clearCard();
  showElement(true, "loader");
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}`, {
      params: {
        appid: "9a7785da38bb785c064a400c73fe55c4",
        units: "metric"
      }
    })
    .then(function(response) {
      // handle success
      showElement(false, "loader");
      showElement(false, "error");
      createCard(response.data);
    })
    .catch(function(error) {
      // handle error
      showElement(false, "loader");
      showElement(true, "error");
    });
}
