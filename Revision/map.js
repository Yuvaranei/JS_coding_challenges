let arr = [1,2,3];

console.log(arr.map(ele => ele*3));

Array.prototype.myMap = function(cb){
    let arr = [];
    for(let i=0;i<this.length;i++){
        arr[i] = cb(this[i]);
    }
    return arr;
}

console.log(arr.myMap(ele => ele*3));