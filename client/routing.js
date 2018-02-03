angular.module('app', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    const appState = {
      name: 'app',
      url: '/',
      component: 'app'
    };

    const logInState = {
      name: 'login',
      url: '/login',
      component: 'login'
    };

    const interviewState = {
      name: 'interview',
      url: '/interview',
      views: {
        '': { templateUrl: 'templates/interview.html' },
        prompts: {
          templateUrl: 'templates/prompts.html',
          controller: 'Appctrl'
        }
      }
    };

    $urlRouterProvider.otherwise('/');
    $stateProvider.state(appState);
    $stateProvider.state(logInState);
    $stateProvider.state(interviewState);
  });

