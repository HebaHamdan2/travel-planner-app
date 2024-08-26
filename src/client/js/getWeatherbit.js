export async function WeatherData(lat,lng) {
  let response;
  if(Client.daysRemaining=='0'){
     response = await fetch(`${Client.apiConfig.weatherbit.url}current?lat=${lat}&lon=${lng}&key=${Client.apiConfig.weatherbit.apiKey}`);
     const data = await response.text();
     const dataObject = JSON.parse(data);
   console.log( dataObject.data[0].temp)
   console.log( dataObject.data[0].weather.description)
   console.log( dataObject.data[0].app_temp)

    }else {
    response = await fetch(`${Client.apiConfig.weatherbit.url}forecast/daily?lat=${lat}&lon=${lng}&days=${Client.daysRemaining+1}&key=${Client.apiConfig.weatherbit.apiKey}`);
    const data = await response.text();
    console.log(Client.daysRemaining)
    const dataObject = JSON.parse(data);

// Access the first object in the 'data' array
const resObject = dataObject.data[Client.daysRemaining];
console.log(resObject)
let{low_temp,high_temp}=resObject;
let{description}=resObject.weather;
    console.log(high_temp,low_temp,description)//should be sent to backend and display it as upcoming trip
  }


  }