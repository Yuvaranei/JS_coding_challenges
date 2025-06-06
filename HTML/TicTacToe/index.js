const totalRows = 3;
const totalCols = 3;
let totalCells = 0;

let totalPlayed = 0;


function getCurrentPlayer(){
    return players[totalPlayed%2];
}

const players = ['X', 'O'];

setTimeout(() => {
    document.getElementById('message-board').innerText = `Player ${getCurrentPlayer()} - Your Turn!`
}, 2000);


function getCoOrds(id){
    let co_ords = [];
    co_ords.push(Math.floor(id/3));
    co_ords.push((id%3));
    return co_ords;
}


function checkHorizontal(cellId){
    let [row, col] = getCoOrds(cellId);

    const tdElements = document.querySelectorAll('td');

    let count = 0;

    let currentPlayer = getCurrentPlayer();

    console.log(" [row, col]....",  [row, col]);

    for(let j=0;j<totalCols;j++){
        console.log(" is equal", tdElements[row*3+j].innerText, currentPlayer);
        if(tdElements[row*3+j].innerText == currentPlayer) count++;
    }

    if(count == totalCols){
        return true;
    }
    
    return false;
}

function checkVertical(cellId){
    let [row, col] = getCoOrds(cellId);

    const tdElements = document.querySelectorAll('td');

    let count = 0;

    let currentPlayer = getCurrentPlayer();

    for(let i=0;i<totalRows;i++){
        if(tdElements[i * 3+col].innerText == currentPlayer) count++;
    }

    if(count == totalCols){
        return true;
    }
    return false;
}

function checkDiagonal(currentCell){
    let [row, col] = getCoOrds(currentCell);
    if(row != col) return;

    let count = 0;
    let currentPlayer = getCurrentPlayer();

    const rows = document.querySelector('table').rows;

    for(let i=0;i<totalRows;i++){
        for(let j=0;j<totalCols;j++){
            if(rows[i].cells[j].innerText == currentPlayer) count++;
        }
    }

    if(count == totalCols){
        return true;
    }
    return false;
}

function checkAntiDiagonal(currentCell){
    let [row, col] = getCoOrds(currentCell);
    if(row+col != totalCols-1) return;

    let count = 0;
    let currentPlayer = getCurrentPlayer();

    const rows = document.querySelector('table').rows;

    for(let j=totalCols-1;j>=0;j--){
        for(let i=0;i<totalRows;i++){
            if(rows[i].cells[j].innerText == currentPlayer) count++;
        }
    }

    if(count == totalCols){
        return true;
    }
    return false;
}


function checkWinner(currentCell){
    return checkHorizontal(currentCell) || checkVertical(currentCell) || checkDiagonal(currentCell) || checkAntiDiagonal(currentCell);
}

function clickHandler(e){
    let currentPlayer = getCurrentPlayer();

    let currentCell = document.getElementById(e.target.id);

    currentCell.innerText = currentPlayer;
    currentCell.classList.add('disabled');
   
   if(checkWinner(e.target.id)){
    document.getElementById('message-board').innerText = `Player ${getCurrentPlayer()} - WON!!!`
    const tdElements = document.querySelectorAll('td');
    for(let i=0;i<tdElements.length;i++){
        tdElements[i].classList.add('disabled');
    }
   }
   else{
    document.getElementById('message-board').innerText = `Player ${getCurrentPlayer()} - Your Turn!`
   }
   totalPlayed++;
}

const tbodyEle = document.querySelector('tbody');

tbodyEle.addEventListener('click', clickHandler);

for(let i=0;i<totalRows;i++){
    const trEle = document.createElement('tr');
    trEle.setAttribute('id', `row-${i+1}`);
    for(let j=0;j<totalCols;j++){
        const tdEle = document.createElement('td');
        tdEle.setAttribute('id', totalCells);
        totalCells++;
        trEle.appendChild(tdEle);
    }
    tbodyEle.appendChild(trEle);
}