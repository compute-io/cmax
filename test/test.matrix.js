/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	cmax = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix cmax', function tests() {

	var out1, out2,
		mat,
		d1, d2, d3;

	d1 = new Int16Array( [ 8, 7, 6, 5, 4, 3, 2, 1, 0 ] );
	d2 = new Int16Array( [ 8, 8, 8, 5, 5, 5, 2, 2, 2 ] );
	d3 = new Int16Array( [ 8, 7, 6, 8, 7, 6, 8, 7, 6 ] );

	beforeEach( function before() {
		mat = matrix( d1, [3,3], 'int16' );
		out1 = matrix( d2, [3,3], 'int16' );
		out2 = matrix( d3, [3,3], 'int16' );
	});

	it( 'should export a function', function test() {
		expect( cmax ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			cmax( matrix( [10,10] ), mat );
		}
	});

	it( 'should compute the cumulative maximum along matrix columns', function test() {
		var actual;

		actual = matrix( [3,3], 'int16' );
		actual = cmax( actual, mat, 2 );

		assert.deepEqual( actual.data, out1.data );
	});


	it( 'should compute the cumulative maximum along matrix rows', function test() {
		var actual;

		actual = matrix( [3,3], 'int16' );
		actual = cmax( actual, mat, 1 );

		assert.deepEqual( actual.data, out2.data );
	});


	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( cmax( out, mat ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( cmax( out, mat ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( cmax( out, mat ).data, expected );
	});

});
