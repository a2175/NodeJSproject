class MainController {
  constructor(request, response, param) {
    this.param = param;
    this.request = request;
    this.response = response;
  }

  respondView() {
    this.response.render(_VIEW + 'main/main');
  }
}

module.exports = MainController;
