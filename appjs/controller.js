
/*UPDATES*/
var myApp = angular.module("myAppControllers",[]);
function findTime($scope, $rootScope) {
 var date = new Date();
 var hours = date.getHours();
 var ampm = hours >= 12 ? 'pm' : 'am';
 if( hours <= 18 )
 {	
 	$("html,body").css({'background-color':"#1F4979",'background-image':"none"});
 	$("#bs-example-navbar-collapse-1.navbar-collapse.collapse.in").css({'background-color':"#1F4979",'background-image':"none"});
 	$(".overlay").css({'background-color':"rgba(31,73,121,0.3)",'background-image':"url(images/clouds.png)",'background-size':"300px 300px"});
 	$(".jarvis").attr("src","images/jarvis_day.png");
 	$(".contactCircle").attr("src","images/contact_day.png");
 	less.modifyVars({
        '@border-main': "rgb(242,165,4)",
        '@border-right': "rgb(209,31,1)",
        '@border-bottom': "rgb(159,20,0)",
        '@border-left':"rgb(209,31,1)",
        '@border-top':"rgb(239,70,7)",

        '@small-border-main': "#A66C25",
        '@small-border-top': "rgb(254,175,13)",
        '@small-border-right': "rgb(253,128,22)",
        '@small-border-left': "rgb(253,128,22)",
        '@small-border-bottom': "rgb(245,102,15)",
        '@font-color':"#EDFEB0",
        '@font-color-hover':"#EDFEC9",
        '@line-color':"#aa6625",
        '@line-progres':"#ffa639"

    });
 }
 else
 {	$("html,body").css({'background-color':"rgb(0,7,32)",'background-image':"url(images/constellations.png)"});
 	$(".jarvis").attr("src","images/jarvis.png");
 	$(".contactCircle").find("img").attr("src","images/jarvis.png");
	}
}

myApp.controller('updateController',['$scope','$http','$timeout' , '$auth','$route','cfpLoadingBar','Account',
					function($scope,$http,$timeout,$auth,$route, cfpLoadingBar, Account){
findTime();
$scope.updates = [];
// $scope.dataLoaded = false;
$scope.isLoggedin = $auth.isAuthenticated();

$scope.kid = "";
$scope.name = "";
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/updates.json'}).success(function(data)
				   {
				    jsonstr = data; // response data 
				   	console.log("updates"+jsonstr.length);
				   	
				   	// $timeout(function(){$scope.dataLoaded = true;},1000);
				   	
				   	for(var i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.updates[i] = jsonstr[i]['title'];
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

    $scope.authenticate = function(provider) {
    	console.log("authenticate")
      $auth.authenticate(provider)
        .then(function(response) {
          console.log('You have successfully signed in with ' + provider);
          console.log(response.data.kid);
          console.log(response.data.name);
          $scope.kid = response.data.kid;
          $scope.name = response.data.name;	
       $scope.isLoggedin = true;
        $route.reload();
        })
        .catch(function(response) {
   		  console.log('Error signing in');
        });
    };

    $scope.logout = function(argument) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        console.log('You have been logged out');
              $scope.isLoggedin = false;
       		  $route.reload();
      	
      });
   };
    $scope.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          console.log(response.data.message, response.status);
        });
    };
    $scope.updateProfile = function() {
      Account.updateProfile($scope.user)
        .then(function() {
          console.log('Profile has been updated');
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.getProfile();

}]);

