import { apiConfig, fetchKeys } from '../src/client/js/app.js'; 
import Swal from 'sweetalert2'; 

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Client API Fetch', () => {
  beforeEach(() => {
    jest.resetAllMocks(); 
    global.fetch = jest.fn(); 
  });

  test('should update apiConfig on successful fetch', async () => {
    const mockResponse = {
      username: 'testuser',
      weatherKey: 'testweatherkey',
      pixabayKey: 'testpixabaykey',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    await fetchKeys();

    expect(apiConfig).toEqual({
      geonames: {
        url: 'https://secure.geonames.org/',
        username: 'testuser',
      },
      weatherbit: {
        url: 'https://api.weatherbit.io/v2.0/',
        apiKey: 'testweatherkey',
      },
      pixabay: {
        url: 'https://pixabay.com/api/',
        apiKey: 'testpixabaykey',
      },
    });
  });

  test('should handle fetch error and show Swal alert', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    await fetchKeys();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error!',
      text: 'Error fetching API configuration',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  });
});
