
let obj = {
    name: 'yuva'
}


function greet(param){
    console.log(`Hello ${this.name} ${param}`);
}

Function.prototype.myApply = function(context, args){
    let uniqueKey = Symbol();
    context[uniqueKey] = this;
    context[uniqueKey](args);
    delete context[uniqueKey];
}

greet.apply(obj, [1,2,3]);

greet.myApply(obj, [1,2,3]);