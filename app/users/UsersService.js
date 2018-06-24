module.exports = function($q, $http, TimePunchesService) {
    'njInject';
  
    var self = this;
  
    var companyUrl = 'https://shiftstestapi.firebaseio.com/users.json';

    var sumPaidHours = function(hours, userId) {

        var keys = Object.keys(hours);

        self.users[userId]['totalOvertimeHours'] = 0;
        self.users[userId]['totalWorkingHours'] = 0;
        self.users[userId]['totalPaidOvertimeHours'] = 0;
        self.users[userId]['totalPaidWorkingHours'] = 0;

        for (var i = 0; i < keys.length; i++) {
            self.users[userId].totalWorkingHours = parseFloat((self.users[userId].totalWorkingHours + hours[keys[i]].hours).toFixed(2));
            self.users[userId].totalPaidWorkingHours = parseFloat((self.users[userId].totalPaidWorkingHours + hours[keys[i]].paidHours).toFixed(2));

            if (hours[keys[i]].overTime) {
                self.users[userId].totalOvertimeHours =  parseFloat((self.users[userId].totalOvertimeHours + hours[keys[i]].overTime).toFixed(2));
                self.users[userId].totalPaidOvertimeHours =  parseFloat((self.users[userId].totalPaidOvertimeHours + hours[keys[i]].paidOverTime).toFixed(2));
            }
        }
    };
  
    this.getUsers = function(locationId) {
      return $http.get(companyUrl).then(function(response) {
          self.users = response.data[locationId];
        return $q.when(self.users);
      });
    };

    this.getUserEarnings = function() {
        getTimePunchesByUsers().then(function(response) {
            var keys = Object.keys(response);

            for (var i = 0; i < keys.length; i++) {
                self.users[keys[i]]['days'] = TimePunchesService.splitTimePunchesByDay(response[keys[i]]);
                sumPaidHours(self.users[keys[i]].days, keys[i]);
            }

            return $q.when(self.users);
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