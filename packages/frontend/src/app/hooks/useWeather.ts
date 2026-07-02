import { useState, useEffect } from "react";

export interface WeatherData {
  temp: number;
  isDay: number;
  rain: number;
  showers: number;
  snowfall: number;
  weatherCode: number;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchWeather = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=52.6031&longitude=39.5708&current_weather=true&current=rain,showers,snowfall",
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        
        const data = await response.json();
        if (data?.current_weather && !isCancelled) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            isDay: data.current_weather.is_day,
            rain: data.current?.rain ?? 0,
            showers: data.current?.showers ?? 0,
            snowfall: data.current?.snowfall ?? 0,
            weatherCode: data.current_weather.weathercode ?? 0,
          });
        }
      } catch {
        // if fetch fails, keep default
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 600000);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, []);

  return weather;
}
