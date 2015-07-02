'use strict';

// CUMULATIVE MAXIMUM //

/**
* FUNCTION: cmax( out, matrix[, dim] )
*	Computes the cumulative maximum along a matrix dimension.
*
* @param {Matrix} out - output matirx
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute the cumulative maximum. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix} output matrix
*/
function cmax( out, mat, dim ) {

	var M, N,
		s0, s1,
		o,
		i, j, k,
		max,
		val;

	if ( out.length !== mat.length ) {
		throw new Error( 'cmax()::invalid input arguments. Input and output matrices must be the same length.' );
	}

	if ( dim === 1 ) {
			// Compute along the rows...
			M = mat.shape[ 1 ];
			N = mat.shape[ 0 ];
			s0 = mat.strides[ 1 ];
			s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		max = mat.data[ k ];
		out.data[ k ] = max;
		for ( j = 1; j < N; j++ ) {
			val = mat.data[ k + j*s1 ];
			if ( val > max ) {
				max = val;
			}
			out.data[ k + j*s1 ]  = max;
		}
	}
	return out;
} // end FUNCTION cmax()


// EXPORTS //

module.exports = cmax;
