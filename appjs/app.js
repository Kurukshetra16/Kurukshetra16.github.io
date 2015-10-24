var myApp = angular.module('myApp',['ngRoute','ngSanitize','angular-loading-bar','myAppControllers','myAppServices','myAppDirectives', 'satellizer']);
myApp.config(['$routeProvider','$authProvider', function($routeProvider, $authProvider) {
                $routeProvider.when("/", {templateUrl: "partials/home.html"});
                $routeProvider.when("/xceed", {templateUrl: "partials/xceed.html", controller: "xceedController"});
                $routeProvider.when("/events/:category", {templateUrl: "partials/events.html", controller: "eventsController"});
                $routeProvider.when("/workshops/:category", {templateUrl: "partials/comingsoon.html"/*, controller: "wkshopsController"*/});
                $routeProvider.when("/karnival", {templateUrl: "partials/comingsoon.html"/*, controller: "karnivalController"*/});
                $routeProvider.when("/contacts", {templateUrl: "partials/contacts.html", controller: "contactsController"});
                $routeProvider.when("/hospi", {templateUrl: "partials/hospi.html", controller: "hospiController"});
                $routeProvider.when("/sponsors", {templateUrl: "partials/comingsoon.html"/*, controller:"sponsorsController"*/});
                $routeProvider.when("/gl", {templateUrl: "partials/comingsoon.html"/*, controller:"glController"*/});
                $routeProvider.when("/about", {templateUrl: "partials/about.html",controller:"aboutController"});
                $routeProvider.when("/loginK", {templateUrl: "partials/loginK.html",controller:"loginKController"});
                $routeProvider.when("/logout", {template: null,controller:"LogoutCtrl"});
                $routeProvider.when("/profile", {templateUrl: "partials/profile.html",controller:"updateController"});
                $routeProvider.when("/projects", {templateUrl: "partials/projects.html",controller:"projectsController"});
                $routeProvider.otherwise({redirectTo: '/'});


             
            $authProvider.baseUrl = 'http://localhost:3000';
            $authProvider.facebook({
                clientId: '1491975041128547',
                authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
                redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                type: '2.0',
                popupOptions: { width: 580, height: 400 }

            });
            $authProvider.google({
              clientId: '113263203194-cgt8g3gbuqfv8vgfg3smqksqlbt0t7fr.apps.googleusercontent.com'
            });
               
}]);
