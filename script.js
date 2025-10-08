// script.js
// DOM Elements
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const mainContent = document.getElementById('main-content');

// Current weather elements
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const locationElement = document.getElementById('location');
const weatherIcon = document.getElementById('weather-icon');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const feelsLikeElement = document.getElementById('feels-like');
const visibilityElement = document.getElementById('visibility');

// Forecast container
const forecastContainer = document.getElementById('forecast-container');

// Additional info elements
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const pressureElement = document.getElementById('pressure');
const precipitationElement = document.getElementById('precipitation');
const cloudCoverElement = document.getElementById('cloud-cover');
const uvElement = document.getElementById('uv-index');

// AccuWeather API Configuration
const API_KEY = "Replace With Your API KEY ";

const BASE_URL = "URL YOU MUST APPLY";

// Sample weather data (fallback if API fails)
const sampleWeatherData = {
    current: {
        temp: 24,
        description: 'sunny',
        location: 'New York, USA',
        wind: 12,
        humidity: 65,
        feelsLike: 26,
        visibility: 10,
        sunrise: '06:24',
        sunset: '19:45',
        pressure: '1013 hPa',
        precipitation: '0%',
        cloudCover: '10%',
        uvIndex: 'UV 4',
        iconNumber: 1
    },
    forecast: [
        { day: 'Mon', icon: 'sun', temp: 25 },
        { day: 'Tue', icon: 'cloud-sun', temp: 23 },
        { day: 'Wed', icon: 'cloud', temp: 20 },
        { day: 'Thu', icon: 'cloud-rain', temp: 18 },
        { day: 'Fri', icon: 'sun', temp: 22 }
    ]
};

