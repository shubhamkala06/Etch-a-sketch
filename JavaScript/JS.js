
const n = +(prompt('Enter a number between 1 and 100'));
const sketchArea = document.querySelector('.sketchArea');

function addColor(e){
    console.log(e.target);
    e.target.classList.add('black');
}

for(let i=0;i<(n*n);i++){
    const div = document.createElement('div');
    div.classList.add('box');
    //div.addEventListener('mousedown',addColor)
    div.addEventListener('mouseover',addColor)
    sketchArea.appendChild(div);
}

sketchArea.setAttribute('style', `grid-template-columns: repeat(${n},1fr); grid-template-rows:repeat(${n},1fr);`);
