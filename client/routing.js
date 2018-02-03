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

    const communityState = {
      name: 'app.community',
      url: 'community',
      component: 'community'
    };

    const practiceState = {
      name: 'app.interview.practice',
      url: '/practice',
      component: 'practice'
    };

    const mockState = {
      name: 'app.interview.mock',
      url: '/mock',
      component: 'mock'
    };

    $urlRouterProvider.otherwise('/');
    $stateProvider.state(appState);
    $stateProvider.state(logInState);
    $stateProvider.state(interviewState);
    $stateProvider.state(communityState);
    $stateProvider.state(practiceState);
    $stateProvider.state(mockState);
  });

