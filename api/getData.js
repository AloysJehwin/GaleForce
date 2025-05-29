// api/getData.js

export const getData = async () => {
  try {
    const response = await fetch('https://p0ul64xxyc.execute-api.us-east-1.amazonaws.com/latest');
    const data = await response.json();

    const readings = data.data; // Accessing nested 'data' object

    return {
      windSpeed: readings.wind_speed,
      windDirection: readings.wind_direction,
      rpm: readings.rpm,
      powerOutput: readings.power_output,
      temperature: readings.temperature,
      vibration: readings.vibration,
      faultLog: readings.fault_log,
    };
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    return null;
  }
};