// Update UI with weather data
function updateWeatherUI(data) {
    temperature.textContent = `${data.current.temp}°C`;
    weatherDescription.textContent = data.current.description;
    locationElement.textContent = data.current.location;
    windElement.textContent = `Wind: ${data.current.wind} km/h`;
    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    feelsLikeElement.textContent = `Feels like: ${data.current.feelsLike}°C`;
    visibilityElement.textContent = `Visibility: ${data.current.visibility} km`;
    
    // Update weather icon
    const iconClass = getWeatherIconClass(data.current.iconNumber);
    weatherIcon.className = `fas fa-${iconClass}`;
    
    // Update forecast
    forecastContainer.innerHTML = '';
    data.forecast.forEach((day, index) => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${day.day}</div>
            <div class="forecast-icon"><i class="fas fa-${day.icon}"></i></div>
            <div class="forecast-temp">${day.temp}°C</div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
    
    // Update additional info
    sunriseElement.textContent = data.current.sunrise;
    sunsetElement.textContent = data.current.sunset;
    pressureElement.textContent = data.current.pressure;
    precipitationElement.textContent = data.current.precipitation;
    cloudCoverElement.textContent = data.current.cloudCover;
    uvElement.textContent = data.current.uvIndex;
}

// Map AccuWeather icon numbers to FontAwesome classes
function getWeatherIconClass(iconNumber, isDay = true) {
    const iconMap = {
        1: 'sun',           // Sunny
        2: 'cloud-sun',     // Mostly Sunny
        3: 'cloud-sun',     // Partly Sunny
        4: 'cloud-sun',     // Intermittent Clouds
        5: 'cloud-sun',     // Hazy Sunshine
        6: 'cloud',         // Mostly Cloudy
        7: 'cloud',         // Cloudy
        8: 'cloud',         // Dreary
        11: 'smog',         // Fog
        12: 'cloud-rain',   // Showers
        13: 'cloud-sun-rain', // Mostly Cloudy w/ Showers
        14: 'cloud-sun-rain', // Partly Sunny w/ Showers
        15: 'bolt',         // T-Storms
        16: 'cloud-bolt',   // Mostly Cloudy w/ T-Storms
        17: 'cloud-sun-rain', // Partly Sunny w/ T-Storms
        18: 'cloud-rain',   // Rain
        19: 'wind',         // Flurries
        20: 'cloud-sun-rain', // Mostly Cloudy w/ Flurries
        21: 'cloud-sun-rain', // Partly Sunny w/ Flurries
        22: 'snowflake',    // Snow
        23: 'snowflake',    // Mostly Cloudy w/ Snow
        24: 'icicles',      // Ice
        25: 'icicles',      // Sleet
        26: 'icicles',      // Freezing Rain
        29: 'cloud-rain',   // Rain and Snow
        30: 'temperature-high', // Hot
        31: 'temperature-low',  // Cold
        32: 'wind',         // Windy
        33: 'moon',         // Clear (Night)
        34: 'cloud-moon',   // Mostly Clear (Night)
        35: 'cloud-moon',   // Partly Cloudy (Night)
        36: 'cloud-moon',   // Intermittent Clouds (Night)
        37: 'cloud-moon',   // Hazy Moonlight
        38: 'cloud-moon',   // Mostly Cloudy (Night)
        39: 'cloud-moon-rain', // Partly Cloudy w/ Showers (Night)
        40: 'cloud-moon-rain', // Mostly Cloudy w/ Showers (Night)
        41: 'cloud-bolt',   // Partly Cloudy w/ T-Storms (Night)
        42: 'cloud-bolt',   // Mostly Cloudy w/ T-Storms (Night)
        43: 'snowflake',    // Mostly Cloudy w/ Flurries (Night)
        44: 'snowflake'     // Mostly Cloudy w/ Snow (Night)
    };
    
    return iconMap[iconNumber] || 'sun';
}

// Map AccuWeather weather text to descriptions
function getWeatherDescription(iconNumber) {
    const descriptionMap = {
        1: 'Sunny',
        2: 'Mostly Sunny',
        3: 'Partly Sunny', 
        4: 'Intermittent Clouds',
        5: 'Hazy Sunshine',
        6: 'Mostly Cloudy',
        7: 'Cloudy',
        8: 'Dreary',
        11: 'Fog',
        12: 'Showers',
        13: 'Mostly Cloudy with Showers',
        14: 'Partly Sunny with Showers',
        15: 'Thunderstorms',
        16: 'Mostly Cloudy with Thunderstorms',
        17: 'Partly Sunny with Thunderstorms',
        18: 'Rain',
        19: 'Flurries',
        20: 'Mostly Cloudy with Flurries',
        21: 'Partly Sunny with Flurries',
        22: 'Snow',
        23: 'Mostly Cloudy with Snow',
        24: 'Ice',
        25: 'Sleet',
        26: 'Freezing Rain',
        29: 'Rain and Snow',
        30: 'Hot',
        31: 'Cold',
        32: 'Windy',
        33: 'Clear',
        34: 'Mostly Clear',
        35: 'Partly Cloudy',
        36: 'Intermittent Clouds',
        37: 'Hazy Moonlight',
        38: 'Mostly Cloudy',
        39: 'Partly Cloudy with Showers',
        40: 'Mostly Cloudy with Showers',
        41: 'Partly Cloudy with Thunderstorms',
        42: 'Mostly Cloudy with Thunderstorms',
        43: 'Mostly Cloudy with Flurries',
        44: 'Mostly Cloudy with Snow'
    };
    
    return descriptionMap[iconNumber] || 'Sunny';
}

// Get location key for a city
async function getLocationKey(city) {
    try {
        console.log(`Searching for city: ${city}`);
        
        const response = await fetch(
            `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${encodeURIComponent(city)}`
        );
        
        console.log(`Search URL: ${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`API response for "${city}":`, data);
        
        if (!data || data.length === 0) {
            throw new Error(`City "${city}" not found. Try "New York", "London", or "Tokyo"`);
        }
        
        const location = data[0];
        return {
            key: location.Key,
            name: location.LocalizedName,
            country: location.Country?.LocalizedName || location.Country?.ID || 'Unknown',
            administrativeArea: location.AdministrativeArea?.LocalizedName || ''
        };
        
    } catch (error) {
        console.error('Error in getLocationKey:', error);
        throw error;
    }
}

// Get location key from coordinates
async function getLocationKeyByCoords(lat, lon) {
    try {
        console.log(`Getting location for coordinates: ${lat}, ${lon}`);
        
        const response = await fetch(
            `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
        );
        
        console.log(`Geoposition URL: ${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Geoposition response:', data);
        
        if (!data) {
            throw new Error('Location not found for coordinates');
        }
        
        return {
            key: data.Key,
            name: data.LocalizedName,
            country: data.Country?.LocalizedName || data.Country?.ID || 'Unknown',
            administrativeArea: data.AdministrativeArea?.LocalizedName || ''
        };
        
    } catch (error) {
        console.error('Error in getLocationKeyByCoords:', error);
        throw error;
    }
}

// Get current conditions
async function getCurrentConditions(locationKey) {
    try {
        const response = await fetch(
            `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
        );
        
        console.log(`Current conditions URL: ${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Current conditions data:', data);
        
        if (!data || data.length === 0) {
            throw new Error('Current conditions not available');
        }
        
        return data[0];
    } catch (error) {
        console.error('Error fetching current conditions:', error);
        throw error;
    }
}

// Get 5-day forecast
async function get5DayForecast(locationKey) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true&details=true`
        );
        
        console.log(`Forecast URL: ${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true&details=true`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Forecast data:', data);
        
        if (!data || !data.DailyForecasts) {
            throw new Error('Forecast data not available');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
}

// Process AccuWeather data into our app format
function processAccuWeatherData(location, currentData, forecastData) {
    console.log('Processing data for location:', location);
    console.log('Current data:', currentData);
    console.log('Forecast data:', forecastData);
    
    // Build location string
    const locationString = location.administrativeArea ? 
        `${location.name}, ${location.administrativeArea}, ${location.country}` :
        `${location.name}, ${location.country}`;

    // Safely extract current weather data with fallbacks
    const current = {
        temp: Math.round(currentData.Temperature?.Metric?.Value) || 20,
        description: getWeatherDescription(currentData.WeatherIcon),
        location: locationString,
        wind: currentData.Wind?.Speed?.Metric?.Value ? 
              Math.round(currentData.Wind.Speed.Metric.Value) : 10,
        humidity: currentData.RelativeHumidity || 50,
        feelsLike: currentData.RealFeelTemperature?.Metric?.Value ? 
                  Math.round(currentData.RealFeelTemperature.Metric.Value) : 
                  Math.round(currentData.Temperature?.Metric?.Value) || 20,
        visibility: currentData.Visibility?.Metric?.Value ? 
                   (currentData.Visibility.Metric.Value / 1000).toFixed(1) : '10',
        sunrise: forecastData.DailyForecasts?.[0]?.Sun?.Rise ? 
                new Date(forecastData.DailyForecasts[0].Sun.Rise).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : '06:00',
        sunset: forecastData.DailyForecasts?.[0]?.Sun?.Set ? 
               new Date(forecastData.DailyForecasts[0].Sun.Set).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : '18:00',
        pressure: currentData.Pressure?.Metric?.Value ? 
                 `${currentData.Pressure.Metric.Value} ${currentData.Pressure.Metric.Unit}` : '1013 hPa',
        precipitation: currentData.Precip1hr?.Metric?.Value ? 
                      `${currentData.Precip1hr.Metric.Value} mm` : '0%',
        cloudCover: currentData.CloudCover ? `${currentData.CloudCover}%` : '0%',
        uvIndex: currentData.UVIndexText || currentData.UVIndex ? 
                `UV ${currentData.UVIndex}` : 'UV 0',
        iconNumber: currentData.WeatherIcon || 1
    };
    
    // Process forecast data with safety checks
    const forecast = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    if (forecastData.DailyForecasts && Array.isArray(forecastData.DailyForecasts)) {
        forecastData.DailyForecasts.forEach((day, index) => {
            const date = new Date(day.Date);
            const dayName = days[date.getDay()];
            
            forecast.push({
                day: dayName,
                icon: getWeatherIconClass(day.Day?.Icon || 1),
                temp: Math.round(day.Temperature?.Maximum?.Value) || 20
            });
        });
    } else {
        // Fallback forecast data
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dayName = days[date.getDay()];
            
            forecast.push({
                day: dayName,
                icon: 'sun',
                temp: 20 + i
            });
        }
    }
    
    return { current, forecast };
}

// Fetch weather data by city name
async function fetchWeatherData(city) {
    if (!city || city.trim() === '') {
        return {
            ...sampleWeatherData,
            current: {
                ...sampleWeatherData.current,
                location: 'Please enter a city name'
            }
        };
    }
    
    try {
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        
        console.log(`Fetching weather for: ${city}`);
        
        // Get location key first
        const location = await getLocationKey(city);
        console.log('Location found:', location);
        
        // Get current conditions and forecast in parallel
        const [currentData, forecastData] = await Promise.all([
            getCurrentConditions(location.key),
            get5DayForecast(location.key)
        ]);
        
        // Process the data for our app
        return processAccuWeatherData(location, currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorMessage.textContent = `${error.message}. Using sample data.`;
        errorMessage.style.display = 'block';
        
        return {
            ...sampleWeatherData,
            current: {
                ...sampleWeatherData.current,
                location: `${city} (Sample Data)`,
                description: `City not found - ${sampleWeatherData.current.description}`
            }
        };
    } finally {
        loading.style.display = 'none';
    }
}

// Fetch weather data by coordinates
async function fetchWeatherDataByCoords(lat, lon) {
    try {
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        
        console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
        
        // Get location key from coordinates
        const location = await getLocationKeyByCoords(lat, lon);
        console.log('Location from coordinates:', location);
        
        // Get current conditions and forecast in parallel
        const [currentData, forecastData] = await Promise.all([
            getCurrentConditions(location.key),
            get5DayForecast(location.key)
        ]);
        
        // Process the data for our app
        return processAccuWeatherData(location, currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data by coordinates:', error);
        errorMessage.textContent = `Location error: ${error.message}. Using sample data.`;
        errorMessage.style.display = 'block';
        
        return sampleWeatherData;
    } finally {
        loading.style.display = 'none';
    }
}

// Get current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
            return;
        }

        // Show loading state for geolocation
        loading.style.display = 'block';
        loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting your location...';
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: true
        });
    });
}

