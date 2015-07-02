/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cmax = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array cmax', function tests() {

	it( 'should export a function', function test() {
		expect( cmax ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative maximum', function test() {
		var data, actual, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = [ 2, 4, 5, 5, 8, 8 ];

		actual = new Array( data.length );
		actual = cmax( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( cmax( [], [] ), [] );
	});

});
