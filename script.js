const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.querySelector('#city').value;
  const url = `/weather?city=${city}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const temperature = data.temperature;
    resultDiv.innerText = `Current temperature in ${city}: ${temperature}°F`;
  } else if (response.status === 400) {
    resultDiv.innerText = 'Error: Please enter a city name';
  } else if (response.status === 404) {
    resultDiv.innerText = 'Error: City not found';
  } else {
    resultDiv.innerText = 'An unknown error occurred';
  }
});
