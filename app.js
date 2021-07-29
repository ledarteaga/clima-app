window.addEventListener("load", () => {
    let lat;
    let long;
    let locationPosition = document.querySelector('.location-position');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.description');
    const temperatureIcon = document.querySelector('.temperature-icon');

    // PROXY PARA QUE FUNCIONE EL API
    
    (function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=sp&appid=78f9fa8d63f5890688b8e10f35d7751c`;

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const {
                        name
                    } = data;
                    const {
                        temp
                    } = data.main;
                    const {
                        description
                    } = data.weather[0];
                    const {
                        country
                    } = data.sys;
                    const {
                        icon
                    } = data.weather[0];

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