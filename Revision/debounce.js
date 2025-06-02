function debounce(cbFunc, delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => cbFunc(...args), delay);
    }
}