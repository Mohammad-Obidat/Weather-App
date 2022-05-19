class Renderer {
  constructor() {
    this.weatherContainer = $('#weather-container');
    this.weatherTemplateHTML = $('#weather-template').html();
    this.weatherTemplate = Handlebars.compile(this.weatherTemplateHTML);
  }

  renderData(cities) {
    this.weatherContainer.empty();
    const compiledHTML = this.weatherTemplate({ cities });
    this.weatherContainer.html(compiledHTML);
  }
}