/*EVENTS*/
myApp.controller('eventsController',['$scope','$http','$location','$timeout','cfpLoadingBar',function($scope,$http,$location,$timeout, cfpLoadingBar){
findTime();
$scope.events = [];
$scope.tabs = [];
$scope.eventName;
var path = $location.path();
path = '/'+path.substr(8,path.length);
$scope.category = path.substr(1,path.length).toUpperCase()+" EVENTS";
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/categories'+path+'.json'}).success(function(data)
				   {
				    jsonstr = data['category']['events']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.events[i] = jsonstr[i];
				   			console.log($scope.events[i]);
				   		}
				   		$(".home-event-circle").find(".circle-icon").removeClass("selectedNavElem");
						$(".home-event-circle").removeClass("removeBB");
						$("#eventNav").find(".circle-icon").addClass("selectedNavElem");
						$("#eventNav").addClass("removeBB");
				   });
$scope.getEvent = function(eventname){
	$(".imagebox").each(function(){
      var elem = $(this);
      setTimeout(function(){
        $(elem).animate({'opacity':"0",'margin-left':"30px"},70);
      },i*50+50);
    });
	$scope.eventName = eventname;
	eventname = eventname.toLowerCase().replace(/[ ']/g,'-').replace('!','');
function init(){
	$(".tabContent li").hide();
	$(".tabContent").find("li.0").show();
	
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/events/'+eventname+'.json'}).success(function(data)
				   {
				    jsonstr = data['event']['tabs']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
			   			$scope.tabs[i] = jsonstr[i];
				   			$scope.tabs[i]['id']=i;
				   		}
					$(".left").animate({'marginLeft':"0px"},500,'easeOutSine');
				   	$timeout(init, 10);
});
}
$scope.showTab = function(tabtitle)
{
	$(".tabContent").show();
	$(".tabContent").find("li").hide();
	$(".tabContent").find("."+tabtitle).show();
};
}]);
/*WORKSHOPS*/
myApp.controller('wkshopsController',['$scope','$http','$location','$timeout','cfpLoadingBar',function($scope,$http,$location,$timeout,cfpLoadingBar){
findTime();
$scope.events = [];
$scope.tabs = [];
$scope.eventName;
var path = $location.path();
path = '/'+path.substr(11,path.length);
$scope.category = path.substr(1,path.length).toUpperCase()+" WORKSHOPS";
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/workshopcategories'+path+'.json'}).success(function(data)
				   {
				    jsonstr = data['workshopcategory']['workshops']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.events[i] = jsonstr[i];
				   		}
				   			$(".home-event-circle").find(".circle-icon").removeClass("selectedNavElem");
	$(".home-event-circle").removeClass("removeBB");
	$("#wkshopNav").find(".circle-icon").addClass("selectedNavElem");
	$("#wkshopNav").addClass("removeBB");

				   });
$scope.getEvent = function(eventname){
	$(".imagebox").each(function(){
      var elem = $(this);
      setTimeout(function(){
        $(elem).animate({'opacity':"0",'margin-left':"30px"},70);
      },i*50+50);
    });
	$scope.eventName = eventname;
	eventname = eventname.toLowerCase().replace(/[ ']/g,'-').replace('!','');
function init(){
	$(".tabContent li").hide();
	$(".tabContent").find("li.0").show();
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/workshops/'+eventname+'.json'}).success(function(data)
				   {
				    jsonstr = data['workshop']['tabs']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
			   			$scope.tabs[i] = jsonstr[i];
				   			$scope.tabs[i]['id']=i;
				   		}
					$(".left").animate({'marginLeft':"0px"},500,'easeOutSine');
				   	$timeout(init, 10);

});
}
$scope.showTab = function(tabtitle)
{
	$(".tabContent").show();
	$(".tabContent").find("li").hide();
	$(".tabContent").find("."+tabtitle).show();
};
}]);

