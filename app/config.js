module.exports = function($mdThemingProvider) {

    'ngInject';
  
    $mdThemingProvider
      .theme('default')
      .primaryPalette('orange')
      .accentPalette('blue-grey');
  
    $mdThemingProvider.alwaysWatchTheme(true);

};