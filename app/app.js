require('angular');

angular.module('TimePunches', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-messages'),
  require('angular-material'),
  require('@uirouter/angularjs').default,
  require('./core'),
  require('./locations'),
  require('./time-punches'),
  require('./users')
])

.config(require('./routes'))
.config(require('./config'));