const object = {
    a: 5,
    b: 6,
    c: {
      f: 9,
      g: {
        m: 17,
        n: 3,
      },
    },
  };

  function squashObject(object){

    function squash(obj, prefix= '', result = {}){
        // console.log(obj);
        for(let [key,value] of Object.entries(obj)){
          let newKey = prefix ? `${prefix}.${key}` : key;
          if(typeof value == 'object' && value !=null){
            squash(value, newKey, result);
          } else {
            result[newKey] = value;
          }
        }
        return result;
    }

   return  squash(object);
  }
  
  let result = squashObject(object); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }

  console.log(result);

  