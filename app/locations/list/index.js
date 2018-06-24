var moduleName = 'TimePunches.Locations.List';

angular
  .module(moduleName, [require('angular-material-data-table')])
  .controller('LocationController', require('./LocationController'))
  .service('LocationsService', require('./LocationsService'));

  module.exports = moduleName;