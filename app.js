window.addEventListener("load", () => {
    let lat;
    let long;
    let locationPosition = document.querySelector('.location-position');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.description');
    const temperatureIcon = document.querySelector('.temperature-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=sp&appid=78f9fa8d63f5890688b8e10f35d7751c`;

            fetch(api)
            .then(response => {return response.json()})
            .then(data => 
                { console.log(data);
                  const {name} = data;
                  const {temp} = data.main;
                  const {description} = data.weather[0];
                  const {country} = data.sys;
                  const {icon} = data.weather[0];

                  //Cambiando el DOM con los datos de la API

                  locationPosition.textContent = `${name}, ${country}`;
                  temperatureDegree.textContent = `${temp} C°`;
                  temperatureDescription.textContent = description;
                  temperatureIcon.innerHTML = `<img src="icons/${icon}.png">`;

                  
                  

                  
                })
                .catch(err => {
                     console.log(err);
                     window.alert('Ocurrio un error consiguiendo la informacion! :(')
                })
               
        })
    }
})

