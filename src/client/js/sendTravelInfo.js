//this code will store the travel info to the backend
const serverURL = 'http://localhost:8081/api/travels';
// let info={
//     countryName,
//     weather:Client.WeatherData(lat,lng),//return object
//     ImageUrls: Client.PixabayImage(countryName)//return array of 3 urls
//      }
export async function postData(info){
    const response = await fetch(serverURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Data successfully posted to server:', result);
    } 