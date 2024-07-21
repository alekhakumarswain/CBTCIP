const api='';
const lat=19.979449;
const lon=75.3295;

url='https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

url=url.replace('{lat}',lat);
url=url.replace('{lon}',lon);
url=url.replace('{API key}',api);

fetch(url)
.then(response => response.json())
.then(data => console.log(data));

