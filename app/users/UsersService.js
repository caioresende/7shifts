module.exports = function($q, $http) {
    'njInject';
  
    var self = this;
  
    var companyUrl = 'https://shiftstestapi.firebaseio.com/users.json';
  
    this.getUsers = function() {
      return $http.get(companyUrl).then(function(response) {
        return $q.when(response);
      });
    };
  
    this.getUsers().then(function(response) {
        console.log(response);
    });
  };