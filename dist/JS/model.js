const toastify = new ToastifyManager();

class citiesManager {
  constructor() {
    this.citiesData = [];
  }

  async getDataFromDB() {
    try {
      let cities = await axios.get('/cities');
      this.citiesData = cities.data;
    } catch (err) {
      this.citiesData = [];
    }
  }

  async getCityData(cityName) {
    try {
      let city = await axios.get(`/city/${cityName}`);
      this.citiesData.push(city.data);
    } catch (error) {
      toastify.alertToastify(`${cityName} doesn't exist`);
    }
  }

  async saveCity(cityName) {
    try {
      console.log(cityName);
      let cityToSave = this.citiesData.find((c) => c.name === cityName);
      await axios.post('/city', cityToSave);
      toastify.alertToastify(`${cityName} added successfully`);
    } catch (error) {
      toastify.alertToastify(`failed to save the city`);
    }
  }
  async removeCity(cityName) {
    try {
      await axios.delete(`/city/${cityName}`);
      let cityToDelete = this.citiesData.find((c) => c.name === cityName);
      let index = this.citiesData.indexOf(cityToDelete);
      this.citiesData.splice(index, 1);
      toastify.alertToastify(`${cityName} removed successfully`);
    } catch (error) {
      toastify.alertToastify(`Oops, you can't delete this city`);
    }
  }
}
