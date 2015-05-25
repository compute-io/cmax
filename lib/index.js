'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );

// CMAX //

/**
* FUNCTION: cmax( arr[, accessor] )
*	Computes the cumulative maximum of a numeric array.
*
* @param {Number[]|Array} arr - numeric array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number[]|Null} cumulative max or null
*/
function cmax( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'cmax()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 && !isFunction( clbk ) ) {
		throw new TypeError( 'cmax()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
	}
	var len = arr.length,
		v = new Array( len ),
		max,
		i,
		val;

	if ( !len ) {
		return null;
	}

	if ( clbk ) {
		max = clbk( arr[ 0 ], 0 );
		v[ 0 ] = max;
		for ( i = 1; i < len; i++ ) {
			val = clbk( arr[ i ], i );
			if ( val > max ) {
				max = val;
			}
			v[ i ] = max;
		}
	} else {
		max = arr[ 0 ];
		v[ 0 ] = max;
		for ( i = 1; i < len; i++ ) {
			if ( arr[ i ] > max ) {
				max = arr[ i ];
			}
			v[ i ] = max;
		}
	}

	return v;
} // end FUNCTION cmax()


// EXPORTS //

module.exports = cmax;
