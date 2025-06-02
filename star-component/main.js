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

function onMouseEnterHandler(e){
    const starName = e.target.id;
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

function onMouseLeaveHandler(e){
    if(selectedStarLevel >= 0){
        const targetElement = document.getElementById(selectedStarLevel);

        const allSiblings = targetElement.parentNode.children
    
        for(let i=0;i<allSiblings.length;i++){
                allSiblings[i].classList.remove('selected');
        }
    
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

const starDivElements = document.querySelectorAll('.star');

for(let i=0;i<starDivElements.length;i++){
    starDivElements[i].addEventListener('click', onClickHandler);
    starDivElements[i].addEventListener('mouseenter', onMouseEnterHandler);
    starDivElements[i].addEventListener('mouseleave', onMouseLeaveHandler);
}


//Will do event delegation later

/* 
Why this is not working.

const targetElement = document.getElementById(starName);
   const eventTarget = e.target;

   console.log(targetElement);
   console.log(targetElement);
   
   console.log(targetElement.matches(eventTarget));

*/