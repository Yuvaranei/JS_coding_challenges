function MyPromise(executor) {
    let value;
    let onResolve, onReject;

    let isFulfilled = false,
        isRejected = false,
        isCalled = false;

    function resolve(val) {
        if (isFulfilled || isRejected) return;
        isFulfilled = true;
        value = val;

        if (typeof onResolve === 'function' && !isCalled) {
            isCalled = true;
            onResolve(value);
        }
    }

    function reject(err) {
        if (isFulfilled || isRejected) return;
        isRejected = true;
        value = err;

        if (typeof onReject === 'function' && !isCalled) {
            isCalled = true;
            onReject(value);
        }
    }

    this.then = function (callback) {
        return new MyPromise((resolve, reject) => {
            onResolve = function (val) {
                try {
                    const result = callback(val);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err);
                }
            };

            if (isFulfilled && !isCalled) {
                isCalled = true;
                onResolve(value);
            }
        });
    };

    this.catch = function (callback) {
        return new MyPromise((resolve, reject) => {
            onReject = function (err) {
                try {
                    const result = callback(err);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            };

            if (isRejected && !isCalled) {
                isCalled = true;
                onReject(value);
            }
        });
    };

    this.finally = function (callback) {
        return this.then(
            (val) => MyPromise.resolve(callback()).then(() => val),
            (err) => MyPromise.resolve(callback()).then(() => { throw err; })
        );
    };

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

// ✅ Static Methods

MyPromise.resolve = function (val) {
    return new MyPromise((resolve) => resolve(val));
};

MyPromise.reject = function (err) {
    return new MyPromise((_, reject) => reject(err));
};

MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        const results = [];
        let count = 0;

        promises.forEach((p, i) => {
            MyPromise.resolve(p).then((val) => {
                results[i] = val;
                count++;
                if (count === promises.length) resolve(results);
            }).catch(reject);
        });
    });
};

MyPromise.allSettled = function (promises) {
    return new MyPromise((resolve) => {
        const results = [];
        let count = 0;

        promises.forEach((p, i) => {
            MyPromise.resolve(p).then((val) => {
                results[i] = { status: 'fulfilled', value: val };
            }).catch((err) => {
                results[i] = { status: 'rejected', reason: err };
            }).finally(() => {
                count++;
                if (count === promises.length) resolve(results);
            });
        });
    });
};

MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach((p) => {
            MyPromise.resolve(p).then(resolve).catch(reject);
        });
    });
};

MyPromise.any = function (promises) {
    return new MyPromise((resolve, reject) => {
        let rejections = [];
        let count = 0;

        promises.forEach((p, i) => {
            MyPromise.resolve(p).then(resolve).catch((err) => {
                rejections[i] = err;
                count++;
                if (count === promises.length) {
                    reject(new AggregateError(rejections, 'All promises were rejected'));
                }
            });
        });
    });
};

const promise = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("Success...");
    }, 1000);
});

promise
    .then((data) => {
        console.log("1:", data);
        return MyPromise.resolve("Next value");
    })
    .finally(() => {
        console.log("2: In finally");
    })
    .then((data) => {
        console.log("3:", data);
        return MyPromise.reject("Oops");
    })
    .catch((err) => {
        console.log("4: Caught", err);
    });

const one = new MyPromise((res) => setTimeout(() => res("A"), 100));
const two = new MyPromise((res) => setTimeout(() => res("B"), 200));
const fail = new MyPromise((_, rej) => setTimeout(() => rej("Error"), 150));

MyPromise.all([one, two])
    .then(console.log) // ["A", "B"]

MyPromise.any([fail, one])
    .then(console.log) // "A"

MyPromise.allSettled([one, fail])
    .then(console.log); // [{status: "fulfilled", value: "A"}, {status: "rejected", reason: "Error"}]

MyPromise.race([two, fail])
    .then(console.log)
    .catch(console.log); // "Error"


