let obj = {
    name: 'shiv',
    age: '33',
    hey: {
        hello: {
            name: {
                anc: 'abc'
            }
        }
    }
}

let obj1 = {
    name: 'shiv',
    hey: {
        hello: {
            name: {
                anc: 'abc'
            }
        }
    },
    age: '33'
}


// Warning: Incomplete solution. Refer to below.
function shouldDeepCompare(type) {
    return type === '[object Object]' || type === '[object Array]';
  }
  
  function getType(value) {
    return Object.prototype.toString.call(value);
  }
  
function deepEqual(valueA, valueB) {
    const typeA = getType(valueA);
    const typeB = getType(valueB);
  
    if (typeA === typeB && shouldDeepCompare(typeA) && shouldDeepCompare(typeB)) {
      // When both props are objects or arrays, we traverse into them by calling `isEqual` again.
    }
  
    return Object.is(valueA, valueB);
  }
  

console.log(JSON.stringify(obj) == JSON.stringify(obj1));

console.log(deepEqual(obj, obj1));