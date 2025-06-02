function throtttle(func, delay){
    let flag = false;

    return function(...args){
        if(!flag){
            flag = true;
            func(...args);
            setTimeout(() => {
                flag = false;
            }, delay);
        }
       
    }
}