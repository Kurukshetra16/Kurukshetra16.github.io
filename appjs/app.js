var myApp = angular.module("myApp",['ngRoute','ngSanitize','ngAnimate','myAppDirectives','wu.masonry']);



myApp.config(['$routeProvider', function($routeProvider) {
                $routeProvider.when("/", {templateUrl: "partials/events.html"});
                $routeProvider.when("/xceed", {templateUrl: "partials/xceed.html", controller: "xceedController"});
                $routeProvider.when("/events", {templateUrl: "partials/events.html", controller: "eventsController"});
                $routeProvider.when("/depts/:dept_id", {templateUrl: "partials/deptview.html", controller: "deptsController"});
                $routeProvider.when("/workshops", {templateUrl: "partials/workshops.html", controller: "workshopsController"});
                $routeProvider.when("/karnival", {templateUrl: "partials/karnival.html", controller: "karnivalController"});
                $routeProvider.when("/contacts", {templateUrl: "partials/contacts.html", controller: "contactsController"});
                $routeProvider.when("/hospi", {templateUrl: "partials/hospi.html", controller: "hospiController"});
                $routeProvider.when("/sponsors", {templateUrl: "partials/sponsors.html", controller:"sponsorsController"});
                $routeProvider.when("/gl", {templateUrl: "partials/gl.html", controller:"glController"});
                $routeProvider.when("/about", {templateUrl: "partials/about.html",controller:"aboutController"});
                $routeProvider.otherwise({redirectTo: '/'});
                }]);
