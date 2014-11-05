/**
*
*	COMPUTE: cmax
*
*
*	DESCRIPTION:
*		- Computes the cumulative maximum of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: cmax( arr )
*	Computes the cumulative maximum of a numeric array.
*
* @param {Array} arr - numeric array
* @returns {Array} cumulative max
*/
function cmax( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'cmax()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length,
		v = new Array( len ),
		max;

	max = arr[ 0 ];
	v[ 0 ] = max;
	for ( var i = 1; i < len; i++ ) {
		if ( arr[ i ] > max ) {
			max = arr[ i ];
		}
		v[ i ] = max;
	}
	return v;
} // end FUNCTION cmax()


// EXPORTS //

module.exports = cmax;
