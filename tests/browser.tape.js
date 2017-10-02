var universalComposable = require('../dist/composable.min.js');
var composable = universalComposable.composable;
var Composable = universalComposable.Composable;

var test = require('tape');

test('This is a sample test for browsers', function(t) {
  t.plan(1);

  composable.use(
    function(value, next, abort) {
      next(2);
    },
    function(value, next, abort) {
      next(value + 10);
    },
    function(value) {
      t.equal(value, 2);
    }
  );

});
