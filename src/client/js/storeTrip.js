import Swal from "sweetalert2";
export async function saveTripToLocal(data) {
    try {
      const depart = new Date(await data.depart);
      const weather = await data.weather;
      const imageUrls = await data.ImageUrls;
      const tripData = {
        id: Date.now(), // Unique identifier for each trip
        countryName: data.countryName,
        depart: depart.toISOString(), 
        weather: {
          desc: weather?.desc || '',
          temp: weather?.temp || '',
          feelslike: weather?.feelslike || '',
          high: weather?.high || '',
          low: weather?.low || '',
        },
        imageUrls: imageUrls,
      };
  
      let tripArray = JSON.parse(localStorage.getItem('tripData')) || [];
  
      // Add new trip data to the array
      tripArray.push(tripData);
  
      // Save updated array back to local storage
      localStorage.setItem('tripData', JSON.stringify(tripArray));

      Swal.fire({
        title: 'Success!',
        text: 'Your trip has been saved successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
  Client.showSpinner();
      Client.displayTripData();
      Client.hideSpinner();
    } catch (error) {
    Swal.fire({
        title: 'Error!',
        text: 'There was an error saving your trip. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  