
const add5 = (value) => value +5;
const multiply3 = (value) => value * 3;
const subtract4 = (value) => value - 4;

function pipe(...functions){
    return (value) => {
        return functions.reduce((currParam, currFun) => currFun(currParam), value);
    }
}

const processNumber = pipe(add5, multiply3, subtract4);

console.log(processNumber(2));


