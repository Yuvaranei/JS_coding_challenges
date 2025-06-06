const newItem = document.createElement('li');
newItem.textContent = 'React.js';

const ulEle = document.getElementById('myList');
console.log(ulEle.children[1]);

ulEle.insertBefore(newItem, ulEle.children[1]);


document.getElementById("myList").style.backgroundColor = 'seagreen';

document.getElementById('myList').classList.add('new-class');


document.getElementsByClassName('new-class')[0].style.color = 'white';

