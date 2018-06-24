module.exports = function($mdThemingProvider) {

    'ngInject';
  
    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('amber');
  
    $mdThemingProvider.alwaysWatchTheme(true);

};