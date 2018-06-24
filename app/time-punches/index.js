var moduleName = 'TimePunches.TimePunches';

angular
  .module(moduleName, [])
  .service('TimePunchesService', require('./TimePunchesService'));

  module.exports = moduleName;