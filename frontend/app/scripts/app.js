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
    'ui.router',
    'satellizer',
    'ngMaterial'
  ])
    .constant('urls', {
        API: 'http://localhost:3000/api'
    })
    .config(function($authProvider, urls) {
        $authProvider.baseUrl = urls.API;
        $authProvider.loginRedirect = '/';
        $authProvider.logoutRedirect = '/login/';
        $authProvider.signupRedirect = '/';
        $authProvider.loginUrl = '/user/login';
        $authProvider.signupUrl = '/user/signup';
    })
  .config(function ($urlRouterProvider, $stateProvider, $authProvider) {
    $authProvider.facebook({
        //url: 'https://localhost:9000/auth/facebook',
        clientId: '859012174170344'
    });

    $urlRouterProvider.otherwise('/');

    // Define the states (routes)
    $stateProvider
      .state('overview', {
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
      })
        .state('task', {
            url: '/request/:id',
            templateUrl: 'views/pages/request.html',
            controller: 'RequestCtrl'
        })
        .state('login', {
            url: '/login/',
            templateUrl: 'views/pages/login.html',
            controller: 'LoginCtrl'
        });

  });
