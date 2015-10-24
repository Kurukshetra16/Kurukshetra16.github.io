var Boid = function() {
	var vector = new THREE.Vector3(),
	_acceleration, _width = 500, _height = 500, _depth = 200, _goal, _neighborhoodRadius = 100,
	_maxSpeed = SCREEN_WIDTH/(Math.random()*200+360), _maxSteerForce = 0.1, _avoidWalls = true, _mouse_pos=null;

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
			// 	// console.log('Outside')
			// 	// console.log(boids.indexOf(this));
			// 	// index = boids.indexOf(this);
			// 	// console.log(index+' '+birds.length);

			// 	// boids.splice(index,1);

			// 	// birds.splice(index,1);
			// 	// console.log('a '+index+' '+birds.length);
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
		if ( distance < SCREEN_WIDTH/10 ) {

			var steer = new THREE.Vector3();

			// steer.subVectors(  target, this.position );
			steer.subVectors(  this.position, target );
			steer.multiplyScalar( -0.1 / distance );

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



var Bird = function (slope) {

	var scope = this;

	THREE.Geometry.call( this );

	v( 1, 0, 0 );//0
	v( 0, 1, 0 );//1
	v( 0.8, 0.8, 1 );//2
	v( -10, -10*slope*slope, 0.5 );//3
	v( 5, 5*slope*slope, 0.5 );//4
	// console.log(slope);

	// v(   0,   2, - 6 );
	// v(   0,   2,   6 );
	// v(   2,   0,   0 );
	// v( - 3,   0,   0 );



	// f3( 0, 2, 1 , 0);
	f3( 0, 3, 2 , 1);

	f3( 3, 2, 1 , 1);
	f3( 3, 1, 0 , 1);

	f3( 0, 2, 1 , 0);
	f3( 0, 4, 2 , 0);

	f3( 4, 2, 1 , 0);
	f3( 4, 1, 0 , 0);

	this.computeFaceNormals();

	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	}

	function f3( a, b, c , i) {
		var face = new THREE.Face3( a, b, c );
		face.materialIndex = i;
		scope.faces.push( face );
	}

	

}

Bird.prototype = Object.create( THREE.Geometry.prototype );
Bird.prototype.constructor = Bird;

function render() {
	if(!stop){
		for ( var i = 0, il = birds.length; i < il; i++ ) {
			boid = boids[ i ];
			// if(boid.moving){
			boid.run( boids );
			// }

			bird = birds[ i ];
			bird.position.copy( boids[ i ].position );

			color = bird.material.color;
			// color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;

			bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
			bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );
			
			// bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
			// bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;

		}
	}
	renderer.render( scene, camera );
}
