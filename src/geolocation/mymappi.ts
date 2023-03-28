const baseURL = 'https://api.mymappi.com'
const apiKey = '2c3994df-7539-4d13-9b71-8497bf1f9ba1'

async function getLocationData(location : string) {
  try {
    const response = await fetch(`${baseURL}/location?q=${location}&key=${apiKey}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

getLocationData('San Francisco');


