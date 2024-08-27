
export async function GeonamesData(country,depart) {
    const response = await fetch(`${Client.apiConfig.geonames.url}searchJSON?q=${country}&maxRows=10&username=heba`);
    const data = await response.json();
   const {lat,lng,countryName}=data.geonames[0];
   let info={
  countryName,
  weather:Client.WeatherData(lat,lng)||'',
  ImageUrls: Client.PixabayImage(countryName)||'',
  depart
   }
   console.log(info)
   
   return info;
  }
  
  

  