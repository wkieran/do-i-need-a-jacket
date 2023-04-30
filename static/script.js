const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');
const errorDiv = document.querySelector('#error');
const tempDiv = document.querySelector('#temp');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('Form submitted!');
  const city = document.querySelector('#city').value;
  const url = `/weather?city=${city}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const temperature = data.temperature;
    tempDiv.innerText = `Current temperature in ${city}: ${temperature}°F`;
    errorDiv.innerText = '';
    if(temperature > 55){
      resultDiv.innerText = "No, you're good without one!"
    }else if(temperature >= 45){
      resultDiv.innerText = "I mean, it wouldn't sure to grab one."
    }
    else{
      resultDiv.innerText = "Yes, don't forget a jacket."
    }
  } else if (response.status === 400) {
    resultDiv.innerText = '';
    tempDiv.innerText = '';
    errorDiv.innerText = 'Error: Please enter a city name';
  } else if (response.status === 404) {
    resultDiv.innerText = '';
    tempDiv.innerText = '';
    errorDiv.innerText = 'Error: City not found';
  } else {
    resultDiv.innerText = '';
    tempDiv.innerText = '';
    errorDiv.innerText = 'An unknown error occurred';
  }
});
