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
      name: 'app.interview',
      url: 'interview',
      component: 'interview'
    };

    $urlRouterProvider.otherwise('/');
    $stateProvider.state(appState);
    $stateProvider.state(logInState);
    $stateProvider.state(interviewState);
  });

