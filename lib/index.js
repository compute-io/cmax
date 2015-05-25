'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );

// CMAX //

/**
* FUNCTION: cmax( arr[, options] )
*	Computes the cumulative maximum of a numeric array.
*
* @param {Number[]|Array} arr - numeric array
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @returns {Number[]|Null} cumulative max or null
*/
function cmax( arr, opts ) {
	var copy = true,
		clbk;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'cmax()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
				throw new TypeError( 'cmin()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
			}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'cmin()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'cmin()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}
	var len = arr.length,
		v,
		max,
		i,
		val;

	if ( !len ) {
		return null;
	}

	if ( copy ) {
		v = new Array( len );
	} else {
		v = arr;
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
