 export async function PixabayImage( query) {
    const url = `${Client.apiConfig.pixabay.url}?key=${Client.apiConfig.pixabay.apiKey}&q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
    const data = await response.json();
    
    if (parseInt(data.totalHits) > 0) {
      // Collect up to 3 URLs
      const imageUrls = data.hits.slice(0, 3).map(hit => hit.webformatURL);
      return imageUrls;
    } else {
      console.log('No hits');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data from Pixabay:', error);
    return [];
  }
}