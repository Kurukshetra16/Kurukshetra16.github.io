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

/*EVENTS*/
myApp.controller('eventsController',['$scope','$http','$location','$timeout',function($scope,$http,$location,$timeout){
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

myApp.controller('hospiController',['$scope','$document','$http',function($scope,$document,$http){
$scope.nodes = [
{
	title:'Introduction',
	icon:'fa fa-info hospi_icon',
	url:'intro',
	id:1
},
{
	title:'Instructions',
	icon:'fa fa-file hospi_icon',
	url:'instr',
	id:2
},
{
	title:'Accommodation',
	icon:'fa fa-suitcase hospi_icon',
	url:'accom',
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
					});
	$scope.tohospi = function(clicked,clickedid) {
      $scope.clickedNode = clicked;
      $scope.clickedID = clickedid;
      $scope.nodeData = $scope.nodeInfo[$scope.clickedID]['desc'];
    };
}]);
// guestlectures
myApp.controller('glController',['$scope','$http','$timeout',function($scope,$http,$timeout){
$scope.nodes =[];

function init(){
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
					});
$scope.clickedName = '';
$scope.date = '';
$scope.Time = '';
$scope.venue = '';
$scope.desc = '';
$scope.about = '';
$scope.clicked = function(name,id)
{	
	$(".glpage1").removeClass("glpageanim1");
    $(".glpage2").removeClass("glpageanim2");
	$scope.clickedName = name;
	id = id-1;
	$scope.date = $scope.nodes[id]['date'];
	$scope.Time = $scope.nodes[id]['time'];
	$scope.venue = $scope.nodes[id]['venue'];
	$scope.desc = $scope.nodes[id]['desc'];
	$scope.about = $scope.nodes[id]['about'];
};

}]);

//karnival
myApp.controller('karnivalController',['$scope','$http','$timeout',function($scope,$http,$timeout){
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

  var anims = ['flyLeft','flyBottom','flyRight','flyTop'];
  var index = 0;
  function popOut(){
  $(".karCircle").each(function(i){
      var ele = $(this);
      index = (index+1)%4;
      var currentanim = anims[index];
      setTimeout(function(){ $(ele).addClass(currentanim).fadeOut(200*i+100);},200*i+100);
  });
}

//mobile popOut effects -- reduced
  function mpopOut(){
  $(".karCircle").each(function(i){
      var ele = $(this);
      setTimeout(function(){ $(ele).addClass("flyLeft").fadeOut(200*i+100);},200*i+100);
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
  $(".karBox").addClass("floatUp");
  $(".bottomPage").addClass("rotateUp");
  $(".topPage").addClass("zoomIn");
}

function moveKarsDown(){
  $(".karBox").removeClass("floatUp");
  $(".bottomPage").removeClass("rotateUp");
  $(".topPage").removeClass("zoomIn");

}
};

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
