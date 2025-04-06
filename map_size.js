const map = new Map();

map.set(1, 'one');

console.log(map.size);

Object.defineProperty(Map.prototype, "mySize", {
    get: function(){
        return this.size;
    },
    enumerable: false,
    configurable: true
})

console.log(map.mySize);