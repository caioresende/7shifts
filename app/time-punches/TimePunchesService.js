module.exports = function($q, $http, LocationsService) {
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

    this.splitTimePunchesByDay = function(timePunches) {
      var days = {};
      var keys = Object.keys(timePunches);
      var clockedInDay = "";
      var overTimeMultiplier = LocationsService.currentLocation.labourSettings.dailyOvertimeMultiplier;

      for (var i = 0; i < keys.length; i++) {
        if (timePunches[keys[i]].clockedIn.getDate() === timePunches[keys[i]].clockedOut.getDate()) {
          clockedInDay = timePunches[keys[i]].clockedIn.getDate() + "-" + timePunches[keys[i]].clockedIn.getMonth();
          if (days[clockedInDay] && days[clockedInDay].workedHours) {
            days[clockedInDay].hours = days[clockedInDay].hours + parseFloat((((timePunches[keys[i]].clockedOut - timePunches[keys[i]].clockedIn) / 3600000)).toFixed(2));
          } else {
            days[clockedInDay] = {};
            days[clockedInDay]['hours'] = parseFloat(((timePunches[keys[i]].clockedOut - timePunches[keys[i]].clockedIn) / 3600000).toFixed(2));
          }

          if (days[clockedInDay].hours > 8 && days[clockedInDay].overTime) {
            days[clockedInDay].overTime = parseFloat((days[clockedInDay].overTime + (days[clockedInDay].hours - 8)).toFixed(2)); 
            days[clockedInDay].hours = 8;
          } else if (days[clockedInDay].hours > 8) {
            days[clockedInDay]['overTime'] = parseFloat((days[clockedInDay].hours - 8).toFixed(2)); 
            days[clockedInDay].hours = 8;
          }

          days[clockedInDay]['paidHours'] = parseFloat((days[clockedInDay].hours * timePunches[keys[i]].hourlyWage).toFixed(2));

          if (days[clockedInDay].overTime) {
            days[clockedInDay]['paidOverTime'] = parseFloat((days[clockedInDay].overTime + (timePunches[keys[i]].hourlyWage * overTimeMultiplier)).toFixed(2));
          }
        }
      }

      return days;
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