module.exports = function($q, $http, TimePunchesService) {
    'njInject';
  
    var self = this;
  
    var companyUrl = 'https://shiftstestapi.firebaseio.com/users.json';
  
    this.getUsers = function(locationId) {
      return $http.get(companyUrl).then(function(response) {
          self.users = response.data;
        return $q.when(self.users[locationId]);
      });
    };

    this.getUserEarnings = function() {
        return getTimePunchesByUsers().then(function(response) {
            TimePunchesService.splitTimePunchesByWeek(response);
        });
    };

    getTimePunchesByUsers = function() {
        var timePunchesByUsers = {};
        
        return TimePunchesService.getTimePunches().then(function(response) {
            var timePunches = response;
            var keys = Object.keys(timePunches);

            for(var i = 0; i < keys.length; i++) {
                if (TimePunchesService.isTimePunchValid(timePunches[keys[i]])) {
                    if (timePunchesByUsers[timePunches[keys[i]].userId]) {
                        timePunchesByUsers[timePunches[keys[i]].userId][keys[i]] = timePunches[keys[i]];
                    } else {
                        timePunchesByUsers[timePunches[keys[i]].userId] = {};
                        timePunchesByUsers[timePunches[keys[i]].userId][keys[i]] = timePunches[keys[i]];
                    }

                    timePunchesByUsers[timePunches[keys[i]].userId][keys[i]].clockedIn = new Date(timePunches[keys[i]].clockedIn);
                    timePunchesByUsers[timePunches[keys[i]].userId][keys[i]].clockedOut = new Date(timePunches[keys[i]].clockedOut);
                }
            }
            return $q.when(timePunchesByUsers);
        });
    };
  };