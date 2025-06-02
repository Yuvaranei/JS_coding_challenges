let arr = [1,2,3];

console.log(arr.filter(ele => ele%2));

Array.prototype.myFilter = function(cb){
    let arr = [];
    for(let i=0;i<this.length;i++){
        if(cb(this[i])){
            arr.push(this[i]);
        }
    }
    return arr;
}

console.log(arr.myFilter(ele => ele%2));