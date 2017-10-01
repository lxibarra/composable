function Composable() {
  var executionStack = [];

  var next = function(result) {
    if (executionStack instanceof Array && executionStack.length > 0) {
      var fn = executionStack.shift();
      if (fn) {
        fn(result, next, abort);
      }
    }
  };

  var abort = function() {
    executionStack = null;
  };

  this.use = function() {
    for (var check = 0, top = arguments.length; check < top; check++) {
      if (typeof arguments[check] === 'function') {
        executionStack.push(arguments[check]);
      }
    }

    if (executionStack.length > 0) {
      executionStack.shift()(undefined, next, abort);
    }
  };
  //to avoid using bind
  this.next = next;
  this.abort = abort;
}

module.exports = {
  Composable: Composable
};
