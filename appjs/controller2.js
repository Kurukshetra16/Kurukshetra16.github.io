var myApp = angular.module("myApp",['ngRoute','ngSanitize']);



myApp.config(['$routeProvider', function($routeProvider) {
				$routeProvider.when("/", {templateUrl: "partials/home2.html"});
				$routeProvider.when("/allnews", {templateUrl: "partials/allnews.html", controller: "newsController"});
				$routeProvider.when("/projstry", {templateUrl: "partials/projstry.html", controller: "projectController"});
				$routeProvider.when("/depts/:dept_id", {templateUrl: "partials/deptview.html", controller: "deptsController"});
				$routeProvider.when("/allblogs", {templateUrl: "partials/allblogs.html", controller: "blogController"});
				$routeProvider.when("/faculty", {templateUrl: "partials/faculty.html", controller: "deptsController"});
				$routeProvider.when("/clubs", {templateUrl: "partials/clubs.html", controller: "linksController"});
				$routeProvider.when("/courses", {templateUrl: "partials/courses.html", controller: "coursesController"});
				$routeProvider.otherwise({redirectTo: '/'});
				}]);


myApp.controller('newsController',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location){

				$scope.depts = [];

$scope.alive='hidden';
$scope.depname="";


$http.get('js/departments.json').success(function (data){
		$scope.depts = data;
		console.log("hello depts");
console.log($scope.depts);
		}); 
				//get dept id
			$scope.department_id="";
if($routeParams.dept_id)
{
$scope.department_id = $routeParams.dept_id;
console.log($scope.department_id);
}

if($scope.department_id)
{
				$http.get('js/departments.json').success(function (data){
						$scope.depts = data;
						console.log("hello depts");
for(k=0;k<$scope.depts.length;k++)
{
if($scope.depts[k]['id']==$scope.department_id)
{
$scope.depname = $scope.depts[k]['name']; 
$scope.about = $scope.depts[k]['about'];
$scope.cname = $scope.depts[k]['contact_name'];
$scope.cmail = $scope.depts[k]['contact_email'];
$scope.cno = $scope.depts[k]['contact_phone'];

}
}
						}); 
					
}


$scope.getfac = function(dname){


console.log("hello in getfac dname"+dname);
$http.get('js/faculty.json').success(function (data){
var faculty = data;
var depid="";
$scope.facs = [];
$http.get('js/departments.json').success(function (data){
 var depts = data;
for(i=0;i<depts.length;i++)
{
if(depts[i]['name']==dname)
{
console.log("found it! "+depts[i]['name']+depts[i]['id']);
depid= depts[i]['id'];
}
}

console.log("pah depid: "+depid+" fac len: "+faculty.length);

for(i=0;i<faculty.length;i++)
{
if(faculty[i]['dept_id'] == depid)
{
console.log("pushing fac: "+faculty[i])
$scope.facs.push(faculty[i]);
}
}
$scope.title = dname;
if($scope.facs.length==0)
{

$scope.n="";
$scope.d="";
$scope.e="";
$scope.alive='hidden';
}
else
{
$scope.alive="visible";
$scope.n="NAME";
$scope.d="DESIGNATION";
$scope.e="EMAIL";
}
});
}); 
};
}]);



myApp.controller('navController',['$scope',function($scope){

				$scope.data="hello";
				$scope.navItems = [

				{ name: 'RESEARCH',
linkTo: '#/research',
titbit: 'Explore Our Research Center'

},{ name: 'DEPARTMENTS',
linkTo: '#/depts',
titbit: 'Check out the Departments at CEG'
},
{
name: 'COURSES',
linkTo: '#/courses',
titbit: 'All The Courses offered at CEG'
},
{
name:'ADMISSION',
linkTo:'#/admissions',
titbit: 'All You Need to Know about Admissions to CEG'
},
{
name:'FACULTY',
	 linkTo:'#/faculty',
	 titbit: 'Discover the profs here at CEG'
},

		];


		$(".signin").animate({'marginTop':"-300px"},200).hide();

		$scope.signinmodal = function(){

				$(".signin").animate({'marginTop':"230px"},200).show();
		};

$scope.closeModal1 = function(){
		$(".signin").animate({'marginTop':"-300px"},200).hide();

};

}]);


myApp.controller('sliderController',['$scope',function($scope){
				//$scope.navItems = ["RESEARCH","DEPARTMENTS","COURSES","ADMISSIONS","CAMPUS TOUR","LOGIN/SIGN UP"];  
				$scope.slideitems = [
				{
image: 'images/slides/slide-1.jpg',
title: 'Something awesome',
desc: 'Something awesome here too'
},
{
image: 'images/slides/slide-2.jpg',
title: 'Something awesome',
desc: 'Something awesome here too'
},
{
image: 'images/slides/slide-3.jpg',
title: 'Something awesome',
desc: 'Something awesome here too'
},
{
image: 'images/slides/slide-4.jpg',
title: 'Something awesome',
desc: 'Something awesome here too'
}];
$scope.data="hello";
}]);



