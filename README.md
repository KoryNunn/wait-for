# wait-for

Tiny callback counting module to run a function when all watched functions have completed

## Usage

set up what you want to do after async things have happened:

    var after = waitFor(done);

Wait for things:

    fs.readFile('bla', after(function(){
        ...

        fs.readFile('blee', after(function(){
            ...
        });
    });

done will only be called after all wrapped async calls are complete.

If any task errors, no other tasks will be called, but those in flight will call back. The error will be passed to ```done```:

    function done(error){
        // called if any error occurs, or if all tasks succeded
    });

You can specify that the fn will not error (or you don't care if if does) by passing true as the first parameter:

    after(true, function(){...})