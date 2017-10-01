//soon to be deprecated its here only to support existing implementations will be removed in version 2.0.0
var use = function() {
  var executionStack = [];

  var abort = function() {
    executionStack = null;
  };

  var next = function(result) {
    if (executionStack instanceof Array && executionStack.length > 0) {
      var fn = executionStack.shift();
      if (fn) {
        fn(result, next, abort);
      }
    }
  };

  for (var check = 0, top = arguments.length; check < top; check++) {
    if (typeof arguments[check] === 'function') {
      executionStack.push(arguments[check]);
    }
  }

  if (executionStack.length > 0) {
    executionStack.shift()(undefined, next, abort);
  }

  return {use: use};
};

module.exports = {
  use: use
};
