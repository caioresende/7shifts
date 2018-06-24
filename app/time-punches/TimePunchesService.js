module.exports = function($q, $http) {
    'njInject';
  
    var self = this;
  
    var companyUrl = 'https://shiftstestapi.firebaseio.com/timePunches.json';
  
    this.getTimePunches = function() {
      return $http.get(companyUrl).then(function(response) {
        return $q.when(response);
      });
    };
  
    this.getTimePunches().then(function(response) {
        console.log(response);
    });
  };