var myApp=angular.module('myApp',['ngRoute','ngSanitize','angular-loading-bar','myAppControllers','myAppServices','myAppDirectives','satellizer','ngCookies']);
myApp.config(['$routeProvider','$authProvider',function($routeProvider,$authProvider){
  $routeProvider.when("/",{templateUrl:"partials/home.html"});
  $routeProvider.when("/xceed",{templateUrl:"partials/xceed.html",controller:"xceedController"});
  $routeProvider.when("/events/:category",{templateUrl:"partials/events.html",controller:"eventsController"});
  $routeProvider.when("/workshops/:category",{templateUrl:"partials/comingsoon.html"});
  $routeProvider.when("/workshops",{templateUrl:"partials/comingsoon.html"});
  $routeProvider.when("/karnival",{templateUrl:"partials/comingsoonk.html"});
  $routeProvider.when("/contacts",{templateUrl:"partials/contacts.html",controller:"contactsController"});
  $routeProvider.when("/hospi",{templateUrl:"partials/hospi.html",controller:"hospiController"});
  $routeProvider.when("/sponsors",{templateUrl:"partials/sponsors.html",controller:"sponsorsController"});
  $routeProvider.when("/sa",{templateUrl:"partials/comingsoonsa.html",controller:"SAInfoController"});
  $routeProvider.when("/sa_register",{
                    templateUrl:"partials/sa.php",controller:"SAController"
                    ,resolve:{
                    "check":function(SAAccessFac,$location){   //function to be resolved, accessFac and $location Injected
                        if(SAAccessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                           
                        }else{
                            $location.path("/sa");                              
                            toastr.clear();
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
                             toastr.error('Please login to use Student Ambassador registration','Warning');
                        }
                      }
                    }
  });
  $routeProvider.when("/gl",{templateUrl:"partials/comingsoongl.html"});
  $routeProvider.when("/about",{templateUrl:"partials/about.html",controller:"aboutController"});
  $routeProvider.when("/loginK",{templateUrl:"partials/loginK.html",controller:"loginKController"});
  $routeProvider.when("/logout",{template:null,controller:"LogoutCtrl"});
  $routeProvider.when("/profile",{templateUrl:"partials/profile.html",controller:"ProfileCtrl"});
  $routeProvider.when("/projects",{templateUrl:"partials/comingsoon.html"});
  $routeProvider.when("/comingsoon",{templateUrl:"partials/comingsoon.html"});
  $routeProvider.otherwise({redirectTo:'/'});
  $authProvider.baseUrl='http://login.kurukshetra.org.in';
  $authProvider.facebook({clientId:'1491975041128547',authorizationEndpoint:'https://www.facebook.com/v2.3/dialog/oauth',redirectUri:(window.location.origin||window.location.protocol+'//'+window.location.host)+'/',requiredUrlParams:['display','scope'],scope:['email'],scopeDelimiter:',',display:'popup',type:'2.0',popupOptions:{width:580,height:400}});$authProvider.google({clientId:'113263203194-cgt8g3gbuqfv8vgfg3smqksqlbt0t7fr.apps.googleusercontent.com'});}]); 
  myApp.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});