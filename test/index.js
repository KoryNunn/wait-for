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