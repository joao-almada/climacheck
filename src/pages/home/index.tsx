import { useEffect, useState } from 'react';
import styles from './home.module.css';

interface TempProps {
  name?: string;
  weather?: string;
  description?: string;
  temp?: string;
  temp_max?: string;
  temp_min?: string;
  feels_like?: string;
  speed?: string;
  main?: string;
  humidity?: string;
  icon?: string;
}

interface ForecastProps {
  date: string;
  temp: string;
  icon: string;
  description: string;
}




export function Home() {
  const [input, setInput] = useState('São Paulo');
  const [temp, setTemp] = useState<TempProps>({});
  const [forecast, setForecast] = useState<ForecastProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather();
    setInput('');
    setLoading(false);
  }, []);

  async function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=pt_br&units=metric&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const tempData: TempProps = {
          name: data.name,
          temp: data.main.temp.toFixed(1),
          feels_like: data.main.feels_like.toFixed(1),
          temp_max: data.main.temp_max.toFixed(1),
          temp_min: data.main.temp_min.toFixed(1),
          humidity: data.main.humidity.toString(),
          speed: data.wind.speed,
          weather: data.weather[0]?.main,
          description: data.weather[0]?.description,
          main: data.weather[0]?.main,
          icon: data.weather[0]?.icon
        };
        setTemp(tempData);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&lang=pt_br&units=metric&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const forecastData: ForecastProps[] = data.list
          .filter((entry: any) => entry.dt_txt.includes('12:00:00'))
          .map((entry: any) => ({
            date: new Date(entry.dt_txt).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }),
            temp: entry.main.temp.toFixed(1),
            icon: entry.weather[0].icon,
            description: entry.weather[0].description
          }));
        setForecast(forecastData);
      })
      .catch((error) => {
        console.error('Erro ao buscar previsão:', error);
      });
  }

  if (loading) {
    return (
      <div className={styles.container2}>
        <h4 className={styles.center}>Carregando detalhes...</h4>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Digite o nome da cidade..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={getWeather}>
          Buscar
        </button>
      </div>

      {temp.name && (
        <div className={styles.temp}>
          <h1>{temp.name}</h1>
          <div className={styles.img}>
            <img src={`http://openweathermap.org/img/wn/${temp.icon}.png`} alt={temp.description} />
            <h1>{temp.temp}°C</h1>
          </div>
          <h2>{temp.description}</h2>
          <div className={styles.main}>
            <h3>Sensação: {temp.feels_like}°C</h3>
            <h3>Umidade: {temp.humidity}%</h3>
            <h3>Vento: {temp.speed}km/h</h3>
          </div>
        </div>
      )}

      <div className={styles.days}>
        <div className={styles.days_title}>
          <h4>Previsão para 5 dias</h4>
        </div>
        <div className={styles.forecast}>
          {forecast.map((day, index) => (
            <div key={index} className={styles.day}>
              <h5>{day.date}</h5>
              <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} />
              <h3>{day.temp}°C</h3>
              <p>{day.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
