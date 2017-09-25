# Universal Composable #

Use middleware in the browser in the "same" way you do in node.
This Library is super light and small and more updates are on the way.

If you ever needed to execute functions in a sequence this can help you control the flow in and keep your code clean.


## Usage ##

### Node ###

The library injects 3 args in the following order:
* ``` value ```: is the result from the previous middleware
* ``` next ```: function that calls the next middleware in the stack. you have to make sure you invoke next(your-argument) on each middleware in order to move the flow forward.
* ``` abort ```: function that stops the flow giving you a chance to stop things if no further execution is required or simply gracefully handle errors.   


```npm install universal-composable --save```

```javascript
const composable = require('composable').composable;

const middleware1 = (value, next, abort) => fetch('my.data.com')
                          .then(response=>response.json())
                          .then(next(data))
                          .catch(abort)
const middleware2 = (value, next, abort) => {
        //parse data or work with it in some way
        //...
        value = Object.assign({}, value, { newData:'Something added/modified' })
        next(value);
}

const middleware3 = (value, next, abort) => {
  //now value has data from middleware1 & middleware2
  fetch("/my.data.com", {
    method: "POST",
    body: value
  });
}

composable.use(
  middleware1,
  middleware2,
  middleware3
)

```

### Browser ###

You can use AMD or simply drop a script tag with ``` dist/composable.min.js ``` and work with in the same way you do in node.
