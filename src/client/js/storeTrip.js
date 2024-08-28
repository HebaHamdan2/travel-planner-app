import Swal from "sweetalert2";
// Save trip data to local storage
export async function saveTripToLocal(data) {
    try {
      const depart = new Date(await data.depart);
      const weather = await data.weather;
      const imageUrls = await data.ImageUrls;
  
      // Construct trip data object
      const tripData = {
        id: Date.now(), // Unique identifier for each trip
        countryName: data.countryName,
        depart: depart.toISOString(), // Store in ISO format for consistency
        weather: {
          desc: weather?.desc || '',
          temp: weather?.temp || '',
          feelslike: weather?.feelslike || '',
          high: weather?.high || '',
          low: weather?.low || '',
        },
        imageUrls: imageUrls,
      };
  
      // Retrieve existing data from local storage
      let tripArray = JSON.parse(localStorage.getItem('tripData')) || [];
  
      // Add new trip data to the array
      tripArray.push(tripData);
  
      // Save updated array back to local storage
      localStorage.setItem('tripData', JSON.stringify(tripArray));
  
      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Your trip has been saved successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // Update the HTML
      Client.displayTripData();
  
    } catch (error) {
      console.error('Error saving trip data:', error);
    Swal.fire({
        title: 'Error!',
        text: 'There was an error saving your trip. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  