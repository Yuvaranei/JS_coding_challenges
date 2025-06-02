const map = new Map(Object.entries([1,2,3,4]));

console.log(map.size);

Object.defineProperty(Map.prototype, 'length', {
    get: function(){
        return this.size
    },
    enumerable: false,
    configurable: true
})


console.log(map.length);