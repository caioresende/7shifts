require('angular');

angular.module('TimePunches', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-messages'),
  require('angular-material'),
  require('@uirouter/angularjs').default,
  require('./core'),
  require('./locations')
])

.config(require('./routes'))