var Boid = function() {
				var vector = new THREE.Vector3(),
				_acceleration, _width = 500, _height = 500, _depth = 200, _goal, _neighborhoodRadius = 100,
				_maxSpeed = SCREEN_WIDTH/560, _maxSteerForce = 0.1, _avoidWalls = true, _mouse_pos=null;

				this.position = new THREE.Vector3();
				this.velocity = new THREE.Vector3();
				_acceleration = new THREE.Vector3();
				var _moving = true;

				this.setGoal = function ( target ) {

					_goal = target;

				}

				this.setAvoidWalls = function ( value ) {

					_avoidWalls = value;

				}

				this.setWorldSize = function ( width, height, depth ) {

					_width = width;
					_height = height;
					_depth = depth;

				}
				this.moving = function(){
					return _moving;
				}

				this.run = function ( boids ) {

					speed = SCREEN_WIDTH/5;
					
					vector.set( -speed, -speed*slope, -10 );
					// vector = this.avoid( vector );
					vector.multiplyScalar( 0.001 );
					_acceleration.add( vector );

					this.move();
					if(this.position.x<0 || this.position.y<0){
						if(_moving){
							limit++;
						}
						_moving = false;
						

					}
					// console.log(this.position.x);

				}

				this.flock = function ( boids ) {

					if ( _goal ) {

						_acceleration.add( this.reach( _goal, 0.5 ) );

					}
				}

				this.move = function () {

					this.velocity.add( _acceleration );

					var l = this.velocity.length();

					if ( l > _maxSpeed ) {

						this.velocity.divideScalar( l / _maxSpeed );

					}

					this.position.add( this.velocity );
					_acceleration.set( 0, 0, 0 );
					this.repulse(_mouse_pos);

				}
				this.avoid = function ( target ) {

					var steer = new THREE.Vector3();

					steer.copy( this.position );
					steer.sub( target );

					steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );

					return steer;

				}

				this.repulse = function ( target ) {
					if(!target)
						return
					_mouse_pos = target;
					var distance = this.position.distanceTo( target );
					// console.log('hmm');
					if ( distance < SCREEN_WIDTH/20 ) {

						var steer = new THREE.Vector3();

						// steer.subVectors(  target, this.position );
						steer.subVectors(  this.position, target );
						steer.multiplyScalar( 1.0 / distance );

						_acceleration.add( steer );

					}

				}

				this.reach = function ( target, amount ) {

					var steer = new THREE.Vector3();

					steer.subVectors( target, this.position );
					steer.multiplyScalar( amount );
					return steer;
				}
				this.alignment = function ( boids ) {
					var boid, velSum = new THREE.Vector3(),
					count = 0;
					for ( var i = 0, il = boids.length; i < il; i++ ) {
						if ( Math.random() > 0.6 ) continue;
						boid = boids[ i ];
						distance = boid.position.distanceTo( this.position );
						if ( distance > 0 && distance <= _neighborhoodRadius ) {
							velSum.add( boid.velocity );
							count++;
						}
					}
					if ( count > 0 ) {
						velSum.divideScalar( count );
						var l = velSum.length();
						if ( l > _maxSteerForce ) {
							velSum.divideScalar( l / _maxSteerForce );
						}
					}
					return velSum;
				}
				this.cohesion = function ( boids ) {
					var boid, distance,
					posSum = new THREE.Vector3(),
					steer = new THREE.Vector3(),
					count = 0;
					for ( var i = 0, il = boids.length; i < il; i ++ ) {
						if ( Math.random() > 0.6 ) continue;
						boid = boids[ i ];
						distance = boid.position.distanceTo( this.position );
						if ( distance > 0 && distance <= _neighborhoodRadius ) {
							posSum.add( boid.position );
							count++;
						}
					}
					if ( count > 0 ) {
						posSum.divideScalar( count );
					}
					steer.subVectors( posSum, this.position );
					var l = steer.length();
					if ( l > _maxSteerForce ) {
						steer.divideScalar( l / _maxSteerForce );
					}
					return steer;
				}
				this.separation = function ( boids ) {
					return posSum;
				}
			}
			var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight,
			SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
			SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;
			var slope = SCREEN_HEIGHT/SCREEN_WIDTH;
			var camera, scene, renderer,
			birds, bird;
			var boid, boids;
			var stats;
			var shape = [];
			var goal_length = 0
			init();
			animate();
			var count=0;
			function getRandomColor() {
			    return '#FFF';
			}
			var color;
			function addBird(i,goal){
				color = new THREE.Color( getRandomColor() );
				boid = boids[ i ] = new Boid();
					boid.position.x = SCREEN_WIDTH/2 + Math.random() * 400 - 200;
					boid.position.y = SCREEN_HEIGHT/2 + Math.random() * 400 - 200;
					boid.position.z = Math.random() * 400 - 200;
					boid.setAvoidWalls( true );
					boid.setWorldSize( 500, 500, 400 );
					if(goal)
						boid.setGoal(goal);
					bird = birds[ i ] = new THREE.Mesh( new Bird(slope), new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide } ) );
					bird.phase = Math.floor( Math.random() * 62.83 );
					scene.add( bird );
			}
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
				camera.position.z = Math.sqrt(450*450-deviationx*deviationx-deviationy*deviationy);
				camera.position.x = deviationx;
				camera.position.y = deviationy;
				var center = new THREE.Vector3(0,0,0);
				camera.lookAt(center);
			}
			var mouse_vector;
			function init() {
				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 100;
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
				 if( hours>=7 && hours <= 17 ) 
				 {	
					renderer.setClearColor( 0x1F4979 );
				 }
				 else
				 {
					renderer.setClearColor( 0x000720 );
					}
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
						if(Math.random()<0.1){
							addBird(count,shape[count%goal_length]);
							boids[count].repulse(mouse_vector);
							count=count+1;
						}
				}else{
					if(oldcount != count)
						console.log(count);
						oldcount = count;
				}
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
			function render() {
				for ( var i = 0, il = birds.length; i < il; i++ ) {
					boid = boids[ i ];
					if(boid.moving){
						boid.run( boids );
					}
					bird = birds[ i ];
					bird.position.copy( boids[ i ].position );

					color = bird.material.color;
					bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
					bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );
				}
				renderer.render( scene, camera );
			}

