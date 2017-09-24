//todo:brower tests
//todo: need a way to pass initial arguments
//todo: provide function index on each call
//todo: maybe add a finisher method with the reasons on why and how
(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], factory);
  } else if(typeof module === Object && module.exports) {
    module.exports = factory();
  } else {
    root.composable = factory();
  }
}(this, function(){
  /**
   * use - Allows you to chain functions and share data between them.
   *       The functions will execute from left to right and in order to execute
   *       the next function you need to call next within your function.
   *       next can take a value you want to pass to the next "middleware"
   *
   *
   *
   * @return {Function}  returns it self so you can also chain multiple use functions.
   */
  function use() {
    'use strict';
    // Holds the functions to execute
    var executionStack = [];
    // functions that sets the function stack to null to make sure
    // garbage collector cleans up the functions we are no longer going to use.
    function abort () { executionStack = null; };
    //function that gets the next "middleware" functions and executes it
    function next(result) {
      var fn = executionStack.shift();
      if(fn) {
        //fn(Object.assign({}, result), next, abort);
        fn(result, next, abort);
      }
    }

    //when we call the "use" function, we loop through the arguments object
    // and add the elements that are functions to the stack array.
    for (var check=0, top=arguments.length; check<top; check++) {
      if (typeof arguments[check] === 'function') {
        executionStack.push(arguments[check]);
      }
    }

    //Once we have everything in the array we take the first element (function)
    // and execute it.
    if(executionStack.length > 0) {
      executionStack.shift()(undefined, next, abort);
    }
    //finally we return the same function so we can chain multiple uses.
    return { use:use };
  }

  return {
    use: use
  };
}));
