

var Bird = function (slope) {

	var scope = this;

	THREE.Geometry.call( this );

	v(   1,   0,   0 );
	v( 0, 1,   0 );
	v( 0.5,   0.5,   1 );
	v( -10, -10*slope*slope, 0.5 );
	// console.log(slope);

	// v(   0,   2, - 6 );
	// v(   0,   2,   6 );
	// v(   2,   0,   0 );
	// v( - 3,   0,   0 );

	f3( 0, 2, 1 );
	f3( 0, 3, 2 );

	f3( 3, 2, 1 );
	f3( 3, 1, 0 );

	this.computeFaceNormals();

	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	}

	function f3( a, b, c ) {
		scope.faces.push( new THREE.Face3( a, b, c ) );
	}

}

Bird.prototype = Object.create( THREE.Geometry.prototype );
