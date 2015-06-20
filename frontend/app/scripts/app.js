'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('edinbrosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    // Define the states (routes)
    $stateProvider
      .state('overview', {
        url: '/',
        templateUrl: 'views/layouts/main.html'
      })
      .state('overview.home', {
        url: '/',
        templateUrl: 'views/pages/main.html',
        controller: 'MainCtrl'
      })
      .state('overview.about', {
        url: '/about',
        templateUrl: 'views/pages/about.html',
        controller: 'AboutCtrl'
      });

  });
