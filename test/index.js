var test = require('grape'),
    waitFor = require('../');

test('Wait for 3 parallel timeouts', function(t){
    t.plan(1);

    var things = 0;

    function thing(){
        things++;
    }

    var after = waitFor(function(){
            t.equal(things, 3);
        });

    setTimeout(after(thing),10);
    setTimeout(after(thing),10);
    setTimeout(after(thing),10);
});

test('Wait for 3 nested timeouts', function(t){
    t.plan(1);

    var things = 0;

    var after = waitFor(function(){
            t.equal(things, 3);
        });

    setTimeout(after(function(){
        things++;
        setTimeout(after(function(){
            things++;
            setTimeout(after(function(){
                things++;
            }),10);
        }),10);
    }),10);
});

function callWithError(fn) {
    setTimeout(function(){
        fn('errored');
    }, 10);
}

test('errors', function(t){
    t.plan(2);

    var ran = 0;

    var after = waitFor(function(error){
            t.equal(ran, 2);
            t.equal(error, 'errored');
        });

    callWithError(after(true, function(){
        ran++;
        callWithError(after(function(){
            ran++;
            callWithError(after(function(){
                ran++;
            }));
        }));
    }));
});