var composableFn = require('./composable.fn');
var composableInstance = require('./composable.instance');

module.exports = {
  composable: {
    use:composableFn.use,
  },
  Composable:composableInstance.Composable
};
