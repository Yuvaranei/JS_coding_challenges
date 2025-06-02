
let obj = {
    name: 'yuva'
}


function greet(greetMsg){
    console.log(`Hello ${this.name}, ${greetMsg}`);
}

const greetFunc = greet.bind(obj);

greetFunc('Good Morning!');

Function.prototype.myBind = function(context){
    return function(...args){
        this.call(context, ...args);
    }
}

const greetFunc1 = greet.myBind(obj);

greetFunc('Good Evening!');