var myApp = angular.module('myAppDirectives',[]);
myApp.directive('compile', ['$compile', function ($compile) {

				return function(scope, element, attrs) {

				var ensureCompileRunsOnce = scope.$watch(

						function(scope) {

						return scope.$eval(attrs.compile);

						},

						function(value) {

						console.log(value);

						element.html(value);

						$compile(element.contents())(scope);

						}

				);

				};

}]);
/*hospi anim*/
myApp.directive('hospiAnim', function() {
        console.log("hospiAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
        		
$(".node").click(function(){
  $(".node").removeClass("node-active");
  $(this).addClass("node-active");
  $(".hospi_content").removeClass("hospi_animated");
  var nodeid = $(this).attr("id");
  if( $(window).width() >= 600)
  {
  if(nodeid == 'intro')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"8%"});
  else if(nodeid == 'instr')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"24%"});
  else if(nodeid == 'accom')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"40%"});
  else if(nodeid == 'reachceg')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"57%"});
  else if(nodeid == 'faq')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"74%"});
  else if(nodeid == 'contact')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"100%"});
  }
setTimeout(function(){$(".hospi_content").addClass("hospi_animated");},500);
  
});       	}
        };
    });
/*about anim*/
myApp.directive('aboutAnim', function() {
        console.log("aboutAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){

$(".node").click(function(){
  $(".node").removeClass("node-active");
  $(this).addClass("node-active");
  $(".hospi_content").removeClass("hospi_animated");

  var nodeid = $(this).attr("id");
  if(nodeid == 'intro')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"24%"});
  else if(nodeid == 'instr')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"40%"});
  else if(nodeid == 'accom')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"57%"});
  else if(nodeid == 'reachceg')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"100%"});
  else if(nodeid == 'faq')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"74%"});
  else if(nodeid == 'contact')
  $(".longer-line").css({'background':"rgb(255,200,0)",'width':"100%"});

setTimeout(function(){$(".hospi_content").addClass("hospi_animated");},500);

});         }
        };
    });
/*tabs anim*/
myApp.directive('tabsAnim', function() {
        console.log("tabsAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
$(".cd-tabs li").click(function(){
  var id = $(this).find("a").attr("id")+"1";
  //$(".cd-tabs li").removeClass("selected");
  $(this).addClass("selected");
  
});
           }
        };
    });