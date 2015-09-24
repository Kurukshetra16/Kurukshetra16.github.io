/*UPDATES*/
myApp.controller('updateController',['$scope','$http',function($scope,$http){
$scope.updates = [];

$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/updates.json'}).success(function(data)
				   {
				    jsonstr = data; // response data 
				   	console.log("updates"+jsonstr.length);
				   	for(var i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.updates[i] = jsonstr[i]['title'];
				   			// alert($scope.updates[i]);
				   		}
				   $(function(){
				    $(".update-box p").typed({
				      strings:$scope.updates,
				      typeSpeed: 40,
				      loop: true,
				      backDelay: 1500,
				      contentType: 'text',
				      loopCount: false,
				      cursorChar: " |"
				    });
				  });

				   });

}]);

/*UPDATES*/
myApp.controller('eventsController',['$scope','$http','$location',function($scope,$http,$location){
$scope.events = [];
$scope.tabs = [];
$scope.eventName;
var path = $location.path();
path = '/'+path.substr(8,path.length);
//alert(path);
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/categories'+path+'.json'}).success(function(data)
				   {
				    jsonstr = data['category']['events']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.events[i] = jsonstr[i];
				   			
				   		}
				   });
$scope.getEvent = function(eventname){
	eventName = eventname;
	eventname = eventname.toLowerCase().replace(' ','-');
function init(){
	$(".left").animate({'marginLeft':"0px"},500,'easeOutSine');
	$(".tabContent").hide();
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/events/'+eventname+'.json'}).success(function(data)
				   {
				    jsonstr = data['event']['tabs']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
			   			$scope.tabs[i] = jsonstr[i];
				   			$scope.tabs[i]['id']=i;
				   		}

				   	init();
});
}
$scope.showTab = function(tabtitle)
{
	$(".tabContent").show();
	$(".tabContent").find("li").hide();
	$(".tabContent").find("."+tabtitle).show();
};


}]);
myApp.controller('hospiController',['$scope','$document',function($scope,$document){
$scope.nodes = [
{
	title:'INTRODUCTION',
	icon:'fa fa-info hospi_icon',
	url:'intro',
	id:1
},
{
	title:'INSTRUCTIONS',
	icon:'fa fa-file hospi_icon',
	url:'instr',
	id:2
},
{
	title:'ACCOMODATION',
	icon:'fa fa-suitcase hospi_icon',
	url:'accom',
	id:3
},
{
	title:'REACHING CEG',
	icon:'fa fa-map-marker hospi_icon',
	url:'reachceg',
	mclass:'margin-left:-5px',
	id:4
},
{
	title:'FAQ',
	icon:'fa fa-question hospi_icon',
	url:'faq',
	mclass:'margin-left:2px',
	id:5
},
{
	title:'CONTACT',
	icon:'fa fa-mobile hospi_icon',
	url:'contact',
	mclass:'margin-left:2px',
	id:6
}
];
     var section3 = angular.element(document.getElementById('hospi_content'));
    $scope.tohospi = function() {

      $document.scrollTo(0,1000);
    }
}]);


// guestlectures
myApp.controller('glController',['$scope',function($scope){
$scope.nodes = [
{
	title:'Venkatakrishnan Ranganathan1',
	description:'Head of Social Media and Workplace Re-imagination Practice, TCS',
	img:'images/ceg.jpg',
	id:1
},{
	title:'Venkatakrishnan Ranganathan2',
	description:'Head of Social Media and Workplace Re-imagination Practice, TCS',
	img:'images/patterns/bluekar.jpg',
	id:2
},{
	title:'Venkatakrishnan Ranganathan3',
	description:'Head of Social Media and Workplace Re-imagination Practice, TCS',
	img:'images/patterns/redkarnival.jpg',
	id:3
},{
	title:'Venkatakrishnan Ranganathan4',
	description:'Head of Social Media and Workplace Re-imagination Practice, TCS',
	img:'images/ceg.jpg',
	id:4
},{
	title:'Venkatakrishnan Ranganathan5',
	description:'Head of Social Media and Workplace Re-imagination Practice, TCS',
	img:'images/gplay.png',
	id:5
},
{
	title:'Venkatakrishnan Ranganathan5',
	description:'Head of Social Media and Workplace Re-imagination Practice, TCS',
	img:'images/patterns/food.png',
	id:6
}];
}]);

/*ABOUT*/
myApp.controller('aboutController',['$scope',function($scope){
$scope.nodes = [
{
	title:'CEG',
	icon:'fa fa-university hospi_icon',
	url:'intro',
	mclass:'margin-left:1px',
	id:1
},
{
	title:'KURUKSHETRA',
	icon:'fa fa-diamond hospi_icon',
	url:'instr',
	id:2
},
{
	title:'CYCLOTRON',
	icon:'fa fa-empire hospi_icon',
	url:'accom',
	mclass:'margin-left:-10px',
	id:3
},
{
	title:'CEG TECH FORUM',
	icon:'fa fa-graduation-cap hospi_icon',
	url:'reachceg',
	mclass:'margin-left:2px',
	id:4
}
];

}]);
