// Mock the global Client object
global.Client = {
    apiConfig: {
      weatherbit: {
        url: 'https://api.weatherbit.io/v2.0/',
        apiKey: 'testapikey',
      },
    },
    fetchKeys: jest.fn(),
    GeonamesData: jest.fn(),
    PixabayImage: jest.fn(),
    WeatherData: jest.fn(),
    daysRemaining: jest.fn(),
    saveTripToLocal: jest.fn(),
    displayTripData: jest.fn(),
  };
  