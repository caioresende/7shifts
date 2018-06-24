module.exports = function($q, $http) {
  'njInject';

  var self = this;

  var companyUrl = 'https://shiftstestapi.firebaseio.com/locations.json';

  self.locations = {};

  this.getLocations = function() {
    return $http.get(companyUrl).then(function(response) {
        self.locations = response.data;
        return $q.when(self.locations);
    });
  };

  this.getCurrentLocation = function(id) {
      if (!angular.equals(self.locations, {})) {
        self.currentLocation = self.locations[id];
        return $q.when(self.currentLocation);
        
      } else {
        return self.getLocations().then(function(response) {
            self.currentLocation = self.locations[id];
            return $q.when(response[id]);
        });
      } 
  };
};