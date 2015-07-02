'use strict';

// CUMULATIVE MAXIMUM //

/**
* FUNCTION: cmax( out, arr )
*	Computes the cumulative maximum of an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cmax( v, arr ) {
	var len = arr.length,
		max,
		i;

	if ( len ) {
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
