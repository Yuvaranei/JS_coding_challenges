const logging = {
   log(){
    console.log(`Logging ${this.name}`)
   }
}

const user = {name: 'yuva'};

Object.assign(user, logging);

user.log();