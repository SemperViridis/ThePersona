angular.module('app', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    const states = [
      {
        name: 'app',
        url: '/',
        component: 'app'
      },
      {
        name: 'app.interview',
        url: 'interview',
        component: 'interview'
      },
      {
        name: 'app.interview.practice',
        url: '/practice',
        component: 'practice'
      },
      {
        name: 'app.interview.mock',
        url: '/mock',
        component: 'mock'
      },
      {
        name: 'app.community',
        url: 'community',
        component: 'community'
      },
      {
        name: 'app.user',
        url: '/{ id }',
        component: 'user'
        // NEED TO ADD RESOLVE SERVICE TO RETRIEVE USER ID
      },
      {
        name: 'login',
        url: '/login',
        component: 'login'
      }
    ];

    $urlRouterProvider.otherwise('/');

    states.forEach((state) => {
      $stateProvider.state(state);
    });
  });

