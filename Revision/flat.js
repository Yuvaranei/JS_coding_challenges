
let arr = [1,[2,[3,[4]]],5,[6,7],8];

console.log(arr.flat(2));

Array.prototype.myFlat = function(depth){
    const ans = [];
    function flatten(arr, d){
        for(let i=0;i<arr.length;i++){
            if(Array.isArray(arr[i]) && (d > 0 || d == Infinity)){
                flatten(arr[i], d-1);
            } else {
                ans.push(arr[i]);
            }
        }
    }

    flatten(this, depth);
    return ans;
}

console.log(arr.myFlat(Infinity));