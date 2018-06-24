module.exports = function($q, $http, DateService) {
    'njInject';
  
    var self = this;
  
    var timePunchesUrl = 'https://shiftstestapi.firebaseio.com/timePunches.json';

    this.timePunches = {};

    this.isTimePunchValid = function(timePunch) {
      //validates check ins and hourlyWage
      if (timePunch.hourlyWage > 0) {
        var clockedIn = new Date(timePunch.clockedIn);
        var clockedOut = new Date(timePunch.clockedOut);
        
        //In case there is some clockIns later than clocksOut on the same day
        if (clockedIn.getDate() == clockedOut.getDate() && clockedIn < clockedOut) {
          return true;
        }
      }
    };

    this.splitTimePunchesByWeek = function(response) {
      return $q.when(console.log(response));
    };
  
    this.getTimePunches = function() {
      if (!angular.equals(self.timePunches, {})) {
        return $q.when(self.timePunches);
      } else {
        return $http.get(timePunchesUrl).then(function(response) {
          self.timePunches = response.data;
          return $q.when(self.timePunches);
        });
      }
    };
  };