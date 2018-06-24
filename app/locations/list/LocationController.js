module.exports = function($q, LocationsService, UsersService, TimePunchesService) {

    'ngInject';

    var self = this;

    self.users = {};
    self.currentLocation = {}

    var getUsers = function() {
        console.log(self.currentLocation);
        UsersService.getUsers(self.currentLocation.id).then(function(response) {
            console.log(response);
            self.users = response;
            return $q.when(self.users);
        });
    };

    var getCurentLocation = function() {
        var locationId = '25753';

        return LocationsService.getCurrentLocation(locationId).then(function(response) {
            console.log(response);
            self.currentLocation = response;
            return $q.when(self.currentLocation);
        });
    };

    self.getUsers = function() {
        UsersService.getUsers().then(function(response) {
            console.log(response);
            self.users = response;
            return $q.when(self.users);
        });
    };

    getCurentLocation().then(function() {
        getUsers();
    });
    
  
};