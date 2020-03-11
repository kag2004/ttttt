const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = "black";
context.lineWidth = 2.5;
color[0].style.border = "thick solid white";

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPaining(){
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting){
        context.beginPath();
        context.moveTo(x, y);
    }
    else{
        context.lineTo(x, y);
        context.stroke();
    }
}

function handleColorClick(e){
    const palette = e.target.style.backgroundColor;
    resetBorder();
    e.target.style.border = "thick solid white";
    context.strokeStyle = palette;
    context.fillStyle = palette;
}

function resetBorder(){
    Array.from(color).forEach(temp =>
        temp.style.border = 0
    );
}

function pencil(e){
    context.lineWidth = e.target.value;
}

function handleModeClick(e){
    if(filling===true){
        filling = false;
        mode.innerText = "Fill";

    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(e) {
    if(filling){
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

function handleCM(e){
    e.preventDefault();
}

function handleSaveClick(e){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

if(canvas){ 
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPaining);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(color).forEach(temp => temp.addEventListener('click', handleColorClick));

range.addEventListener('input',pencil);
mode.addEventListener('click',handleModeClick);