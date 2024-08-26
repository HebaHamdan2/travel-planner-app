 export async function PixabayImage( query) {
    const url = `${Client.apiConfig.pixabay.url}?key=${Client.apiConfig.pixabay.apiKey}&q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (parseInt(data.totalHits) > 0) {
        data.hits.forEach(hit => {
          console.log(hit.pageURL);
        });
      } else {
        console.log('No hits');
      }
    } catch (error) {
      console.error('Error fetching data from Pixabay:', error);
    }
  }
  
