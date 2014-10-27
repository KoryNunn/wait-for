module.exports = function waitFor(done){
    var pending = 0;
    var errored;
    return function(ignoreErrors, fn){
        pending++;

        if(typeof ignoreErrors === 'function'){
            fn = ignoreErrors;
            ignoreErrors = null;
        }

        return function(error){
            if(errored){
                return;
            }

            pending--;
            fn.apply(this, arguments);

            if(error && !ignoreErrors){
                errored = true;
                done(error);
                return;
            }

            if(pending === 0){
                done();
            }
        }
    }
};