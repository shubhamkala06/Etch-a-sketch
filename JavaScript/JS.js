//---------------------------------------Callback Functions and Functions-----------------------------------
function removeCanvas(x){
    document.querySelectorAll('.box').forEach((box)=>{sketchArea.removeChild(box)});
}

function createCanvas(x){
    for(let i=0;i<(x*x);i++){
        const div = document.createElement('div');
        div.classList.add('box');
        sketchArea.appendChild(div);
    }
    sketchArea.setAttribute('style', `grid-template-columns: repeat(${x},1fr); grid-template-rows:repeat(${x},1fr);`);
}

function addGrid(){
    if(gridlines.checked == true){
        document.querySelectorAll('.box').forEach((box)=>{box.classList.add('border')});
    }
    else{
        document.querySelectorAll('.box').forEach((box)=>{box.classList.remove('border')});
    }
}

function changeCanvasSize(){
    canvasSize.textContent = `${slider.value} x ${slider.value}`;
    n = slider.value;
    gridlines.checked = false;
    brush.style.boxShadow = 'none';
    eraser.style.boxShadow = 'none';
    removeCanvas(n);
    createCanvas(n);
}

function clearAll(){
    const pixels = document.querySelectorAll('.box');
    pixels.forEach((pixel)=>{
        pixel.style.backgroundColor = 'white';
    });
}

function addColor(e){
    e.target.style.backgroundColor=fillColor;
}

function removeColor(e){
    e.target.style.backgroundColor='white';
}

function fill(e){
    eraser.style.boxShadow = 'none';
    e.target.setAttribute('style','box-shadow: 0 0 10px rgba(0, 0, 0, 5);');
    const pixels = document.querySelectorAll('.box');
    pixels.forEach((pixel)=>{
        pixel.removeEventListener('mouseover',removeColor);
        pixel.addEventListener('mouseover',addColor);
    });
}

function erase(e){
    brush.style.boxShadow = 'none';
    e.target.setAttribute('style','box-shadow: 0 0 10px rgba(0, 0, 0, 5);');
    const pixels = document.querySelectorAll('.box');
    pixels.forEach((pixel)=>{
        pixel.removeEventListener('mouseover',addColor)
        pixel.addEventListener('mouseover',removeColor);
    });
}


//---------------------------------------------Variable Decalarations---------------------------------------
let defaultColor = '#000000';
let fillColor = '#000000';

let n;
const sketchArea = document.querySelector('.sketchArea');
const eraser = document.querySelector('.eraser');
const brush = document.querySelector('.brush');
const clear = document.querySelector('.clearCanvas');
const slider = document.querySelector('.canvasSize');
const canvasSize = document.querySelector('.canvasSizeValue');
const gridlines = document.querySelector('.gridChoice');
n = 50;
slider.value = n;
canvasSize.textContent = `${n} x ${n}`;

createCanvas(n);


//-----------------------------------------------Event Listeners----------------------------------------------

eraser.addEventListener('click',erase);

brush.addEventListener('click',fill);

slider.addEventListener('input',changeCanvasSize);

gridlines.addEventListener('input',addGrid);

clear.addEventListener('click',clearAll);
clear.addEventListener('mouseenter',(e)=>{
    
    e.target.childNodes[1].style.display = 'block';
    e.target.style.backgroundImage = 'none';
});
clear.addEventListener('mouseleave',(e)=>{
    e.target.childNodes[1].style.display = 'none';
    e.target.style.backgroundImage = 'url(../Resources/clear.png)';
});



//-------------------------------------------ColorJoe related JS code-------------------------------------

const container = document.querySelector('.colorBox');
        container.addEventListener('mouseenter',(e)=>{
            e.target.childNodes[1].style.display = 'flex';
        })
        
        container.addEventListener('mouseleave',(e)=>{
            e.target.childNodes[1].style.display = 'none';
        })

        class ColorPicker {
            constructor(root) {
                this.root = root;
                this.colorjoe = colorjoe.rgb(this.root.querySelector(".colorjoe"));
                this.selectedColor = null;
                

                this.colorjoe.show();
                this.setSelectedColor(defaultColor);

                this.colorjoe.on("change", color => {
                    this.setSelectedColor(color.hex(), true);
                });

                
            }

            setSelectedColor(color, skipCjUpdate = false) {
                this.selectedColor = color;
                this.root.querySelector(".selected-color-text").textContent = color;
                this.root.querySelector(".selected-color").style.background = color;
                fillColor = color;
                document.querySelector('.colorBox').style.backgroundColor = color;

                if (!skipCjUpdate) {
                    this.colorjoe.set(color);
                }
            }

        }

        const cp = new ColorPicker(document.querySelector(".container"));