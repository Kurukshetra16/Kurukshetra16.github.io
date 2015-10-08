var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;
var slope = SCREEN_HEIGHT/SCREEN_WIDTH;
var camera, scene, renderer, allow_camera_move,
    birds, bird;
var boid, boids;
var stats;
var shape = [];
var offsetx_start,offsety_start;
var goal_length = 0
init();
animate();
function render(){}
var count=0;
function getRandomColor() {
	return '#FFF';
}
var color;

var finalx=890,finaly=120,finalz,currentx=100,currenty=100,currentz;
$(document).mousemove(function(e){
	finalx = e.pageX;
	finaly = e.pageY;
});



function moveCam(step){
	currentx=(finalx-currentx)/step+currentx;
	currenty=(finaly-currenty)/step+currenty;
	var deviationx = ((SCREEN_WIDTH/2-currentx)/SCREEN_WIDTH)*450;
	var deviationy = ((SCREEN_HEIGHT/2-currenty)/SCREEN_HEIGHT)*450;
	// camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
	// camera.position.z = 450;
	camera.position.z = +Math.sqrt(450*450-deviationx*deviationx-deviationy*deviationy);
	camera.position.x = deviationx;
	camera.position.y = deviationy;
	var center = new THREE.Vector3(0,0,0);
	camera.lookAt(center);
}
var mouse_vector;
function init() {
	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
	camera.position.z = 450;
	currentx = 0;
	currenty = 0;
	console.log(goal_length);
	scene = new THREE.Scene();
	birds = [];
	boids = [];
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById( 'container' ).appendChild(stats.domElement);
	renderer = new THREE.CanvasRenderer();

	var date = new Date();
	var hours = date.getHours();
	var ampm = hours >= 12 ? 'pm' : 'am';
	var script = "js/birds/Comet.js"
	if(ampm == 'am')
	{	
		renderer.setClearColor( 0x012D42 );
		script = "js/birds/Bird.js"
		allow_camera_move = false;
		offsety_start = 0;
		offsetx_start = 0;
	}
	else
	{
		renderer.setClearColor( 0x000720 );
		script = "js/birds/Comet.js"
		allow_camera_move = true;
		offsety_start = SCREEN_HEIGHT/2;
		offsetx_start = SCREEN_WIDTH/2;
	}
	$.getScript( script )
		  .done(function( script, textStatus ) {
		    console.log( textStatus );
		  })
		  .fail(function( jqxhr, settings, exception ) {
		    $( "div.log" ).text( "Triggered ajaxError handler." );
		});

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.body.appendChild( renderer.domElement );
	onWindowResize();
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	width = window.innerWidth;
	height = window.innerHeight;
	width = width*1.25*1.23;
	height = height*1.25*1.23;
	renderer.setSize( width, height );
}
function onDocumentMouseMove( event ) {
	mouse_vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );
	for ( var i = 0, il = boids.length; i < il; i++ ) {
		boid = boids[ i ];
		mouse_vector.z = boid.position.z;
		boid.repulse( mouse_vector );
	}
}
var oldcount=0;
var limit=200;
function animate() {
	stats.update();
	if(stats.getms()<40 && count<limit){
		if(Math.random()<0.7){
			addBird(count,shape[count%goal_length]);
			boids[count].repulse(mouse_vector);
			count=count+1;
		}
	}else{
		if(oldcount != count)
			console.log(count);
		oldcount = count;
	}
	if(allow_camera_move)
		moveCam(20);
	requestAnimationFrame( animate );
	render();
}
var toggle = 0;
var total = 10;
function updateProgress(){
	$('#progress').html(toggle+'/'+total);
}
updateProgress();
function changeGoals(){
	for(var i=0;i<boids.length;i++){
		boids[i].setGoal(shape[i%goal_length]);
	}
}
var stop = false;
function addBird(i,goal){
	color = new THREE.Color( getRandomColor() );
	boid = boids[ i ] = new Boid();
	// boid.position.x = Math.random() * 400 - 200;
	// boid.position.y = Math.random() * 400 - 200;
	boid.position.x = offsetx_start + Math.random() * SCREEN_WIDTH - 200;
	boid.position.y = offsety_start + Math.random() * SCREEN_HEIGHT - 200;
	boid.position.z = Math.random() * 400 - 200;
	boid.setAvoidWalls( true );
	boid.setWorldSize( SCREEN_WIDTH, SCREEN_HEIGHT, 400 );
	if(goal)
		boid.setGoal(goal);
	var materials = [new THREE.MeshBasicMaterial({
		color : 0xffffff,  side: THREE.DoubleSide 
	}), new THREE.MeshBasicMaterial({
		color : 0xFFE0A4,  side: THREE.DoubleSide 
	})];
	material = new THREE.MeshBasicMaterial( { color: color,  side: THREE.DoubleSide } ) ;
	// bird = birds[ i ] = new THREE.Mesh( new Bird(slope), new THREE.MeshFaceMaterial(materials));
	bird = birds[ i ] = new THREE.Mesh( new Bird(slope) , material);
	bird.phase = Math.floor( Math.random() * 62.83 );
	scene.add( bird );
}