myApp.controller('newsController',['$scope','$http',function($scope,$http){

				$scope.newsitems=[];
				/*
				   $http({method: 'GET', url: 'http://techteam.kurukshetra.org.in/ktask/news.json'}).success(function(data)
				   {
				   $scope.newsitems = data; // response data 

				   });
				   */

				$http.get('js/news.json').success(function (data){
						$scope.newsitems = data.news;
						}); 

				/*
				   $scope.newsitems = [
				   {
image: 'images/news/news-thumb-1.jpg',
title: 'Something awesome',
shortdesc: 'Something awesome here too',
desc: 'Long desc of newsitem in a modal',
type:'item active'
},
{
image: 'images/news/news-thumb-1.jpg',
title: 'Something awesome',
shortdesc: 'Something awesome here too',
desc: 'Long desc of newsitem in a modal',
type:'item active'
},
{
image: 'images/news/news-thumb-1.jpg',
title: 'Something awesome',
shortdesc: 'Something awesome here too',
desc: 'Long desc of newsitem in a modal',
type:'item active'
}
];

*/


$(".cubenews").animate({'marginTop':"-300px"},200).hide();

$scope.showModalnews = function(linkname,desc1){

		$(".cubenews").animate({'marginTop':"0px"},200).show();
		$scope.title = linkname;
		$scope.description=desc1;
		$(".prev").hide();
		$(".next").hide();
};

$scope.closeModalnews = function(){
		$(".cubenews").animate({'marginTop':"-300px"},200).hide();

		$(".prev").show();
		$(".next").show();
};


}]);

myApp.controller('eventsController',['$scope','$http',function($scope,$http){
				//$scope.navItems = ["RESEARCH","DEPARTMENTS","COURSES","ADMISSIONS","CAMPUS TOUR","LOGIN/SIGN UP"];  

				$scope.eventitems=[];
				/* 
				   $http({method: 'GET', url: 'http://techteam.kurukshetra.org.in/ktask/events.json'}).success(function(data)
				   {
				   console.log("http sOK");
				   $scope.eventitems = JSON.parse(data); // response data 
				   });

*/
				$http.get('js/events.json').success(function (data){
						$scope.eventitems = data;
						console.log("getting events.json");
						}); 



				/*
				   $scope.eventitems = [
				   {
month:'FEB',
datenumber:'18',
title:'Open Call',
starttime:'10 am',
endtime:'6 pm',
location:'SNH 110'
},
{
month:'FEB',
datenumber:'18',
title:'Open Call',
starttime:'10 am',
endtime:'6 pm',
location:'SNH 110'
},
{
month:'FEB',
datenumber:'18',
title:'Open Call',
starttime:'10 am',
endtime:'6 pm',
location:'SNH 110'
}

];
//$scope.data="hello";
*/




}]);

myApp.controller('alumniController',['$scope',function($scope){
				//$scope.navItems = ["RESEARCH","DEPARTMENTS","COURSES","ADMISSIONS","CAMPUS TOUR","LOGIN/SIGN UP"];  
				$scope.alumni = [
				{
quote:'something cool',
name:'Bon Jovi',
type:'item active',
job:'Rock Star',
image:'images/ceg.jpg'
},
{
quote:'something cool',
name:'Alan Turing',
type:'item',
job:'Rock Star',
image:'images/ceg.jpg'
},
{
quote:'something cool',
name:'Bon Jovi',
type:'item',
job:'Rock Star',
image:'images/ceg.jpg'
},
{
quote:'something cool',
	  name:'Bon Jovi',
	  type:'item',
	  job:'Rock Star',
	  image:'images/ceg.jpg'
}

];
}]);


myApp.controller('linksController',['$scope','$http',function($scope,$http){
				$scope.links = [
				{
name:'LIBRARY',
desc:'lots of cool stuff about the library :P',
linkTo:'#/library'
},
{
name:'RCC',

desc:'lots of cool stuff about the RCC :P',
linkTo:'#/rcc'
},
{
name:'CLUBS',
desc:'lots of cool stuff about the Clubs in CEG :P',
linkTo:'#/clubs'
},
{
name:'NEWS FROM THE VC',
desc:'lots of cool stuff from the VC',
linkTo:'#/vcdesk'
},
{
name:'MISC',
desc:'lots of cool stuff about miscellaneous stuff :P',
linkTo:'#/misc'
}

];
$http.get('js/clubs.json').success(function (data){
		$scope.clubs = data;
		console.log("hello clubs");
console.log($scope.clubs);
		}); 
}]);


myApp.controller('researchController',['$scope',function($scope){



}]);


myApp.controller('coursesController',['$scope','$http',function($scope,$http){

$http.get('js/courses.json').success(function (data){
		var courses = data;
$scope.ug = [];
$scope.pg = [];
for(i=0;i<courses.length;i++)
{
if(courses[i]['category'] == "UG")
$scope.ug.push(courses[i]);
else
$scope.pg.push(courses[i]);
}
		}); 


}]);




