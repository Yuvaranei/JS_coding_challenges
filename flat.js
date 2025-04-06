const arr = [1, [2, [3, [4]]], 5, 6, 7, 8];

Array.prototype.myFlat = function (depth) {
  const arr = [];
  console.log(this)

  function flattenArray(array, depth) {
    console.log(array);
    for(let i=0;i<array.length;i++){
      if(Array.isArray(array[i]) && depth > 0){
          flattenArray(array[i], depth-1);
      } else {
        arr.push(array[i]);
      }
    }
  }

  flattenArray(this, depth);

  return arr;
};

console.log(arr.myFlat(2));
