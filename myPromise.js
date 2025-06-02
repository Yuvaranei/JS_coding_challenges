function MyPromise(executor){
    let value, onResolve, onReject;

    let isFulfilled = false, isRejected = false, isCalled = false;

    function resolve(val){
        isFulfilled = true;
        value = val;

        if(typeof onResolve == 'function' && !isCalled){
            isCalled = true;
            onResolve(value);
        }
    }

    function reject(err){
        isRejected = true;
        value = err;

        if(typeof onReject == 'function' && !isCalled){
            isCalled = true;
            onReject(value);
        }
    }

    this.then = function(callback){
        return new MyPromise((resolve, reject) => {
            onResolve = function(val){
                try{
                    let result = callback(val);
                    if(result instanceof MyPromise){
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch(err){
                    reject(err);
                }
            }

            if(isFulfilled) onResolve(value);
        })
    }

    this.catch = function(callback){
        return new MyPromise((resolve, reject) => {
            onReject = function(val){
                try{
                    let result = callback(val);
                    resolve(result);
                }
                catch(err){
                    reject(err);
                }
            }
            if(isRejected) onReject(value);
        })
    }

    this.finally = function(callback){
        return this.then(
            (value) => MyPromise.resolve(callback()).then(() => value),
            (error) => MyPromise.reject(callback()).then(() => {throw error;})
        )
    }

    try{
        executor(resolve, reject);
    } catch(error){

    }
}

MyPromise.resolve = function(value){
    return new MyPromise((res) => res(value));
}

MyPromise.reject = function(error){
    return new MyPromise((_, rej) => rej(error));
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success...")
    }, 2000);
})

MyPromise.all = function(promises){
    return new MyPromise((resolve, reject) => {
        let result = [];
        let count = 0;
        promises.forEach((promise) => {
            promise.then((data) => {
                count++;
                result.push(data);

                if(count == promises.length){
                    resolve(result);
                }
            })
            .catch((error) => reject(error));
        })
    })
}

MyPromise.allSettled = function(promises){
    return new MyPromise((resolve, reject) => {
        let result = [];
        let count = 0;
        promises.forEach((promise) => {
            promise.then((data) => {
                count++;
                result.push({status:'fulfilled', value: data});
                if(count == promises.length) resolve(result);
            })
            .catch((error) => {
                result.push({status: 'rejected', value: error});
                if(count == promises.length) resolve(result);
            });
        })
    })
}

promise.then((data) => {
    console.log(data);
    return MyPromise.resolve('Hey');
})
.finally(console.log)
.then((data) => {
    console.log("Data 2", data);
    return MyPromise.reject("Something wrong");
})
.then(console.log)
.catch(console.log)