// Use current location
async function useCurrentLocation() {
    try {
        console.log('Getting current location...');
        
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        console.log(`Coordinates: ${latitude}, ${longitude}`);
        
        // Fetch weather data using coordinates
        const weatherData = await fetchWeatherDataByCoords(latitude, longitude);
        updateWeatherUI(weatherData);
        
        // Add animation effect
        const currentWeather = document.querySelector('.current-weather');
        currentWeather.style.animation = 'none';
        setTimeout(() => {
            currentWeather.style.animation = 'slideInLeft 1s ease';
        }, 10);
        
    } catch (error) {
        console.error('Error getting current location:', error);
        
        let errorMsg = 'Unable to get your location. ';
        if (error.code === error.PERMISSION_DENIED) {
            errorMsg += 'Please allow location access and try again.';
        } else if (error.code === error.TIMEOUT) {
            errorMsg += 'Location request timed out. Please try again.';
        } else {
            errorMsg += error.message;
        }
        
        errorMessage.textContent = errorMsg;
        errorMessage.style.display = 'block';
        
        // Reset loading
        loading.style.display = 'none';
    }
}

// Search functionality
searchBtn.addEventListener('click', async () => {
    const city = searchBox.value.trim();
    if (city !== '') {
        const weatherData = await fetchWeatherData(city);
        updateWeatherUI(weatherData);
        
        // Add animation effect
        const currentWeather = document.querySelector('.current-weather');
        currentWeather.style.animation = 'none';
        setTimeout(() => {
            currentWeather.style.animation = 'slideInLeft 1s ease';
        }, 10);
    }
});

