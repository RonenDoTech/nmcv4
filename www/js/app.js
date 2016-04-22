// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var k='nmcAppKey';
angular.module('starter', ['ionic', 'starter.controllers','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.news', {
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl'
      }
    }
  })

   .state('app.newsPost', {
    url: '/news/:PostId',
    views: {
      'menuContent': {
        templateUrl: 'templates/newsPost.html',
        controller: 'newsPostCtrl'
      }
    }
  })

  .state('app.mvtsaim', {
    url: '/mvtsaim',
    views: {
      'menuContent': {
        templateUrl: 'templates/mvtsaim.html',
        controller: 'mvtsaimCtrl'
      }
    }
  })

  .state('app.services', {
      url: '/services',
      views: {
        'menuContent': {
          templateUrl: 'templates/services.html',
          controller: 'servicesCtrl'
        }
      }
    })
    .state('app.mainApp', {
      url: '/mainApp',
      views: {
        'menuContent': {
          templateUrl: 'templates/mainApp.html',
          controller: 'mainAppCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.googlelogin', {
      url: '/googlelogin',
      views: {
        'menuContent': {
          templateUrl: 'templates/googleLogin.html',
          controller: 'googleloginController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/mainApp');
});
