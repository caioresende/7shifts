var moduleName = 'TimePunches.Users';

angular
  .module(moduleName, [])
  .service('UsersService', require('./UsersService'));

  module.exports = moduleName;