/*HOSPI*/
myApp.controller('hospiController',['$scope','$document','$http','cfpLoadingBar',function($scope,$document,$http,cfpLoadingBar){
findTime();
$scope.nodes = [
{
	title:'Introduction',
	icon:'fa fa-info hospi_icon',
	url:'intro',
	mclass:'margin-left:-10px',
	id:1
},
{
	title:'Instructions',
	icon:'fa fa-file hospi_icon',
	url:'instr',
	mclass:'margin-left:-10px',
	id:2
},
{
	title:'Accommodation',
	icon:'fa fa-suitcase hospi_icon',
	url:'accom',
	mclass:'margin-left:-10px',
	id:3
},
{
	title:'Reaching CEG',
	icon:'fa fa-map-marker hospi_icon',
	url:'reachceg',
	mclass:'margin-left:-5px',
	id:4
},
{
	title:'FAQs',
	icon:'fa fa-question hospi_icon',
	url:'faq',
	mclass:'margin-left:2px',
	id:5
},
{
	title:'Contact',
	icon:'fa fa-mobile hospi_icon',
	url:'contact',
	mclass:'margin-left:2px',
	id:6
}
];
$scope.clickedNode = '';
$scope.nodeData = '';
$scope.clickedID = ''; 
$scope.nodeInfo = [];

	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/hospitalities.json'}).success(function(data)
				   {	
						var jsonstr = data['hospitalities'];
						for(var i=0; i<jsonstr.length;i++)
							{
							$scope.nodeInfo[i] = jsonstr[i];
							$scope.nodeInfo[i]['id'] = i+1;
							console.log($scope.nodeInfo[i]['title']);
							}
							init();
							var top = $("#hospi_content").scrollTop()+180;
							$('html,body').delay(100).animate({'scrollTop':top+"px"},1500,'easeOutSine');
							$scope.$apply();
					});
	function init()
	{
		$scope.nodeData = $scope.nodeInfo[0]['desc'];
		$scope.clickedNode = "Introduction";
		$scope.clickedID = "1";
  		$(".longer-line").css({'width':"10%"});
  		setTimeout(function(){$(".hospi_content").addClass("hospi_animated");
		$("#1").addClass("node-active");
  		},500);
	}
	$scope.tohospi = function(clicked,clickedid) {
      $scope.clickedNode = clicked;
      $scope.clickedID = clickedid-1;
      console.log(clickedid);
      console.log($scope.nodeInfo[$scope.clickedID]['desc']);
      $scope.nodeData = $scope.nodeInfo[$scope.clickedID]['desc'];
    };
}]);
// guestlectures
myApp.controller('glController',['$scope','$http','$timeout','cfpLoadingBar',function($scope,$http,$timeout,cfpLoadingBar){
findTime();
$scope.nodes =[];
function init(){
	setTimeout(function(){
	$(".glpage1").removeClass("glpageanim1");},500);
    $(".glpage2").removeClass("glpageanim2");
	$(".glContainer #1").addClass("glBigBorder");
	var id = 0; 
	$scope.clickedName = $scope.nodes[id]['title'];
	$scope.date = $scope.nodes[id]['date'];
	$scope.Time = $scope.nodes[id]['time'];
	$scope.venue = $scope.nodes[id]['venue'];
	$scope.desc = $scope.nodes[id]['desc'];
	$scope.about = $scope.nodes[id]['about'];
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/gls.json'}).success(function(data)
				   {	
						var jsonstr = data['gls'];
						for(var i=0; i<jsonstr.length;i++)
							{
							$scope.nodes[i] = jsonstr[i];
							$scope.nodes[i]['id'] = i+1;
							console.log($scope.nodes[i]['title']);
							}
				   		$timeout(init, 10);
				   		var top = $(".anno").scrollTop()+450;
					   // $('html,body').delay(100).animate({'scrollTop':top+"px"},1500,'easeOutSine');
					    $scope.$apply();
					});
$scope.clickedName = '';
$scope.date = '';
$scope.Time = '';
$scope.venue = '';
$scope.desc = '';
$scope.about = '';
$scope.clicked = function(name,id)
{	
	if($scope.clickedName == name)
		return;
	$(".glpage1").addClass("glpageanim1");
	setTimeout(function(){$(".glpage1").removeClass("glpageanim1");},500);
    $(".glpage2").removeClass("glpageanim2");
	$scope.clickedName = name;
	id = id-1;
	$scope.date = $scope.nodes[id]['date'];
	$scope.Time = $scope.nodes[id]['time'];
	$scope.venue = $scope.nodes[id]['venue'];
	$scope.desc = $scope.nodes[id]['desc'];
	$scope.about = $scope.nodes[id]['about'];
	var top = $(".glContent").scrollTop()+450;
	$('html,body').animate({'scrollTop':top+"px"},500,'easeOutSine');
	$scope.$apply();

};

}]);

