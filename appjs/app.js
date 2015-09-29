var myApp = angular.module("myApp",['ngRoute','ngSanitize','ngAnimate','duScroll','myAppDirectives']);



myApp.config(['$routeProvider', function($routeProvider) {
                $routeProvider.when("/", {templateUrl: "partials/home.html"});
                $routeProvider.when("/xceed", {templateUrl: "partials/xceed.html", controller: "xceedController"});
                $routeProvider.when("/events/:category", {templateUrl: "partials/events.html", controller: "eventsController"});
                $routeProvider.when("/workshops/:category", {templateUrl: "partials/wkshops.html", controller: "wkshopsController"});
                $routeProvider.when("/karnival", {templateUrl: "partials/karnival.html", controller: "karnivalController"});
                $routeProvider.when("/contacts", {templateUrl: "partials/contacts.html", controller: "contactsController"});
                $routeProvider.when("/hospi", {templateUrl: "partials/hospi.html", controller: "hospiController"});
                $routeProvider.when("/sponsors", {templateUrl: "partials/sponsors.html", controller:"sponsorsController"});
                $routeProvider.when("/gl", {templateUrl: "partials/gl.html", controller:"glController"});
                $routeProvider.when("/about", {templateUrl: "partials/about.html",controller:"aboutController"});
                $routeProvider.when("/loginK", {templateUrl: "partials/loginK.html",controller:"loginKController"});
                $routeProvider.otherwise({redirectTo: '/'});
                }]);
