function MyPromise(executor) {
    let onResolve, onReject;
    let isFulfilled = false,
      isRejected = false,
      isCalled = false;
    let value;
  
    function resolve(val) {
      isFulfilled = true;
      value = val;
      console.log("Inside resolve..");
      if (typeof onResolve === "function" && !isCalled) {
        console.log("Inside resolve if onResolve condition..");
        isCalled = true;
        onResolve(value);
      }
    }
  
    function reject(err) {
      isRejected = true;
      value = err;
      if (typeof onReject === "function" && !isCalled) {
        isCalled = true;
        onReject(value);
      }
    }
  
    this.then = function (callback) {
      return new MyPromise((resolve, reject) => {
        onResolve = function (val) {
          try {
            let result = callback(val);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(err);
          }
        };
        if (isFulfilled) onResolve(value);
      });
    };
  
    this.catch = function (callback) {
      return new MyPromise((resolve, reject) => {
        onReject = function (err) {
          try {
            let result = callback(err);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
        if (isRejected) onReject(value);
      });
    };
  
    this.finally = function (callback) {
      return this.then(
        (value) => MyPromise.resolve(callback()).then(() => value),
        (error) => MyPromise.resolve(callback()).then(() => { throw error; })
      );
    };
  
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  
  MyPromise.resolve = function (value) {
    return new MyPromise((resolve) => resolve(value));
  };
  
  MyPromise.reject = function (reason) {
    return new MyPromise((_, reject) => reject(reason));
  };
  
  MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
      let results = [];
      let completed = 0;
  
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = value;
            completed++;
            if (completed === promises.length) resolve(results);
          })
          .catch(reject);
      });
    });
  };
  
  MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject);
      });
    });
  };
  
  // ✅ Example Usage:
  const p = new MyPromise((res) => setTimeout(() => res("Hello!"), 2000));
  // p.then(console.log); // Output after 1 sec: "Hello!"