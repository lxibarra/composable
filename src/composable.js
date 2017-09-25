
 const use = function() {
  let executionStack = [];

  let abort = () => executionStack = null;

  let next = (result) => {
    var fn = executionStack.shift();
    if (fn) {
      fn(result, next, abort);
    }
  };

  for (var check=0, top=arguments.length; check<top; check++) {
    if (typeof arguments[check] === 'function') {
      executionStack.push(arguments[check]);
    }
  }

  if(executionStack.length > 0) {
    executionStack.shift()(undefined, next, abort);
  }

  return { use };
};

module.exports = {
  composable: {
    use
  }
};
