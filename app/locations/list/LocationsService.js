module.exports = function($q, $http) {
  'njInject';

  var self = this;

  var companyUrl = 'https://shiftstestapi.firebaseio.com/locations.json';

  this.getCompanies = function() {
    return $http.get(companyUrl).then(function(response) {
      return $q.when(response);
    });
  };

  this.getCompanies().then(function(response) {
      console.log(response);
  });
};