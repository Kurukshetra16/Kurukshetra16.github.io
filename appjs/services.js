var myApp = angular.module("myAppServices",[]);

myApp.factory('Account', function($http) {
    return {
      getProfile: function() {
     //   var response =  $http.get('http://localhost:3000/api/me');
        var response =  $http.get('http://login.kurukshetra.org.in/api/me');
        console.log(response);
        return response;
      },
      updateProfile: function(profileData) {
        //return $http.put('http://localhost:3000/api/me', profileData);
        return $http.put('http://login.kurukshetra.org.in/api/me', profileData);
      },
      registerSa: function(saDetails) {
        return $http.put('http://login.kurukshetra.org.in/api/sa', saDetails);
      },
      getKidandName: function() {
        return $http.get('http://login.kurukshetra.org.in/api/id');
      }
    };

  });
  myApp.factory('SAAccessFac',function(){
    var obj = {}
    this.access = false;
    obj.getPermission = function(){    //set the permission to true
console.log("SA Permission Grant");
        this.access = true;
    }

    obj.removePermission = function(){    //set the permission to false
        this.access = false;
console.log("SA Permission Removed");
    }
    obj.checkPermission = function(){
        return this.access;             //returns the users permission level
    }
    return obj;
});