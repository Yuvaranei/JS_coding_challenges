const obj = {
    a: 1,
    b: 2,
    c1: {
      d: 3,
      e: 4,
    },
    f: [5, 6],
  };
  let result = deepOmit(obj, ['b', 'c', 'e']); // { a: 1, f: [5, 6] }

  console.log("result...", result);

  function deepOmit(obj, omitArr){

    
    function omit(nestedObj){

        if(typeof nestedObj != 'object' || nestedObj == null) return nestedObj;

        if(Array.isArray(nestedObj)){
            return nestedObj.map(omit);
        }
        let ans = {};
        Object.entries(nestedObj).forEach(([key, value]) => {
            console.log("key = ", key);
            if(!omitArr.includes(key)){
                if(typeof value == 'object' && value != null){
                    ans[key] = omit(value);
                } else {
                    ans[key] = value;
                }
                
            }
        })
        return ans;
    }
    
    return omit(obj);
  }

