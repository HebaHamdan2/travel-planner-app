
export async function GeonamesData(country) {
    const response = await fetch(`${Client.apiConfig.geonames.url}searchJSON?q=${country}&maxRows=10&username=${Client.apiConfig.username}`);
    const data = await response.json();
   const {lat,lng,countryName}=data.geonames[0];
    Client.WeatherData(lat,lng)
    Client.PixabayImage(countryName);
  }
  

  