# Travel Planner App

The **Travel Planner App** is a project developed as part of the Udacity Nanodegree program. This app allows users to add, store, and manage their trips, whether they are today, upcoming or past trips. It features the ability to view weather forecasts for departure dates using the  [Weatherbit](https://www.weatherbit.io/api/) API and to get images of destinations using the [Pixabay](https://pixabay.com/service/about/api/) API. The application is built with many web technologies and includes both client-side and server-side testing.

## Features

- **Add and Manage Trips**: Users can add, view, and delete trips.
- **Weather Forecast**: Displays weather forecasts for the departure date using the Weatherbit API.
- **Destination Images**: Fetches images of destinations or countries using the Pixabay API.
- **Local Storage**: Trips data is stored in the browser's local storage, allowing data persistence across sessions.
- **Alerts**: Utilizes SweetAlert2 for interactive and user-friendly alerts.

## Tech Stack

- **Frontend**: 
  - **Sass**: For styling the application.
  - **Webpack**: For bundling and managing frontend assets.
  - **Babel**: For transpiling modern JavaScript.
  - **Service Worker**: For enabling offline functionality and caching assets.
- **Backend**: 
  - **Express**: For setting up the server and handling API requests.
  - **dotenv**: For managing environment variables.
  - **cors**: For enabling Cross-Origin Resource Sharing.
- **Testing**: 
  - **Jest**: For unit and integration testing.
  - **Supertest**: For testing HTTP requests.
- **APIs:**
  - **Weatherbit API:** To fetch weather data based on latitude and longitude obtained from the Geonames API.
  - **Pixabay API:** To get images for destinations or countries.
  - **Geonames API:** To retrieve latitude and longitude for locations.
  - 
- **Alerts**: 
  - **SweetAlert2**: For displaying stylish alerts.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HebaHamdan2/travel-planner-app.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
Create a .env file in the root of your project directory with the following content:
   ```bash
     PIXABAY_API_KEY=your_pixabay_key
     WEATHERBIT_API_KEY=your_weatherbit_key
     GEONAMES=your-Geaonnames-username

## Scripts
- Start the Server:
```bash
npm start
```
- Build for Production:
```bash
npm run build-prod
```
- Build for Development:
```bash
npm run build-dev
```
- Run Server-Side Tests:
```bash
npm run test:server
```
- Run Client-Side Tests:
```bash
npm run test:client
```
- Run All Tests:
```bash
npm test
```

