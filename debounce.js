
let timer;

function debounceSearch(delay){
    clearTimeout(timer);
    timer = setTimeout(() => console.log("Data fetch call"), delay);
}

debounceSearch(2000);


