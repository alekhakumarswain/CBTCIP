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

    // Initial fetch for current location (if desired)
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(lat, lon);
            }, error => {
                console.error('Error getting geolocation:', error);
                // Handle error fetching location
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Handle no geolocation support
        }
    }

    getLocation(); // Fetch weather data for current location

    // Function to fetch 8-day forecast data
    const fetchWeatherData = async (lat, lon) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error fetching forecast data');
            }
            const data = await response.json();
            updateForecast(data, lat, lon); // Pass lat and lon to updateForecast
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
    const updateForecast = (data, lat, lon) => {
        forecastList.innerHTML = '';
        for (let i = 0; i < data.list.length; i += 8) {
            const dayData = data.list[i];
            const date = new Date(dayData.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            const description = dayData.weather[0].description;
            const temp = Math.round(dayData.main.temp);
            const icon = getWeatherIcon(dayData.weather[0].icon); // Call getWeatherIcon here
            const forecastItem = document.createElement('li');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <span class="date">${dayName}</span>
                <i class="fas ${icon}"></i>
                <span class="temp">${temp}°C</span>
                <span class="description">${description}</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            // Set data attributes for latlon
            forecastItem.dataset.latlon = `${lat},${lon}`;

            forecastItem.addEventListener('click', () => {
                showForecastDetails(date, dayData);
            });

            forecastList.appendChild(forecastItem);
        }
    };

    // Function to show forecast details
    const showForecastDetails = (date, data) => {
        forecastDate.textContent = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        wind.textContent = `Wind: ${data.wind.speed} m/s, ${data.wind.deg}°`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;

        // Check if UV Index and Dew Point are available
        uvIndex.textContent = data.main.uvi ? `UV Index: ${data.main.uvi}` : 'UV Index: N/A';
        dewPoint.textContent = data.main.dew_point ? `Dew Point: ${data.main.dew_point}°C` : 'Dew Point: N/A';

        // Check if morning, afternoon, evening, night temperatures are available
        morningTemp.textContent = data.main.temp_min ? `${Math.round(data.main.temp_min)}°C` : 'N/A';
        afternoonTemp.textContent = data.main.temp_max ? `${Math.round(data.main.temp_max)}°C` : 'N/A';
        eveningTemp.textContent = 'N/A'; // Adjust as per data availability
        nightTemp.textContent = 'N/A'; // Adjust as per data availability

        // Check if feels-like temperatures are available
        morningFeelsLike.textContent = 'N/A'; // Adjust as per data availability
        afternoonFeelsLike.textContent = 'N/A'; // Adjust as per data availability
        eveningFeelsLike.textContent = 'N/A'; // Adjust as per data availability
        nightFeelsLike.textContent = 'N/A'; // Adjust as per data availability

        // Check if sunrise and sunset times are available
        sunrise.textContent = 'N/A'; // Adjust as per data availability
        sunset.textContent = 'N/A'; // Adjust as per data availability

        forecastModal.style.display = 'block';
    };

    // Function to close modal
    const closeModal = () => {
        forecastModal.style.display = 'none';
    };

    // Event listener for adding to favorites
    const addFevBtn = document.getElementById('add-fev'); // Define addFevBtn here
    addFevBtn.addEventListener('click', () => {
        const selectedLatLon = addFevBtn.dataset.latlon;
        if (selectedLatLon) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.includes(selectedLatLon)) {
                favorites.push(selectedLatLon);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Location added to favorites!');
            } else {
                alert('Location already in favorites!');
            }
        } else {
            alert('No location selected to add to favorites!');
        }
    });

    window.onclick = function(event) {
        if (event.target == forecastModal) {
            closeModal();
        }
    };
});

// Function to get weather icon class
function getWeatherIcon(iconCode) {
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
}
