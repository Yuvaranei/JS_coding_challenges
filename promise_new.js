const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Yes!!'), 2000);
})

function MyPromise(executor){
  let onResolve, onReject, value;
  let isFulfilled = false, isRejected = false, isCalled =  true;

  function resolve(val){
    isFullfilled = true;
    value = val;
    if(typeof onResolve == 'function' && !isCalled){
      isCalled(true);
      onResolve(value);
    }
  }

  function reject(err){
    isRejected = true;
    value = err;
    if(typeof onReject == 'function' && !isCalled){
      isCalled(true);
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
          }
        }
        catch(err){
          reject(err);
        }
      }
      if(isFullfilled) onResolve(value);
    })
  }

  this.catch = function(callback){
    return new MyPromise((resolve, reject) => {
      onReject = function(err){
        try{
          let result = callback(err);
          if(result instanceof MyPromise){
            resolve(result)
          }
        }
        catch(err){
          reject(err);
        }
      }
      if(isRejected) onReject(value);
    })
  }

  this.finally = function(callback){
    return 
  }

  try{
    executor(resolve, reject);
  }catch(err){
    reject(err);
  }
}

Promise.myPromiseAll = function(promises){
  let completed = 0;
  let result = [];
  return new Promise((resolve, reject) => {
    promises.map((promise, index) => {
      promise.then((resp) => {
        completed++;
        result[index] = resp;
        if(completed == promises.length){
          resolve(result);
        }
      })
      .catch((err) => {
        reject(err);
      })
    })
  })
}

Promise.myAllSettled = function(promises){
  let result =[];
  let completed = 0;
  return new Promise((resolve, reject) => {
    promises.map((item, index) => {
      item.then((res) => {
        result[index] = {status:'fulfilled', value: res};
        completed++;
        
      })
      .catch((err) => {
        result[index] = {status:'rejected', reason: err};
        completed++;
      })
      .finally(() => {
        if(completed === promises.length){
          resolve(result);
        }
      })
    })
  })
}

const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.resolve(3);

Promise.myAllSettled([p1, p2, p3]).then(result => {
  console.log(result);  // [1, 2, 3]
}).catch(err => {
  console.log(err);
});


Promise.myPromiseRace = function(promises){
  return new Promise((resolve, reject) => {
    promises.map((item, index) => {
      item.then((res) => resolve(res))
      .catch((err) => {

      })
    })
  })
}