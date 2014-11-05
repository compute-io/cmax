cmax
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative maximum of a numeric array.


## Installation

``` bash
$ npm install compute-cmax
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var cmax = require( 'compute-cmax' );
```

#### cmax( arr )

Computes the cumulative maximum of a numeric `array`.

``` javascript
var data = [ 3, 2, 4, 3 ];

cmax( data );
// returns [ 3, 3, 4, 4 ]
```


## Examples

``` javascript
var cmax = require( 'compute-cmax' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

console.log( cmax( data ) );
// returns [...]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The function returns an `array` with a length equal to the original input `array`.


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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
