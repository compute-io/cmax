/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

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

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
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

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cmax( matrix( [2,2] ), {
					'dim': value
				});
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

	it( 'should compute the cumulative maximum for a typed array', function test() {
		var data, expected, results;

		data = new Int32Array( [ 2, 4, 5, 3, 8, 2 ] );
		expected = new Int32Array( [ 2, 4, 5, 5, 8, 8 ] );

		results = cmax( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should compute the cumulative maximum using an accessor', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = [ 2, 4, 5, 5, 8, 8 ];
		actual = cmax( data, {
			'accessor': getValue
		});
		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the cumulative maximum and mutate the input array', function test() {
		var data, expected, results;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = [ 2, 4, 5, 5, 8, 8 ];

		results = cmax( data, {
			'copy': false
		});

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
		assert.ok( results === data );
	});

	it( 'should compute the cumulative maximum and mutate a typed input array', function test() {
		var data, expected, results;

		data = new Int32Array(  [ 2, 4, 5, 3, 8, 2 ] );
		expected = new Int32Array( [ 2, 4, 5, 5, 8, 8 ] );

		results = cmax( data, {
			'copy': false
		});

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
		assert.ok( results === data );
	});

	it( 'should compute the cumulative maximum using an accessor and mutate the input array', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		actual = cmax( data, {
			'accessor': getValue,
			'copy': false}
		);
		expected = [ 2, 4, 5, 5, 8, 8 ];
		assert.ok( actual === data );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});


	it( 'should compute the cumulative maximum along matrix columns', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		expected = matrix( d2, [3,3], 'int16' );
		data = matrix( d1, [3,3], 'int16' );

		actual = cmax( data );

		assert.deepEqual( actual.data, expected.data );

		// Mutate...
		actual = cmax( data, {
			'copy': false,
			'dim': 2
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual.data, d2 );
	});

	it( 'should compute the cumulative maximum along matrix rows', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		expected = matrix( d2, [3,3], 'int16' );
		data = matrix( d1, [3,3], 'int16' );

		actual = cmax( data, {
			'dim': 1
		});

		assert.deepEqual( actual.data, expected.data );

		// Mutate...
		actual = cmax( data, {
			'copy': false,
			'dim': 1
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual.data, d2 );
	});

});
