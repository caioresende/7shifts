module.exports = function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    'ngInject';
  
    $urlMatcherFactoryProvider.strictMode(false);
  
    $urlRouterProvider
      .when('/', '');
  
    $stateProvider
      .state('home', {
        url: '',
        views: {
          'manager@': {
            template: require('./locations/list/location.html'),
            controller: 'LocationController as location'
          }
        }
      })
  };