document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '861d6213e9feabbf0f5840c5b73060e9'; // Replace with your OpenWeatherMap API key
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const forecastList = document.querySelector('.forecast-list');
    const forecastModal = document.getElementById('forecast-modal');
    const forecastDate = document.getElementById('forecast-date');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');
    const uvIndex = document.getElementById('uv-index');
    const dewPoint = document.getElementById('dew-point');
    const morningTemp = document.getElementById('morning-temp');
    const afternoonTemp = document.getElementById('afternoon-temp');
    const eveningTemp = document.getElementById('evening-temp');
    const nightTemp = document.getElementById('night-temp');
    const morningFeelsLike = document.getElementById('morning-feels-like');
    const afternoonFeelsLike = document.getElementById('afternoon-feels-like');
    const eveningFeelsLike = document.getElementById('evening-feels-like');
    const nightFeelsLike = document.getElementById('night-feels-like');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');

    // Function to fetch weather data
    const fetchWeatherData = async (lat, lon) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
            }
            const data = await response.json();
            updateForecast(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Function to handle search button click
    searchBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const { lat, lon } = data[0];
                        fetchWeatherData(lat, lon);
                    } else {
                        alert('Location not found');
                    }
                })
                .catch(error => console.error('Error fetching location data:', error));
        }
    });

    // Function to update forecast data
    const updateForecast = (data) => {
        forecastList.innerHTML = '';
        data.daily.forEach((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            const description = day.weather[0].description;
            const tempMin = Math.round(day.temp.min);
            const tempMax = Math.round(day.temp.max);
            const icon = getWeatherIcon(day.weather[0].icon);

            const forecastItem = document.createElement('li');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <span class="date">${dayName}</span>
                <i class="fas ${icon}"></i>
                <span class="temp">${tempMax} / ${tempMin}°C</span>
                <span class="description">${description}</span>
                <i class="fas fa-chevron-down"></i>
            `;

            forecastItem.addEventListener('click', () => {
                showForecastDetails(date, day);
            });

            forecastList.appendChild(forecastItem);
        });
    };

    // Function to show forecast details
    const showForecastDetails = (date, data) => {
        forecastDate.textContent = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `Temperature: ${Math.round(data.temp.day)}°C`;
        wind.textContent = `Wind: ${data.wind_speed} m/s, ${data.wind_deg}°`;
        humidity.textContent = `Humidity: ${data.humidity}%`;
        uvIndex.textContent = `UV Index: ${data.uvi}`;
        dewPoint.textContent = `Dew Point: ${data.dew_point}°C`;

        morningTemp.textContent = `${Math.round(data.temp.morn)}°C`;
        afternoonTemp.textContent = `${Math.round(data.temp.day)}°C`;
        eveningTemp.textContent = `${Math.round(data.temp.eve)}°C`;
        nightTemp.textContent = `${Math.round(data.temp.night)}°C`;

        morningFeelsLike.textContent = `${Math.round(data.feels_like.morn)}°C`;
        afternoonFeelsLike.textContent = `${Math.round(data.feels_like.day)}°C`;
        eveningFeelsLike.textContent = `${Math.round(data.feels_like.eve)}°C`;
        nightFeelsLike.textContent = `${Math.round(data.feels_like.night)}°C`;

        sunrise.textContent = new Date(data.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        sunset.textContent = new Date(data.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        forecastModal.style.display = 'block';
    };

    // Function to close modal
    const closeModal = () => {
        forecastModal.style.display = 'none';
    };

    // Function to get weather icon class
    const getWeatherIcon = (iconCode) => {
        const iconMap = {
            '01d': 'fa-sun',
            '01n': 'fa-moon',
            '02d': 'fa-cloud-sun',
            '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud',
            '03n': 'fa-cloud',
            '04d': 'fa-cloud-meatball',
            '04n': 'fa-cloud-meatball',
            '09d': 'fa-cloud-showers-heavy',
            '09n': 'fa-cloud-showers-heavy',
            '10d': 'fa-cloud-sun-rain',
            '10n': 'fa-cloud-moon-rain',
            '11d': 'fa-bolt',
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',
            '50n': 'fa-smog'
        };
        return iconMap[iconCode] || 'fa-question';
    };

    window.onclick = function(event) {
        if (event.target == forecastModal) {
            closeModal();
        }
    };
});
