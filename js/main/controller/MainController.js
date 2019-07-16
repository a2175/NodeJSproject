function MainController(param) {
      var param = param;

      this.getView = function() {
          return openMain();
      }
      
      function openMain() {
        var contents = require(_APP + 'main/view/main');
        return (header() + contents + footer());
      }

      //header
      function header() {
          return require(_APP + 'common/view/header');
      }

      //footer
      function footer() {
          return require(_APP + 'common/view/footer');
      }
}

module.exports = MainController;
