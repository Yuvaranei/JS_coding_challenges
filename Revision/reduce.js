let arr = [1,2,3];

console.log(arr.reduce((prev, curr) => prev+curr, 10));

Array.prototype.myReduce = function(cbFunc, initialValue){
   let startIndex, currValue;

  if(initialValue){
    currValue = initialValue;
    startIndex = 0;
  } else {
    currValue = this[0];
    startIndex = 1;
  }

  for(let i=startIndex;i<this.length;i++){
    currValue = cbFunc(currValue, this[i]);
  }
  return currValue;
}

console.log(arr.myReduce((prev, curr) => prev+curr, 10));