//karnival
myApp.controller('karnivalController',['$scope','$http','$timeout','cfpLoadingBar',function($scope,$http,$timeout,cfpLoadingBar){
findTime();
$scope.nodes =[];

	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/karnivals.json'}).success(function(data)
				   {	
						var jsonstr = data['karnivals'];
						for(var i=0; i<jsonstr.length;i++)
							{
							$scope.nodes[i] = jsonstr[i];
							$scope.nodes[i]['id'] = i+1;
							console.log($scope.nodes[i]['title']);
							}
					});
$scope.clickedName = '';
$scope.date = '';
$scope.Time = '';
$scope.venue = '';
$scope.desc = '';
$scope.clicked = function(name,id)
{	
	$scope.clickedName = name;
	$scope.date = $scope.nodes[id]['date'];
	$scope.Time = $scope.nodes[id]['time'];
	$scope.venue = $scope.nodes[id]['venue'];
	$scope.desc = $scope.nodes[id]['desc'];
	setClose = 0;

$(".navbar-toggle").click(function(){
  closeall();
});


$(".karCircle").click(function(){

if( $(window).width() >= 600)
{
    popOut();
    setTimeout(function(){  
      moveKarsUp();},200*6);
    setClose = 1;
}
//mobile effects
else
{
    mpopOut();
    setTimeout(function(){
      moveKarsUp();},200*6);

    setClose = 1; 
}
  });

$(".closeme").click(function(){
  moveKarsDown();
  popIn();
  
});

  var anims = ['flyLeft','flyRight'];
  var index = 0;
  function popOut(){
  $(".karCircle").each(function(i){
      var ele = $(this);
      index = (index+1)%2;
      var currentanim = anims[index];
      setTimeout(function(){ $(ele).addClass(currentanim).fadeOut(100*i+100);},100*i+100);
  });
}

//mobile popOut effects -- reduced
  function mpopOut(){
  $(".karCircle").each(function(i){
      var ele = $(this);
      setTimeout(function(){ $(ele).addClass("flyLeft").fadeOut(100*i+100);},100*i+100);
  });
}
function popIn(){

  $(".karCircle").each(function(i){
      var ele = $(this);
      setTimeout(function(){ $(ele).removeClass("flyLeft").removeClass("flyRight").removeClass("flyTop").removeClass("flyBottom").fadeIn(i*175);},200*i+100);
  });
}

function closeall(){
    moveKarsDown();
    popIn();  
}

function moveKarsUp(){
  $(".topPage").addClass("zoomIn");
}

function moveKarsDown(){
  $(".topPage").removeClass("zoomIn");
}
};

}]);
/*ABOUT*/
myApp.controller('aboutController',['$scope',function($scope){
findTime();
$scope.nodes = [
{
	title:'INTRODUCTION',
	icon:'fa fa-info hospi_icon',
	url:'intro',
	mclass:'margin-left:1px',
	id:1
},
{
	title:'CEG',
	icon:'fa fa-graduation-cap hospi_icon',
	url:'ceg',
	mclass:'margin-left:1px',
	id:2
},
{
	title:'CTF',
	icon:'fa fa-shield hospi_icon',
	url:'ctf',
	mclass:'margin-left:2px',
	id:3
},
{
	title:'CYCLOTRON',
	icon:'fa fa-empire hospi_icon',
	url:'logo',
	mclass:'margin-left:-10px',
	id:4
},
{
	title:'UNESCO',
	icon:'fa fa-bank hospi_icon',
	url:'unesco',
	mclass:'margin-left:2px',
	id:5
},
{
	title:'KURUKSHETRA',
	icon:'fa fa-diamond hospi_icon',
	url:'kuruk',
	id:6
}
];

$scope.nodeInfo=[
{
	id:1,
	desc:'Be it the battles in the mythology or of history, they have always been fought with a cause. Greed of land, resources and supremacy were always the intention. In an age devoid of the need for those, the next battle, it is said, would be for water. Against all odds, we believe that the battle of the brains is a more indispensable battle for our generation. As Student Directors of CTF, we welcome you to this battle, where wits need to be as sharp as swords and the mind as ready as ever to engage in the battle. We at CTF believe that Kurukshetra is the platform for events that will put to test the versatile ability of logic and smart thinking, hands-on workshops and enthralling experiences through guest lecture series. Make your way to CEG during Kurukshetra and leave a bit smarter, a bit more accomplished and proud of yourselves.'
},
{
	id:2,
	desc:'From being a Survey school in 1794 to a Civil Engineering college in 1858 and finally College of Engineering, Guindy in 1859, the college always strived for excellence in academia and in enriching the students with experience. With the pride of being one of oldest engineering college in India, CEG continues in the path of inspiring engineers to excel at any endeavour.'
},
{
	id:3,
	desc:'CEG Tech Forum, the student run organisation, established in the year 2006, has become the technical hub of our college. The Student Directors of CTF work towards uniting the technical activities of CEG under this forum, to nurture and give direction to any student. Through collaborations with industries and academia, we aim to bring out the technological and research curiosity in our students. CTF\’s activities also include its flagship event, Kurukshetra.'
},
{
	id:4,
	desc:'The Cyclotron symbolizes the celebration of the indomitable spirit of engineering and innovation. It represents the ever expanding pursuit of knowledge. Just as a cyclotron accelerates a charged particle using high frequency, Kurukshetra provides that extra impetus for the engineer to excel.'
},
{
	id:5,
	desc:'The UNESCO patronage is the highest form of support granted by the organization, as a moral endorsement of exceptional activity which has a real impact on education, science, cultural or communication. Kurukshetra is the first event of its kind to receive this recognition. This recognition puts Kurukshetra in league with some of the most prestigious endeavors in the world..'
},
{
	id:6,
	desc:'Kurukshetra, an International Techno-Management Festival organized by CEG Tech Forum, has embarked on its journey of tenth edition. From its inception in 2007, it aimed at bringing together talents from varied engineering and management domains. Kurukshetra has evolved to act as an effective medium of interface between the academia and the industry. The fest with a vision for future to motivate, to provide opportunity and to identify and analyze societal problems, thereby provides tools to the current generation to solve it.'
	
}];
$scope.clickedName = 'INTRODUCTION';
$scope.information = $scope.nodeInfo[0]['desc'];
$(".longer-line").css({'width':"100%"});
setTimeout(function(){$(".hospi_content").addClass("hospi_animated");
$("#1").addClass("node-active");
},500);

$scope.clicked = function(clickedid)
{
	$scope.clickedName = $scope.nodes[clickedid-1]['title'];
	$scope.information = $scope.nodeInfo[clickedid-1]['desc']; 
	var top = $("#hospi_content").scrollTop()+180;
    $('html,body').animate({'scrollTop':top+"px"},500,'easeOutSine');
    $scope.$apply();
};

}]);
/*CONTACTS*/
/*WORKSHOPS*/
myApp.controller('contactsController',['$scope','$http','$location','$timeout','cfpLoadingBar',function($scope,$http,$location,$timeout,cfpLoadingBar){
findTime();
$scope.buckets = [];
$scope.members = [];
$scope.bucketname = '';
$scope.bucketemail = '';
var pushclass = [];
$scope.push = '';
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/teams.json'}).success(function(data)
				   {
				    jsonstr = data['teams'];
				   	for(i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.buckets[i] = jsonstr[i];
				   			$scope.buckets[i]['id'] = i;
				   			if(jsonstr[i]['members'].length == 2)
				   				pushclass[i]= 'col-md-push-4';
				   			else if(jsonstr[i]['members'].length == 3)
				   				pushclass[i] = 'col-md-push-3';
				   			else if(jsonstr[i]['members'].length == 1)
				   				pushclass[i] = 'col-md-push-5';
				   			else
				   				pushclass[i] = 'col-md-push-2';
				   		}
				   });
$scope.getBucket = function(bname,id){
//function
$(".navbar-toggle").click(function(){
  closeall();
});
$(".bucketCircle").click(function(){
    popOut($(this));
    $("html,body").animate({'scrollTop':"100px"},1000);
    $scope.$apply();
    $(".left").animate({'marginLeft':"0px"},500,'easeOutSine');
  });
$(".close").click(function(){
  closeall();
});
function popOut(thisele){
  $(thisele).addClass("popOutFast");
  $(".bucketCircle").each(function(i){
  var ele = $(this);
  $timeout(function(){ if(!$(ele).hasClass("popOut")) $(ele).addClass("popOut"); }, i*75);
  });
}
function popIn(){
  $(".bucketCircle").each(function(i){
      var ele = $(this);
      $timeout(function(){ $(ele).removeClass("popOut").removeClass("popOutFast");
       }, i*20);
  });
}
function closeall(){
    $(".left").animate({'marginLeft':"100%"},500,'easeOutSine');
    popIn();
}
	$scope.bucketname = bname;
	$scope.bucketemail = $scope.buckets[id]['email'];
	$scope.members = $scope.buckets[id]['members'];
	$scope.push = pushclass[id];
	};

}]);
/*PROJECTS*/
myApp.controller('projectsController',['$scope','$http','$location','$timeout','cfpLoadingBar',function($scope,$http,$location,$timeout, cfpLoadingBar){
findTime();
$scope.events = [];
$scope.tabs = [];
$scope.eventName;
var path = '/engineering';
//path = '/'+path.substr(8,path.length);
$scope.category = 'PROJECTS';
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/categories'+path+'.json'}).success(function(data)
				   {
				    jsonstr = data['category']['events']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
				   			$scope.events[i] = jsonstr[i];
				   			console.log($scope.events[i]);
				   		}
				  
				   });
$scope.getEvent = function(eventname){
	$(".imagebox").each(function(){
      var elem = $(this);
      setTimeout(function(){
        $(elem).animate({'opacity':"0",'margin-left':"30px"},70);
      },i*50+50);
    });
	$scope.eventName = eventname;
	eventname = eventname.toLowerCase().replace(/[ ']/g,'-').replace('!','');
function init(){
	$(".tabContent li").hide();
	$(".tabContent").find("li.0").show();
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/events/'+eventname+'.json'}).success(function(data)
				   {
				    jsonstr = data['event']['tabs']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
			   			$scope.tabs[i] = jsonstr[i];
				   			$scope.tabs[i]['id']=i;
				   		}
					$(".left").animate({'marginLeft':"0px"},500,'easeOutSine');
				   	$timeout(init, 10);
});
}
$scope.showTab = function(tabtitle)
{
	$(".tabContent").show();
	$(".tabContent").find("li").hide();
	$(".tabContent").find("."+tabtitle).show();
};

}]);
/*XCEED*/
myApp.controller('xceedController',['$scope','$http','$location','$timeout','cfpLoadingBar',function($scope,$http,$location,$timeout, cfpLoadingBar){
findTime();
$scope.events1 = [];
$scope.events2 = [];
$scope.events3 = [];
$scope.events4 = [];
$scope.tabs = [];
$scope.eventName = '';
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/xceeds.json'}).success(function(data)
				   {
				   		for(var i=0;i<data.length;i++)
				   		{
				   			if(data[i]['city_id'] == 1)
				   				$scope.events1.push(data[i]['name']);
				   			if(data[i]['city_id'] == 2)
				   				$scope.events2.push(data[i]['name']);
				   			if(data[i]['city_id'] == 3)
				   				$scope.events3.push(data[i]['name']);
				   			if(data[i]['city_id'] == 4)
				   				$scope.events4.push(data[i]['name']);
				   		console.log(data[i]['name']);
				   		}
				   		console.log($scope.events1.length);
				   });
$scope.getEvent = function(eventname){
	$(".place").fadeOut(100);
	$scope.eventName = eventname;
	eventname = eventname.toLowerCase().replace(/[ ']/g,'-').replace('!','');
function init(){
	$(".tabContent li").hide();
	$(".tabContent").find("li.0").show();
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/xceeds/'+eventname+'.json'}).success(function(data)
				   {
				    jsonstr = data['xceed']['tabs']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
			   			$scope.tabs[i] = jsonstr[i];
				   			$scope.tabs[i]['id']=i;
				   		}
					$(".left").animate({'opacity':"1",'marginLeft':"-15px",'margin-top':"3%"},500,'easeOutSine');
				   	$timeout(init, 10);
});
}
$scope.showTab = function(tabtitle)
{
	$(".tabContent").show();
	$(".tabContent").find("li").hide();
	$(".tabContent").find("."+tabtitle).show();
};
}]);
/*XCEED*/
myApp.controller('xceedController',['$scope','$http','$location','$timeout','cfpLoadingBar',function($scope,$http,$location,$timeout, cfpLoadingBar){
findTime();
$scope.events1 = [];
$scope.events2 = [];
$scope.events3 = [];
$scope.events4 = [];
$scope.tabs = [];
$scope.eventName = '';
$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/xceeds.json'}).success(function(data)
				   {
				   		for(var i=0;i<data.length;i++)
				   		{
				   			if(data[i]['city_id'] == 1)
				   				$scope.events1.push(data[i]['name']);
				   			if(data[i]['city_id'] == 2)
				   				$scope.events2.push(data[i]['name']);
				   			if(data[i]['city_id'] == 3)
				   				$scope.events3.push(data[i]['name']);
				   			if(data[i]['city_id'] == 4)
				   				$scope.events4.push(data[i]['name']);
				   		console.log(data[i]['name']);
				   		}
				   		console.log($scope.events1.length);
				   });
$scope.getEvent = function(eventname){
	$(".place").fadeOut(100);
	$scope.eventName = eventname;
	eventname = eventname.toLowerCase().replace(/[ ']/g,'-').replace('!','');
function init(){
	$(".tabContent li").hide();
	$(".tabContent").find("li.0").show();
}
	$http({method: 'GET', url: 'http://cms.kurukshetra.org.in/xceeds/'+eventname+'.json'}).success(function(data)
				   {
				    jsonstr = data['xceed']['tabs']; // response data 
				   	for(i=0;i<jsonstr.length;i++)
				   		{
			   			$scope.tabs[i] = jsonstr[i];
				   			$scope.tabs[i]['id']=i;
				   		}
					$(".left").animate({'opacity':"1",'marginLeft':"-15px",'margin-top':"3%"},500,'easeOutSine');
				   	$timeout(init, 10);
});
}
$scope.showTab = function(tabtitle)
{
	$(".tabContent").show();
	$(".tabContent").find("li").hide();
	$(".tabContent").find("."+tabtitle).show();
};
}]);

myApp.controller('ProfileCtrl', function($scope, $auth, Account) {

  });
