const serverURL = 'http://localhost:8081/api/getKeys';

// Initialize apiConfig without keys 
export let apiConfig = {
  geonames: {
    url: 'https://secure.geonames.org/',
    username: ''
  },
  weatherbit: {
    url: 'https://api.weatherbit.io/v2.0/',
    apiKey: ''
  },
  pixabay: {
    url: 'https://pixabay.com/api/',
    apiKey: ''
  }
};

async function fetchKeys() {
  try {
    const response = await fetch(serverURL);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    apiConfig = {
      geonames: {
        username: data.username 
      },
      weatherbit: {
        apiKey: data.weatherKey
      },
      pixabay: {
        apiKey: data.pixabayKey 
      }
    };
    
    console.log('API Configuration:', apiConfig);
    
  } catch (error) {
    console.error('Error fetching API configuration:', error);
  }
}

fetchKeys();
