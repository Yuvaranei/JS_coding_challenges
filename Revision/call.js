
let obj = {
    name: 'yuva'
}


function greet(){
    console.log(`Hello ${this.name}`);
}

Function.prototype.myCall = function(context, ...args){
    let uniqueKey = Symbol();
    context[uniqueKey] = this;
    context[uniqueKey](...args);
    delete context[uniqueKey];
}


greet.call(obj);

greet.myCall(obj);