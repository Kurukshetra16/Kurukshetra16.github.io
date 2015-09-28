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
  jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);//#3
        var copy_from = $(this).clone(true);//clicked
        $(this).replaceWith(copy_to);
        $(to).replaceWith(copy_from);
    });
};
       console.log("glAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){

$(".glCircle").on("click",function(){
  // console.log($(this).attr('id'));
  // var selector2 = $(".glCircle:eq(2)").parent();
  $(".glCircle").removeClass("glBigBorder");
  $(this).addClass("glBigBorder");
  //$(selector2).find(".glCircleName").addClass("glNameNoAnim");
  // var middle = $(selector2).find('.glCircle')[0];
  // console.log($(middle));
  // if($(this).attr('id') != $(middle).attr('id')){
  //   $(this).parent().swapWith(selector2);
  // }
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
  $(".node").removeClass("node-active");
  $(this).addClass("node-active");
  $(".hospi_content").removeClass("hospi_animated");
  var nodeid = $(this).attr("id");
  var total = 6;
  if( $(window).width() >= 600)
  {   if(nodeid == total)
        $(".longer-line").css({'background':"rgb(250,16,14)",'width':"100%"});
      else
        $(".longer-line").css({'background':"rgb(250,16,14)",'width':(nodeid*85)/total+"%"});
  
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
  var total = 4;
  if( $(window).width() >= 600)
  {   if(nodeid == total)
        $(".longer-line").css({'background':"rgb(250,16,14)",'width':"100%"});
      else
      $(".longer-line").css({'background':"rgb(250,16,14)",'width':(nodeid*85)/total+"%"});
  
  }
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
function closeall(){
    $(".left").animate({'marginLeft':"-100%"},1000,'easeOutElastic');
    $(".right").animate({'marginLeft':"-100%"},1000,'easeOutElastic');
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
                $(".left").animate({'marginLeft':"0"},1000);
            });

    }
};
});