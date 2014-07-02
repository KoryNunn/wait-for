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