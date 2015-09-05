/*HOSPI*/
myApp.controller('hospiController',['$scope',function($scope){
$scope.nodes = [
{
	title:'INTRODUCTION',
	icon:'fa fa-info hospi_icon',
	url:'intro'
},
{
	title:'INSTRUCTIONS',
	icon:'fa fa-file hospi_icon',
	url:'instr'
},
{
	title:'ACCOMODATION',
	icon:'fa fa-suitcase hospi_icon',
	url:'accom'
},
{
	title:'REACHING CEG',
	icon:'fa fa-map-marker hospi_icon',
	url:'reachceg'
},
{
	title:'FAQ',
	icon:'fa fa-question hospi_icon',
	url:'faq'
},
{
	title:'CONTACT',
	icon:'fa fa-mobile hospi_icon',
	url:'contact'
}
];

}]);

/*ABOUT*/
myApp.controller('aboutController',['$scope',function($scope){
$scope.nodes = [
{
	title:'INTRODUCTION',
	icon:'fa fa-info hospi_icon',
	url:'intro'
},
{
	title:'INSTRUCTIONS',
	icon:'fa fa-file hospi_icon',
	url:'instr'
},
{
	title:'ACCOMODATION',
	icon:'fa fa-suitcase hospi_icon',
	url:'accom'
},
{
	title:'REACHING CEG',
	icon:'fa fa-map-marker hospi_icon',
	url:'reachceg'
}
];

}]);





myApp.controller('blogController',['$scope',function($scope){

var posts = [{
	postdate:'25th May, 2015',
	desc:'Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.',
	title:'Nice long blog title',
	tags:['tech','android','cool','fun']
},
{
	postdate:'25th May, 2015',
	desc:'Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.',
	title:'Nice long blog title',
	tags:['tech','android','cool']
},
{
	postdate:'25th May, 2015',
	desc:'Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.',
	title:'Nice long blog title',
	tags:['tech','android','cool']
},{
	postdate:'25th May, 2015',
	desc:'Lots of Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project. Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.',
	title:'Nice long blog title',
	tags:['tech','android','cool']
},{
	postdate:'25th May, 2015',
	desc:'Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.',
	title:'Nice long blog title',
	tags:['tech','android','cool']
},{
	postdate:'25th May, 2015',
	desc:'Lots Lots of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.of Cool stuff about the project. Lots of Cool stuff about the project.Lots of Cool stuff about the project. Lots of Cool stuff about the project.',
	title:'Nice long blog title',
	tags:['tech','android','cool']
}];


//blog pagination

  $scope.itemsPerPage = 4;
  $scope.currentPage = 0;

  $scope.range = function() {
    var rangeSize = 2;
    var ret = [];
    var start;

    start = $scope.currentPage;

    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };


  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }

   angular.element($(".navnos").removeClass("pageNow"));
   
   angular.element($("#"+$scope.currentPage)).addClass("pageNow");
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
      
    }

   angular.element($(".navnos").removeClass("pageNow"));
   
   angular.element($("#"+$scope.currentPage)).addClass("pageNow");
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

  $scope.setPage = function($event, n) {
    // if (n > 0 && n < $scope.pageCount()) {
      $scope.currentPage = n;
    //  alert($scope.currentPage);
    
    $scope.posts = $scope.getfn(n*$scope.itemsPerPage, $scope.itemsPerPage);
   
   angular.element($(".navnos").removeClass("pageNow"));
   
   angular.element($event.currentTarget).addClass("pageNow");
   
    // }
  };

  $scope.$watch("currentPage", function(newValue, oldValue) {
    
    $scope.posts = $scope.getfn(newValue*$scope.itemsPerPage, $scope.itemsPerPage);
    $scope.total = $scope.totalfn();
  	
  });

$scope.getfn = function( offset, limit ){
	
	return posts.slice( offset, offset+limit );
};

$scope.totalfn = function(){
	// alert(posts.length);
	return posts.length;


};

}]);

