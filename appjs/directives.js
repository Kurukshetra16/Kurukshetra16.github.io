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

// GLAnim
myApp.directive('glAnim', function() {
       console.log("glAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
  $(".glCircle").on("click",function(){
  $(".glCircle").removeClass("glBigBorder");
  $(this).addClass("glBigBorder");
});
}
};
});
/*hospi anim*/
myApp.directive('hospiAnim', function() {
        console.log("hospiAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
            
  $(".node").click(function(){
  if($(this).hasClass("node-active"))
    return;
  $(".node").removeClass("node-active");
  $(this).addClass("node-active");
  $(".hospi_content").removeClass("hospi_animated");
  var nodeid = $(this).attr("id");
  var total = 6;
  if( $(window).width() >= 640)
  {   
      if(nodeid == total)
        $(".longer-line").css({'width':"100%"});
      else
        $(".longer-line").css({'width':(nodeid*85)/total+"%"});
  }
  else
      $(".longer-line").css({'width':"100%"});
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
$(document).ready(function(){
$(".home-event-circle").find(".circle-icon").removeClass("selectedNavElem");
$(".home-event-circle").removeClass("removeBB");
$("#eventsNav").find(".circle-icon").addClass("selectedNavElem");
$("#eventsNav").addClass("removeBB");
$(".close").click(function(){
  closeall();
});
$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
      closeall();
    }
});    
function closeall(){
  console.log("closing..."+"booyaaaaaah");
  $(".footer").fadeIn(0);
$(".tab").hide();
    $(".imagebox").each(function(i){
      var elem = $(this);
      $(".footer").show(0);
      setTimeout(function(){
        $(elem).animate({'opacity':"1",'margin-left':"0px"},100);
      },i*50+50);
    });
    $(".left").animate({'marginLeft':"-100%"},300,'easeInOutQuad');
}

$(".navbar-toggle").click(function(){
  closeall();
  
});
});
           }
        };
    });
/*xceed anim*/
myApp.directive('xceedAnim', function() {
        console.log("xceedAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
$(document).ready(function(){
          $(".home-event-circle").find(".circle-icon").removeClass("selectedNavElem");
          $(".home-event-circle").removeClass("removeBB");
          $("#xceed").addClass("selectedNavElem");
          $("#xceed").parent().parent().addClass("removeBB");
$(".close").click(function(){
  closeall();
});
$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
      closeall();
    }
});    

function closeall(){
    $(".place").each(function(i){
      var elem = $(this);
      setTimeout(function(){
        $(elem).fadeIn(100*i);
      },i*50+50);
    });
    $(".left").animate({'marginLeft':"-100%",'opacity':"0"},300,'easeInOutQuad');
}

$(".navbar-toggle").click(function(){
  closeall();
});
});
           }
        };
    });
/*contacts anim*/
myApp.directive('contactsAnim', function() {
        console.log("contactsAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
            $(".bucketCircle").click(function(){
                $(".left").animate({'marginLeft':"0"},1000,'easeInQuad');
                });

    }
};
});