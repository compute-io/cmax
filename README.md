cmax
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative maximum.


## Installation

``` bash
$ npm install compute-cmax
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var cmax = require( 'compute-cmax' );
```

#### cmax( x[, options] )

Computes the cumulative maximum. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, arr;

data= [ 3, 2, 4, 3 ];
arr = cmax( data );
// returns [ 3, 3, 4, 4 ]
```

The function accepts three `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the cumulative maximima. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.
*  __dim__: dimension along which to compute the cumulative maximum when provided a matrix. Default: `2` (along the columns).

For non-numeric `arrays`, provide an accessor `function` for accessing `numeric` values.

``` javascript
var arr = [
	{'x':3},
	{'x':2},
	{'x':4},
	{'x':3},
];

function getValue( d ) {
	return d.x;
}

var m = cmax( arr, {
	'accessor': getValue
});
// returns [ 3, 3, 4, 4 ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.

By default, the function computes the cumulative maximum for a [`matrix`](https://github.com/dstructs/matrix) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

data = new Int8Array( 9 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = 8 - i;
}
mat = matrix( data, [3,3], 'int8' );
/*
	[  8  7  6  
	   5  4  3
	   2  1  0 ]
*/

out = cmax( mat );
/*
	[  8  8  8
	   5  5  5
	   2  2  2 ]
*/
```

To compute the cumulative maximum along the rows, set the `dim` option to `1`.

``` javascript
out = cmax( mat, {
	'dim': 1
});
/*
	[  8   7   6
	   8   7   6
	   8   7   6 ]
*/
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 3, 2, 4, 3 ];

out = cmax( data, {
	'copy': false
});
// returns [ 3, 3, 4, 4 ]

bool = ( data === out );
// returns true

data = new Int16Array( 9 );
for ( i = 0; i < 9; i++ ) {
	data[ i ] = 8 - i;
}
mat = matrix( data, [3,3], 'int16' );
/*
	[  8  7  6  
	   5  4  3
	   2  1  0 ]
*/

out = cmax( mat, {
	'copy': false
});
/*
	[  8  8  8
	   5  5  5
	   2  2  2 ]
*/

bool = ( mat === out );
// returns true
```



## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	cmax = require( 'compute-cmax' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
out = cmax( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = cmax( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 100 );
}
tmp = cmax( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [10,10], 'int32' );

out = cmax( mat );

out = cmax( mat, {
	'dim': 1
});

// Matrices (custom output data type)...
out = cmax( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The function returns an `array` with a length equal to the original input `array`.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/compute-cmax.svg
[npm-url]: https://npmjs.org/package/compute-cmax

[travis-image]: http://img.shields.io/travis/compute-io/cmax/master.svg
[travis-url]: https://travis-ci.org/compute-io/cmax

[coveralls-image]: https://img.shields.io/coveralls/compute-io/cmax/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/cmax?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/cmax.svg
[dependencies-url]: https://david-dm.org/compute-io/cmax

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/cmax.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/cmax

[github-issues-image]: http://img.shields.io/github/issues/compute-io/cmax.svg
[github-issues-url]: https://github.com/compute-io/cmax/issues
