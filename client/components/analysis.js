angular.module('app')
  .component('analysis', {
    bindings: {
      results: '<',
      fillers: '<',
      total: '<'
    },
    templateUrl: 'templates/analysis.html'
  });


// angular = {
//   module: {
//     component: {
//       'app.home': {
//         services: {

//         },
//         component: {
//           home:
//           groupCard:
//           imagesSearch:
//         }
//       },
//       'app.login': {
//         componet:
//       }
//     },
//     service: {
//       GroupService:
//     }

//   }
// }



// angular: {
//   module: {
//     'app': {
//       controller: {
//         'AppCtrl':
//         'speechController'
//       }
//       component: {
//         'app': {
//           controller: 'AppCrtl',
//           templateUrl: '...'
//         },
//         'speech': {
//           bindings: {},
//           controller: 'speechController',
//           templateUrl: '...'
//         }
//       }
//     }
//   }
// }