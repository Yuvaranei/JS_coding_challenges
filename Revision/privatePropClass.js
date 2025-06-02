class BankAccount{
    #balance;

    constructor(name, balance){
        this.name = name;
        balance = balance;
    }

    withdraw(amount){
        balance = balance - amount;
        consolee
    }

    getDetails(){
        console.log(`Details = ${JSON.stringify(this)}`);
    }
}

const yuva_acc = new BankAccount('yuva', 1000);
const dhrityi_acc = new BankAccount('Dhrityi', 5000);


yuva_acc.getDetails();

dhrityi_acc.getDetails();

console.log(Object.getOwnPropertyNames(yuva_acc));