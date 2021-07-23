window.addEventListener("load", () => {
    let lat;
    let long;
    let locationPosition = document.querySelector('.location-position');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.description');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=78f9fa8d63f5890688b8e10f35d7751c`;

            fetch(api)
            .then(response => {return response.json()})
            .then(data => 
                { console.log(data);
                  const {name} = data;
                  const {temp} = data.main;
                  const description = data.weather[0].description;

                  //Cambiando el DOM con los datos de la API

                  locationPosition.textContent = name;
                  temperatureDegree.textContent = `${temp} F`;
                  temperatureDescription.textContent = description;
                  
                })
        })
    }
})

