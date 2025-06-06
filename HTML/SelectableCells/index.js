const totalRows = 10;
const totalCols = 10;
let totalCells = 0;
let startId = -1;
let endId = -1;



function clickHandler(){
    const tdEle = document.querySelectorAll('td');
    for(let i=0;i<tdEle.length;i++){
        tdEle[i].classList.remove('highlightCell');
    }
}

function dragStartHandler(e){;
    startId = e.target.id;
    // console.log("startId...", startId);
}

function getCoOrds(id){
    let co_ords = [];
    co_ords.push(Math.floor(id/10));
    co_ords.push((id%10));
    // console.log(`Id: ${id} => ${co_ords}`);
    return co_ords;
}

function dropHandler(e){
    endId = e.target.id;

    let [startRow, startCol] = getCoOrds(startId);
    let [endRow, endCol] = getCoOrds(endId);


    let xRow, xCol, yRow, yCol;

    if(startRow <= endRow && startCol <= endCol){
        [xRow, xCol]  = [startRow, startCol];
        [yRow, yCol]  = [endRow, endCol];
    } else {
        [xRow, xCol]  = [endRow, endCol];
        [yRow, yCol]  = [startRow, startCol];
    }


    console.log([xRow, xCol])
    console.log([yRow, yCol])

    for(let i=xRow;i<=yRow;i++){
        for(let j=xCol;j<=yCol;j++){
            const tdEle = document.getElementById(`${i*10+j}`);
            tdEle.classList.add('highlightCell');
        }
    }   
}

const tbodyEle = document.querySelector('tbody');
tbodyEle.addEventListener('click', clickHandler );
tbodyEle.addEventListener('dragstart', dragStartHandler );
tbodyEle.addEventListener('drop', dropHandler );
tbodyEle.addEventListener('dragover', (e) => e.preventDefault() );

for(let i=0;i<totalRows;i++){
    const trEle = document.createElement('tr');
    trEle.setAttribute('id', `row${i+1}`);
    for(let j=0;j<totalCols;j++){
        const tdEle = document.createElement('td');
        tdEle.setAttribute('id', totalCells);
        tdEle.setAttribute('draggable', true);
        totalCells++;
        trEle.appendChild(tdEle);
    }
    tbodyEle.appendChild(trEle)
}
