module.exports = function waitFor(done){
    var pending = 0;
    var errored;
    return function(fn){
        pending++;


        return function(error){
            if(errored){
                return;
            }

            pending--;
            fn.apply(this, arguments);

            if(error){
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