var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    DOCUMENT_HEIGHT = $(document).height(),
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
	var date = new Date();
	var hours = date.getHours();
	var ampm = hours >= 12 ? 'pm' : 'am';
	if( hours>=7 && hours <= 17 )
		colors = ['#FD8016','#FEAF0D','#FEAF0D','#FFFFFF','#EF4607'];
	else
		colors = ['#00FEFD','#A0FEFD','#D6FEFD','#C4E8E7','#E0FFE9']
	color = colors[Math.floor(Math.random()*5)];
	return color;
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
	var deviationy = ((DOCUMENT_HEIGHT-currenty)/DOCUMENT_HEIGHT)*450;
	// camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
	// camera.position.z = 450;
	camera.position.z = +Math.sqrt(450*450-deviationx*deviationx-deviationy*deviationy);
	camera.position.x = deviationx;
	camera.position.y = deviationy;
	var center = new THREE.Vector3(0,0,0);
	camera.lookAt(center);
}//movecam
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

function webglAvailable() {
		try {
			var canvas = document.createElement('canvas');
			return !!( window.WebGLRenderingContext && (
				canvas.getContext( 'webgl' ) ||
				canvas.getContext( 'experimental-webgl' ) )
			);
			canvas.remove();
		} catch ( e ) {
			return false;
		}
	}//webglavail

	if (webglAvailable() ) {
		console.log('Using WebGL');
		renderer = new THREE.WebGLRenderer();
	} else {
		console.log('Using Canvas');
		renderer = new THREE.CanvasRenderer();
	}


	// renderer = new THREE.CanvasRenderer();

	var date = new Date();
	var hours = date.getHours();
	var ampm = hours >= 12 ? 'pm' : 'am';
	var script = "js/birds/Comet.js"
	if(hours>=7 && hours <= 17)
	{	
		renderer.setClearColor( 0x1F4979 );
		script = "js/birds/Bird.js"
		allow_camera_move = false;
		offsety_start = 0;
		offsetx_start = 0;
	}
	else
	{
		renderer.setClearColor( 0x000720 );
		// var canvas = document.createElement('canvas');
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
}//init
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	width = window.innerWidth;
	height = window.innerHeight;
	width = width*1.25*1.23;
	height = height*1.25*1.23;
	renderer.setSize( width, height );
}//winresize
function onDocumentMouseMove( event ) {
	mouse_vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );
	for ( var i = 0, il = boids.length; i < il; i++ ) {
		boid = boids[ i ];
		mouse_vector.z = boid.position.z;
		boid.repulse( mouse_vector );
	}
}//mousemove
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
}//animate
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
		color : 0xFEAF0D,  side: THREE.DoubleSide 
	}), new THREE.MeshBasicMaterial({
		color : 0xFEAF0D,  side: THREE.DoubleSide 
	})];
	material = new THREE.MeshBasicMaterial( { color: color,  side: THREE.DoubleSide } ) ;
	// bird = birds[ i ] = new THREE.Mesh( new Bird(slope), new THREE.MeshFaceMaterial(materials));
	bird = birds[ i ] = new THREE.Mesh( new Bird(slope) , material);
	bird.phase = Math.floor( Math.random() * 62.83 );
	scene.add( bird );

};




