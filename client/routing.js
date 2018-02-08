angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    const states = [
      {
        name: 'app',
        url: '/',
        component: 'app'
      },
      {
        name: 'app.home',
        url: 'home',
        component: 'home'
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
        name: 'app.interview.results',
        url: '/results',
        component: 'results'
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
        // NEED TO ADD SERVICE TO RETRIEVE USER ID
        // resolve: (UserService) => {
        // return PeopleService.getUser();
        // }
      },
      {
        name: 'app.analysis',
        url: 'analysis',
        component: 'analysis'
      },
      {
        name: 'logout',
        url: '/logout',
        component: 'logout'
      }
    ];

    $urlRouterProvider.otherwise('/');

    states.forEach((state) => {
      $stateProvider.state(state);
    });
  });