// Allow pressing Enter to search
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Add location button to the header
function addLocationButton() {
    const searchContainer = document.querySelector('.search-container');
    const locationBtn = document.createElement('button');
    locationBtn.className = 'search-btn location-btn';
    locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
    locationBtn.title = 'Use current location';
    locationBtn.addEventListener('click', useCurrentLocation);
    
    // Add some custom styling for the location button
    locationBtn.style.marginLeft = '5px';
    locationBtn.style.background = 'var(--secondary)';
    
    searchContainer.appendChild(locationBtn);
}

// Add popular cities to try
function addPopularCities() {
    const searchContainer = document.querySelector('.search-container');
    const popularDiv = document.createElement('div');
    popularDiv.className = 'popular-cities';
    popularDiv.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: 10px;
        flex-wrap: wrap;
        justify-content: center;
    `;
    
    const TEST_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    
    popularDiv.innerHTML = `
        <small style="width: 100%; text-align: center; opacity: 0.7;">Try: </small>
        ${TEST_CITIES.map(city => 
            `<button class="city-btn" style="background: rgba(255,255,255,0.1); border: none; border-radius: 15px; padding: 5px 10px; color: white; cursor: pointer; font-size: 0.8rem; transition: all 0.3s ease;">${city}</button>`
        ).join('')}
    `;
    
    searchContainer.parentNode.insertBefore(popularDiv, searchContainer.nextSibling);
    
    // Add click events to city buttons
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            searchBox.value = e.target.textContent;
            searchBtn.click();
        });
        
        // Add hover effects
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(255,255,255,0.2)';
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.transform = 'translateY(0)';
        });
    });
}

// Add hover effects to forecast items
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.forecast-item')) {
        const item = e.target.closest('.forecast-item');
        item.style.transform = 'translateY(-10px)';
        item.style.background = 'rgba(255, 255, 255, 0.15)';
    }
    
    if (e.target.closest('.info-card')) {
        const card = e.target.closest('.info-card');
        card.style.transform = 'translateY(-5px)';
        card.style.background = 'rgba(255, 255, 255, 0.15)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.forecast-item')) {
        const item = e.target.closest('.forecast-item');
        item.style.transform = 'translateY(0)';
        item.style.background = 'rgba(255, 255, 255, 0.1)';
    }
    
    if (e.target.closest('.info-card')) {
        const card = e.target.closest('.info-card');
        card.style.transform = 'translateY(0)';
        card.style.background = 'var(--card-bg)';
    }
});

// Test the API connection with a known city
async function testAPI() {
    console.log('Testing AccuWeather API connection...');
    try {
        const testData = await fetchWeatherData('New York');
        console.log('API test result:', testData);
        
        if (!testData.current.location.includes('Sample')) {
            console.log('✅ API connection successful!');
            return true;
        } else {
            console.log('❌ API test failed - using sample data');
            return false;
        }
    } catch (error) {
        console.error('API test failed:', error);
        return false;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Add location button
    addLocationButton();
    
    // Add popular cities buttons
    addPopularCities();
    
    // Test API on load
    setTimeout(() => {
        testAPI().then(success => {
            if (!success) {
                errorMessage.textContent = 'API connection issue. Using sample data. Try the location button or search for cities.';
                errorMessage.style.display = 'block';
            }
        });
    }, 1000);
});

// Initialize with sample data
updateWeatherUI(sampleWeatherData);