function renderStars(numberOfStars){
    const wrapperDivElement = document.createElement('div');
    wrapperDivElement.classList.add('star-container');

    for(let i=0;i<numberOfStars;i++){
        const starElement = document.createElement('div');
        starElement.setAttribute("id", i+1);
        starElement.classList.add('star');
        wrapperDivElement.appendChild(starElement);
    }
    document.body.appendChild(wrapperDivElement);
}

let selectedStarLevel = -1;

renderStars(5);

function onMouseOverHandler(e){
    const starName = e.target.id;
    const targetElement = document.getElementById(starName);
    const allSiblings = targetElement.parentNode.children;

    for(let i=0;i<allSiblings.length;i++){
            allSiblings[i].classList.remove('selected');
    }

    for(let i=0;i<starName;i++){
        allSiblings[i].classList.add('selected')
    }
    e.preventDefault();
}

function onMouseOutHandler(e){
    const targetElement = document.querySelector('.star-container');
    const allSiblings = targetElement.children;

    for(let i=0;i<allSiblings.length;i++){
        allSiblings[i].classList.remove('selected');
    }

    if(selectedStarLevel >= 0){
        for(let i=0;i<selectedStarLevel;i++){
            allSiblings[i].classList.add('selected')
        }
    }
    e.preventDefault();
}

function onClickHandler(e){
   const starName = e.target.id;
   selectedStarLevel = starName;
   const targetElement = document.getElementById(starName);

   const allSiblings = targetElement.parentNode.children

   for(let i=0;i<allSiblings.length;i++){
        allSiblings[i].classList.remove('selected');
   }

    for(let i=0;i<starName;i++){
        allSiblings[i].classList.add('selected')
    }
    e.preventDefault();
}

const wrapperDivElement = document.querySelector('.star-container');
wrapperDivElement.addEventListener('click', onClickHandler);
wrapperDivElement.addEventListener('mouseover', onMouseOverHandler);
wrapperDivElement.addEventListener('mouseleave', onMouseOutHandler);