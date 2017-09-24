var expect = require('chai').expect;
require('es6-promise').polyfill();
require('isomorphic-fetch');
var fetchMock = require('fetch-mock');


describe('Test the incredible light-composable library', function() {
  var  composable  = require('../src/index.js').composable;

  it('Use is available', function() {
    expect(composable).to.be.an('object');
    expect(composable.use).to.be.a('function');
  });

  it('chain middlerwares to add numbers', function() {
      var middleware1 = function (addingNumber, next, abort) { next(2); };
      var middleware2 = function (addingNumber, next, abort) { next(addingNumber + 2); };
      var middleware3 = function (addingNumber, next, abort) { next(addingNumber + 2); };
      var middleware4 = function (addingNumber, next, abort) {
        expect(addingNumber).to.equal(6);
      };

      composable.use(
          middleware1,
          middleware2,
          middleware3,
          middleware4
      );

  });

  it('chain middlerwares to add numbers but abort before last', function() {
      var middleware1 = function (addingNumber, next, abort) { next(2); };
      var middleware2 = function (addingNumber, next, abort)  {
        expect(addingNumber).to.equal(2);
        abort(addingNumber);
      };
      var middleware3 = function(addingNumber, next, abort) { next(addingNumber + 2); };
      var middleware4 = function (addingNumber, next, abort) {
        //will never execute so test will not fail
        expect(addingNumber).to.equal(100);
      };

      composable.use(
          middleware1,
          middleware2,
          middleware3,
          middleware4
      );

  });

  describe ("async tests", function () {



    it('"fetch information in an asyc fashion and do something with it"', function(done) {
        fetchMock.get('*', {name: 'Ricardo', gender:1, hobbies:['coding', 'museums', 'hiking', 'wine', 'rum', 'tequila']});
        var getData = function (result, next, abort) {
            fetch('https://get.it/happy-person').then(function(response) {
              response.json().then(data=>{
                //next middleware wont execute until you call next so async scenarios can be handled nicely
                next(data);
              })
            }).catch(function(error) {
              abort(error);
              done();
            });
      };

      var parseData = function (result, next, abort) {
        if (typeof result === 'object') {
            result.gender = result.gender === 1 ? 'Male' : 'Female';
            result.hobbies = result.hobbies.map(function(hobbie){
              return {
                  hobbie:hobbie,
                  fun:true
              };
            });
            next(result);
        } else {
          abort();
        }
      };

      var do_something_with_data_after_all_parsing_is_done = function(result, next, abort) {
        expect(result.gender).to.be.a('string');
        expect(result.hobbies[0]).to.be.a('object');
        done();
      };

      composable.use(
        getData,
        parseData,
        do_something_with_data_after_all_parsing_is_done
      );

    });
  });


});
