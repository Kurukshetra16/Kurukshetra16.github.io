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
						// console.log('Outside')
						// console.log(boids.indexOf(this));
						// index = boids.indexOf(this);
						// console.log(index+' '+birds.length);

						// boids.splice(index,1);

						// birds.splice(index,1);
						// console.log('a '+index+' '+birds.length);
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

					// _acceleration.add( this.alignment( boids ) );
					// _acceleration.add( this.cohesion( boids ) );
					// _acceleration.add( this.separation( boids ) );

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

				//

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

					// var boid, distance,
					// posSum = new THREE.Vector3(),
					// repulse = new THREE.Vector3();

					// for ( var i = 0, il = boids.length; i < il; i ++ ) {

					// 	if ( Math.random() > 0.6 ) continue;

					// 	boid = boids[ i ];
					// 	distance = boid.position.distanceTo( this.position );

					// 	if ( distance > 0 && distance <= _neighborhoodRadius ) {

					// 		repulse.subVectors( this.position, boid.position );
					// 		repulse.normalize();
					// 		repulse.divideScalar( distance );
					// 		posSum.add( repulse );

					// 	}

					// }

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
			    // var letters = '0123456789ABCDEF'.split('');
			    // var color = '#';
			    // for (var i = 0; i < 6; i++ ) {
			    //     color += letters[Math.floor(Math.random() * 16)];
			    // }
			    return '#FFF';
			}

			var color;

			function addBird(i,goal){
				color = new THREE.Color( getRandomColor() );
				boid = boids[ i ] = new Boid();
					boid.position.x = SCREEN_WIDTH/2 + Math.random() * 400 - 200;
					boid.position.y = SCREEN_HEIGHT/2 + Math.random() * 400 - 200;
					boid.position.z = Math.random() * 400 - 200;
					// boid.velocity.x = Math.random() * 2 - 1;
					// boid.velocity.y = Math.random() * 2 - 1;
					// boid.velocity.z = Math.random() * 2 - 1;
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
				// console.log(currentx+' '+currenty+' '+(finalx-currentx)+' '+(finaly-currenty));
				currentx=(finalx-currentx)/step+currentx;
				currenty=(finaly-currenty)/step+currenty;
				var deviationx = ((SCREEN_WIDTH/2-currentx)/SCREEN_WIDTH)*450;
				var deviationy = ((SCREEN_HEIGHT/2-currenty)/SCREEN_HEIGHT)*450;
				camera.position.z = Math.sqrt(450*450-deviationx*deviationx-deviationy*deviationy);
				camera.position.x = deviationx;
				camera.position.y = deviationy;
				// currentx = camera.position.x;
				// currenty = camera.position.y; 
				var center = new THREE.Vector3(0,0,0);
				camera.lookAt(center);
			}

			var mouse_vector;


			function init() {

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 100;
				currentx = 0;
				currenty = 0;

				// character.happy(0,0,r*2);
				// setTimeout(function(){character.happy(0,0,r*2);changeGoals();},10000);
				
				console.log(goal_length);

				scene = new THREE.Scene();

				birds = [];
				boids = [];

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.left = '0px';
				stats.domElement.style.top = '0px';

				document.getElementById( 'container' ).appendChild(stats.domElement);
				// addBird(0);

				// for ( var i = 0; i < 200; i ++ ) {
				// 	addBird(i);
				// }


				renderer = new THREE.CanvasRenderer();
				renderer.setClearColor( 0x041134 );
				// if(SCREEN_WIDTH>1400){
				// 	SCREEN_WIDTH = SCREEN_WIDTH*1.211;
				// 	SCREEN_HEIGHT = SCREEN_HEIGHT*1.211;
				// }
				// renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

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
				// if(width>1440){
				// 	width = width*1.22;
				// 	height = height*1.22;
				// }
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

			//
			var oldcount=0;
			var limit=200;
			function animate() {
				stats.update();
				if(stats.getms()<40 && count<limit){
					// for(var i=0;i<10;i++){
						if(Math.random()<0.1){
							addBird(count,shape[count%goal_length]);
							boids[count].repulse(mouse_vector);
							count=count+1;
						}
					// }
				}else{
					if(oldcount != count)
						console.log(count);
					// else
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
					// color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;

					bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
					bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

					// bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
					// bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;

				}

				renderer.render( scene, camera );

			}