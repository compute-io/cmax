'use strict';

// CUMULATIVE MAXIIMUM //

/**
* FUNCTION: cmax( out, arr, clbk )
*	Computes the cumulative maximum of an array using an accessor.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cmax( v, arr, clbk ) {
	var len = arr.length,
		i,
		val,
		max;

	if ( len ) {
		max = clbk( arr[ 0 ], 0 );
		v[ 0 ] = max;
		for ( i = 1; i < len; i++ ) {
			val = clbk( arr[ i ], i );
			if ( val > max ) {
				max = val;
			}
			v[ i ] = max;
		}
	}

	return v;
} // end FUNCTION cmax()


// EXPORTS //

module.exports = cmax;
