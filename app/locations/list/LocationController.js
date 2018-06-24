module.exports = function($q, LocationsService, UsersService, TimePunchesService) {

    'ngInject';

    var self = this;

    self.users = {};
    self.currentLocation = {}

    var getUsers = function() {
        return UsersService.getUsers(self.currentLocation.id).then(function(response) {
            self.users = response;
            return $q.when(self.users);
        });
    };

    var getCurentLocation = function() {
        var locationId = '25753';

        return LocationsService.getCurrentLocation(locationId).then(function(response) {
            self.currentLocation = response;
            return $q.when(self.currentLocation);
        });
    };

    getCurentLocation().then(function() {
        getUsers().then(function() {
            UsersService.getUserEarnings().then(function(response) {
                self.users = response;
            });
        });
    });  
};