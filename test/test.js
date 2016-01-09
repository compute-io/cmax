'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cmax = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-cmax', function tests() {

	it( 'should export a function', function test() {
		expect( cmax ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cmax( value );
			};
		}
	});

	it( 'should compute the cumulative maximum', function test() {
		var data, expected, results;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = [ 2, 4, 5, 5, 8, 8 ];

		results = cmax( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it('should distinguish -0 from 0', function test(){
		var data, expected, actual;
		data = [-0,0];
		expected = Infinity;

		actual = 1/cmax(data)[1];
		assert.equal( actual, expected );
	});

	it('should distinguish 0 from -0', function test(){
		var data, expected, actual;
		data = [0,-0];
		expected = Infinity;

		actual = 1/cmax(data)[1];
		assert.equal( actual, expected );
	});
});
