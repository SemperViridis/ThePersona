angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    const appState = {
      name: 'app',
      url: '/',
      component: 'app'
    };

    const homeState = {
      name: 'home',
      url: '/home',
      component: 'home'
    };

    $urlRouterProvider.otherwise('/');
    $stateProvider.state(appState);
    $stateProvider.state(homeState);
  });

