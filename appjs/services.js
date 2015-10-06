// 'use strict';
// /* Services */
// // Demonstrate how to register services
// // In this case it is a simple value service.
// angular.module('myAppServices', ['angular-loading-bar']).factory('getService',function($http){
//           var challengeService = {};
//          //updates
//           challengeService.updates = function(){
//                         return $http({
//                           method: 'GET',
//                           url: 'http://cms.kurukshetra.org.in/updates.json'
                          
//           });
//          };
//          //eventcats
//           challengeService.eventCats = function(eventcat){
//                         return $http({
//                           method: 'GET',
//                           url: 'http://cms.kurukshetra.org.in/'+eventcat+'.json'
                          
//           });
//          };
//          //eventnames
//           challengeService.eventTabs = function(eventcat,eventname){
//                         return $http({
//                           method: 'GET',
//                           url: 'http://cms.kurukshetra.org.in/'eventcat+'/'+eventname+'.json'
//           });
//          };

//          return challengeService;
//         });z

var myApp = angular.module("myAppServices",[]);

myApp.factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('http://localhost:3000/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('http://localhost:3000/api/me', profileData);
      },
      getKidandName: function() {
        return $http.get('http://localhost:3000/api/id');
      }
    };

  });