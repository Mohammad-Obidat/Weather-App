const citiesWeather = new citiesManager();
const renderer = new Renderer();

const saveIcon = () => {
  $('#weather-container').on('click', '.addIcon', async function () {
    let cityName = $(this).closest('.displayCity').find('.name').text();
    await citiesWeather.saveCity(cityName);
  });
};

const removeIcon = () => {
  $('#weather-container').on('click', '.removeIcon', async function () {
    let cityName = $(this).closest('.displayCity').find('.name').text();
    await citiesWeather.removeCity(cityName);
    renderer.renderData(citiesWeather.citiesData);
  });
};

window.addEventListener('DOMContentLoaded', async () => {
  await citiesWeather.getDataFromDB();
  renderer.renderData(citiesWeather.citiesData);
  saveIcon();
  removeIcon();
});

const handleSearch = async () => {
  let cityName = $('#city-input').val();
  await citiesWeather.getCityData(cityName);
  renderer.renderData(citiesWeather.citiesData);
  $('#city-input').val('');
};

$('#searchBtn').on('click', handleSearch);
