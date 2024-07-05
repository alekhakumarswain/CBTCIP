const apiKey = '';

async function getWeatherDataByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Check the console to see the structure of the data
        updateWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getWeatherDataByCity(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Check the console to see the structure of the data
        updateWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherData(data) {
    document.getElementById('current-temp').textContent = `${data.main.temp || 'N/A'}°C`;
    document.getElementById('weather-description').textContent = data.weather[0].description || 'N/A';
    document.getElementById('feels-like').textContent = `${data.main.feels_like || 'N/A'}°C`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed || 'N/A'} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity || 'N/A'}%`;
    document.getElementById('cloud-cover').textContent = `${data.clouds.all || 'N/A'}%`;
    document.getElementById('wind-degree').textContent = `${data.wind.deg || 'N/A'}°`;
    document.getElementById('wind-gust').textContent = `${data.wind.gust || 'N/A'} m/s`;
    document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('aqi-value').textContent = 'N/A'; // Air Quality data not available in this endpoint
    document.getElementById('uv-index').textContent = 'N/A'; // UV Index data not available in this endpoint
    document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;

    const lastUpdatedTime = new Date(data.dt * 1000);
    document.getElementById('last-updated-time').textContent = lastUpdatedTime.toLocaleString();
}

function updateDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById('current-date').textContent = `${day}, ${date}`;
    document.getElementById('current-time').textContent = time;
    document.getElementById('last-updated-time').textContent = time;
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
    const locationInput = document.getElementById('location-input').value.trim();
    if (locationInput) {
        getWeatherDataByCity(locationInput);
    } else {
        alert('Please enter a valid location.');
    }
});

// Initial fetch for current location (if desired)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoords(lat, lon);
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


// Initial load with default city (optional)
const defaultCity = 'Bhubaneswar';
getWeatherDataByCity(defaultCity);

// Update date and time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call
