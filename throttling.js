let timer;

function throttle(delay){
    if(!timer){
        timer = setTimeout(() => {
            console.log("Calling the api..");
            clearTimeout(timer);
        }, delay);
    }
}


throttle(2000);