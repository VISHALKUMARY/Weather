const apiKey = '86cb66b80ef14fbeaedddba0218b72d5';


const getWeather = async (city) => {
  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    return {
      current: currentData,
      forecast: forecastData
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
};

export default getWeather;
