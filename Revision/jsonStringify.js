const obj = {
    a: 1,
    b: 2,
    c1: {
      d: 3,
      e: 4,
    },
    f: [5, 6],
  };


  function JSONStringify(object){

    function stringify(value){
       if(value == null) return 'null'

       if(typeof value == 'string') return value;

       if(typeof value == 'number' || typeof value == 'boolean') return String(value);

       if(Array.isArray(value)){
            const items = value.map((item) => stringify(item)).join(',');
            return `[${items}]`;
       }

       if(typeof value == 'object' && value != null){
        const entries = Object.entries(value).map(([key, value]) => `${key}: ${stringify(value)}`);
        return `{${entries.join(',')}}`;
       }

       return 'null';
    }

    return stringify(object)
  }

  let res = JSONStringify(obj);

  console.log(res);