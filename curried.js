function sum(a,b,c,d){
    return a+b+c+d;
}

function curry(func){
    return function curried(...args){
        if(args.length < func.length){
            return (...nextArgs) => curried(...args, ...nextArgs);
        } else {
            return func(...args);
        }
    }

}

const curriedSum = curry(sum);


console.log(curriedSum(1)(2)(3)(4));
console.log(curriedSum(1,2)(3,4));
console.log(curriedSum(1,2,3)(4));
console.log(curriedSum(1,2,3,4));