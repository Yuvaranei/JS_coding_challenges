const user = {
    name: 'yuva',
    age: 33
}

const handler = {
    set(target, prop, value){
        console.log("prop", prop, "typeof value ", typeof value, "value = ", value)
        if(prop == 'age' && typeof value !== 'number'){
            throw new Error('Age must be a number!');
        }
        return Reflect.set(target, prop, value);
    }
}

const ProxyUser = new Proxy(user, handler);


ProxyUser.age = '34';

