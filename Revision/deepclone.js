let obj = {
    name: 'shiv',
    age: '33',
    hey: {
        hello: {
            name: 'text'
        }
    },
    companies: [
        {
            name: 'sapient'
        },
        {
            name: 'harman'
        }
    ]
}

const newObj = {...obj};

function deepClone(obj){
    
    
    function clone(object){
        if(Array.isArray(object)){
            return object.map(item => clone(item));
        } else if(typeof object == 'object' && object != null){
            let result = {};
            Object.entries(object).forEach(([key, value]) => {
                result[key] = clone(value)
            })
            return result;
        }
        return object;
    }

    return clone(obj);
}

const deepCloned = deepClone(obj);

obj.companies[0].name = 'polaris';



console.log(obj);
console.log(newObj);
console.log(deepCloned);

