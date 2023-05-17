const form = document.querySelector('form');
const input = document.querySelector('input');
const weatherDiv = document.querySelector('#weather');
const body = document.querySelector('body');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value;
  const apiKey = '12345';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const description = data.weather[0].description;

      if (description.includes('sol')) {
        body.classList.remove('winter');
        body.classList.add('summer');
      } else if (description.includes('nublado')) {
        body.classList.remove('summer');
        body.classList.add('winter');
      } else {
        body.classList.remove('summer', 'winter');
      }

      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const cityName = data.name;

      weatherDiv.innerHTML = `
        <h2>${cityName}</h2>
        <p>Descrição: ${description}</p>
        <p>Temperatura: ${temperature}°C</p>
        <p>Sensação térmica: ${feelsLike}°C</p>
        <p>Umidade: ${humidity}%</p>
        <p>Velocidade do vento: ${windSpeed}m/s</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>Não foi possível obter a previsão do tempo para ${city}.</p>`;
    });
});
