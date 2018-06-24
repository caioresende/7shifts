var moduleName = 'TimePunches.Locations.List';

angular
  .module(moduleName, [])
  .controller('LocationController', require('./LocationController'))
  .service('LocationsService', require('./LocationsService'));

  module.exports = moduleName;