myApp.controller('newsController',['$scope',function($scope){
var items = [{
	
	news_date:'21st May, 2015',
	desc:'1 The Robotics Club is organizing a Bluetooth-controlled Bot Workshop on 27th May from 10am to 3pm at TAG Auditorium. Entry fee: Rs 1000. #People in a group:2',
	fb_link:'goo.gl/robotics-club-blutooth-workshop/'
},
{
	news_date:'21st May, 2015',
	desc:'2 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	
	news_date:'21st May, 2015',
	desc:'3 CTF is organizing a Hackathon on May 29th at Turing Hall. Visit the FB link for more deets!',
	fb_link:'goo.gl/hack-turing/'
},
{
	news_date:'21st May, 2015',
	desc:'4 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	news_date:'21st May, 2015',
	desc:'5 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	
	news_date:'21st May, 2015',
	desc:'6 The Robotics Club is organizing a Bluetooth-controlled Bot Workshop on 27th May from 10am to 3pm at TAG Auditorium. Entry fee: Rs 1000. #People in a group:2',
	fb_link:'goo.gl/robotics-club-blutooth-workshop/'
},
{
	news_date:'21st May, 2015',
	desc:'7 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	
	news_date:'21st May, 2015',
	desc:'8 CTF is organizing a Hackathon on May 29th at Turing Hall. Visit the FB link for more deets!',
	fb_link:'goo.gl/hack-turing/'
},
{
	news_date:'21st May, 2015',
	desc:'9 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	news_date:'21st May, 2015',
	desc:'10 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	
	news_date:'21st May, 2015',
	desc:'11 The Robotics Club is organizing a Bluetooth-controlled Bot Workshop on 27th May from 10am to 3pm at TAG Auditorium. Entry fee: Rs 1000. #People in a group:2',
	fb_link:'goo.gl/robotics-club-blutooth-workshop/'
},
{
	news_date:'21st May, 2015',
	desc:'12 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	
	news_date:'21st May, 2015',
	desc:'13 CTF is organizing a Hackathon on May 29th at Turing Hall. Visit the FB link for more deets!',
	fb_link:'goo.gl/hack-turing/'
},
{
	news_date:'21st May, 2015',
	desc:'14 Keep calm and wait for PA _/\\_',
	fb_link:'goo.gl/da_boss/'
},
{
	news_date:'21st May, 2015',
	desc:'15 Keep calm and wait for PA Last News_/\\_',
	fb_link:'goo.gl/da_boss/'
}
];

  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;

  $scope.range = function() {
    var rangeSize = 3;
    var ret = [];
    var start;

    start = $scope.currentPage;

    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };


  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }

   angular.element($(".navnos").removeClass("pageNow"));
   
   angular.element($("#"+$scope.currentPage)).addClass("pageNow");
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
      
    }

   angular.element($(".navnos").removeClass("pageNow"));
   
   angular.element($("#"+$scope.currentPage)).addClass("pageNow");
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

  $scope.setPage = function($event, n) {
    // if (n > 0 && n < $scope.pageCount()) {
      $scope.currentPage = n;
    //  alert($scope.currentPage);
    
    $scope.newsItems = $scope.getfn(n*$scope.itemsPerPage, $scope.itemsPerPage);
   
   angular.element($(".navnos").removeClass("pageNow"));
   
   angular.element($event.currentTarget).addClass("pageNow");
   
    // }
  };

  $scope.$watch("currentPage", function(newValue, oldValue) {
    
    $scope.newsItems = $scope.getfn(newValue*$scope.itemsPerPage, $scope.itemsPerPage);
    $scope.total = $scope.totalfn();
  	
  });

$scope.getfn = function( offset, limit ){
	
	return items.slice( offset, offset+limit );
};

$scope.totalfn = function(){
	
	return items.length;

};
}]);




/** Navbar **/

myApp.controller('navController',['$scope',function($scope){

$scope.animateMe = function(outerContainer){
	var myscope = angular.element(document.getElementById(outerContainer)).scope();
$(outerContainer).animate({'opacity':"1"},200);
};
$scope.navItems = [
		{ name: 'Home',
		linkTo: '#/home',
		fa: 'navicons fa fa-home',
		outerContainer:'#Home',
		aclass:'navelem'

		},

		{ name: 'Projects',
		linkTo: '#/allprojects',
		fa: 'navicons fa fa-lightbulb-o',
		outerContainer:'#projects',
		aclass:'navelem'

		},
		{ name: 'Tech Blog',
		linkTo: '#/allposts',
		fa: 'navicons fa fa-code',
		outerContainer:'#posts',
		aclass:'navelem'
		},
		{
		name: 'Student Directors',
		linkTo: '#/kores',
		fa: 'navicons  fa fa-graduation-cap',
		outerContainer:'#contactDetails',
		aclass:'navelem'
		},
		{
		name:'Clubs',
		linkTo:'#/clubs',
		fa: 'navicons fa fa-soccer-ball-o',
		outerContainer:'#clubs',
		aclass:'navelem'
		},
		{
		name:'CTF',
		linkTo:'#/ctf',
		fa: 'navicons fa fa-university',
		outerContainer:'#about',
		aclass:'navelem'
		}

				];
}]);

