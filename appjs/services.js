/*
'use strict';


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myAppServices', []).
  factory('getService',function($http){
	  
	  var challengeService = {};

	  
	  challengeService.newsTitle = function(){
		  
		  return $http({
	
		  method: 'GET',
		  url: 'http://techteam.kurukshetra.org.in/ktask/news.json'
		  
	  });
		  
	  }
	  return challengeService;
	 });
*/