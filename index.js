module.exports = function waitFor(done){
    var pending = 0;
    return function(fn){
        pending++;

        return function(){
            pending--;
            fn.apply(this, arguments);
            if(pending === 0){
                done();
            }
        }
    }
};