/** Contacts **/
myApp.controller('koreController',['$scope',function($scope){
$scope.hello = "PROJECTS";

$scope.animateMe = function(outerContainer){
	console.log("hey");
	$(outerContainer).animate({'opacity':"1",'marginTop':"0"},200);
};


$scope.initContacts = function(){
	angular.copy($scope.creativity,$scope.contactList);
	$scope.bucket = 'creativity';
};
$scope.bucketCircles = [

		{ bucketname: 'creativity',
		  fa: 'fa fa-paint-brush'
		  
		},
		{ bucketname: 'events',
		fa: 'fa fa-bullhorn'
		},
		{
		bucketname: 'finance',
		fa: ' fa fa-money'
		},
		{
		bucketname:'hr',
		fa: 'fa fa-group'
		},
		{
		bucketname:'ir',
		fa: 'fa fa-inr'
		},
		{
		bucketname:'media',
		fa: 'fa fa-camera'
		},
		{
		bucketname:'ops',
		fa: 'fa fa-truck'
		},
		{
		bucketname:'tech',
		fa: 'fa fa-laptop'
		}];

$scope.creativity = [
		  {
		  	image:'images/yellow.jpg',
		  	name:'Sudar',
		  	team:'Creativity',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'creativity@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Halidha',
		  	team:'Creativity',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'creativity@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Jo',
		  	team:'Design',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'design@krk.org.in'

		  },
		   {
		  	image:'images/yellow.jpg',
		  	name:'Pavithra',
		  	team:'Design',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'design@krk.org.in'

		  }];

$scope.events = [
	  {
		  	image:'images/yellow.jpg',
		  	name:'Adharsh',
		  	team:'Events',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'events@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Rahul',
		  	team:'Xceed',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'xceed@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Sairam',
		  	team:'Guest Lectures',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'guestlectures@krk.org.in'

		  },

		  {
		  	image:'images/yellow.jpg',
		  	name:'Gayathri',
		  	team:'Guest Lectures',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'guestlectures@krk.org.in'

		  },
		   {
		  	image:'images/yellow.jpg',
		  	name:'Sanjai',
		  	team:'Workshops',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'workshops@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Navneeth',
		  	team:'Workshops',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'workshops@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Sangeetha',
		  	team:'K!arnival',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'karnival@krk.org.in'

		 }];

$scope.marketing = [
		  {
		  	image:'images/yellow.jpg',
		  	name:'Swetha',
		  	team:'Media',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'media@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Anush',
		  	team:'Marketing',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'media@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Ananth',
		  	team:'Marketing',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'media@krk.org.in'

		  }];

$scope.finance =[	  {
		  	image:'images/yellow.jpg',
		  	name:'Shahin',
		  	team:'Finance',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'finance@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Shahrukh',
		  	team:'Finance',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'finance@krk.org.in'

		  }];

$scope.hr = [		  {
		  	image:'images/yellow.jpg',
		  	name:'Hafeeza',
		  	team:'HR',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'hr@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Mukesh',
		  	team:'HR',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'hr@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Mithul',
		  	team:'HR',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'hr@krk.org.in'

		  }];

$scope.ir = [  {
		  	image:'images/yellow.jpg',
		  	name:'Ramya',
		  	team:'IR',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'industryrelations@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Priyadarshan',
		  	team:'IR',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'industryrelations@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Navnith',
		  	team:'IR',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'industryrelations@krk.org.in'

		  }];

$scope.ops = [  {
		  	image:'images/yellow.jpg',
		  	name:'Ramprakash',
		  	team:'Logistics',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'logistics@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Venkatesh',
		  	team:'Logistics',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'logistics@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Haritha',
		  	team:'Hospitality',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'hospitality@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Keerthi',
		  	team:'Hospitality',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'hospitality@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Vigneshwar',
		  	team:'Hospitality',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'hospitality@krk.org.in'

		  }];
$scope.tech =[		  {
		  	image:'images/yellow.jpg',
		  	name:'Baratheraja',
		  	team:'Tech',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'techops@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Gowtham',
		  	team:'Tech',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'techops@krk.org.in'

		  },
		  {
		  	image:'images/yellow.jpg',
		  	name:'Shriya',
		  	team:'Tech',
		  	desc:'Something about them. Hey! I\'m part of the Tech team :) I love reading and staring at chocolate *_* ',
			phone:'+91 9999999999',
			mail:'techops@krk.org.in'

		  }];

$scope.contactList = [];
$scope.bucket = '';

$scope.showContacts = function(bname){

	angular.element(document.querySelector('#'+bname)).addClass("activeKore").css({'background':"tomato"});
	if( $scope.bucket != '')
	angular.element(document.querySelector('#'+$scope.bucket)).removeClass("activeKore").css({'background':"#000"});
	switch(bname){
		case 'creativity': angular.copy($scope.creativity,$scope.contactList); break;
		case 'events': angular.copy($scope.events,$scope.contactList); break;
		case 'finance': angular.copy($scope.finance,$scope.contactList); break;
		case 'hr': angular.copy($scope.hr,$scope.contactList); break;
		case 'ir': angular.copy($scope.ir,$scope.contactList); break;
		case 'marketing': angular.copy($scope.marketing,$scope.contactList); break;
		case 'tech': angular.copy($scope.tech,$scope.contactList); break;
		case 'ops': angular.copy($scope.ops,$scope.contactList); break;
			
	}
	$scope.bucket = bname;


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
