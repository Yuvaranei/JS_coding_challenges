function memoize(){
    let cache = {};

    return function multiply(num){
        if(cache[num]) {
            return cache[num];
        }
        else {
            console.log("Generating...")
            cache[num] = 7 * num;
            return cache[num];
        }
    }
}


const multiplyBy7 = memoize();
const ans = multiplyBy7(4);
console.log("Ans = ", multiplyBy7(4));
console.log("Ans = ", multiplyBy7(9));
console.log("Ans = ", multiplyBy7(8));
console.log("Ans = ", multiplyBy7(4));

