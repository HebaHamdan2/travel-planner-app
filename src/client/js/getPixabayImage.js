export async function PixabayImage(query) {
  const url = `${Client.apiConfig.pixabay.url}?key=${
    Client.apiConfig.pixabay.apiKey
  }&q=${encodeURIComponent(query)}`;

  try {
    // Fetch data from Pixabay API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if there are hits
    if (data.totalHits > 0) {
      // Collect up to 3 URLs from the hits
      const imageUrls = data.hits.slice(0, 3).map((hit) => hit.webformatURL);

      return imageUrls;
    } else {
      // console.log('No images found for the query:', query);
      return [];
    }
  } catch (error) {
    // Log error and return an empty array
    // console.error('Error fetching data from Pixabay:', error);
    return [];
  }
}
