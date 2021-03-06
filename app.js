const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ranges = document.getElementById("jsRange");
const button = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const body = window.getComputedStyle(document.body);

if(body) {
    document.body.style.setProperty('cursor', "url(image/brushCursor.png), default");
}

const INITIAL_COLOR = "2c2c2c";

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 처음 캔버스 배경색이 흰색이 되도록 색상 적용
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 선그리기 변수
let painting = false;
// 채우기 변수
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {

    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    // 선택된 색상 초기화
    Array.from(colors).forEach(color => color.style.border = "none");
    
    const color = event.target.style.backgroundColor;
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    event.target.style.setProperty("border", "dotted");
}

function handleRangeClick(event) {
   const size = event.target.value;
   ctx.lineWidth = size;
}

function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        button.innerText = "Fill";
        document.body.style.setProperty('cursor', "url(image/brushCursor.png), default");
    } else {
        filling = true;
        button.innerText = "Paint";
        document.body.style.setProperty('cursor', "url(image/paintCursor.png), default");
    }
}

function handleCanvasClick(event){
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(){
    // 기본 값이 png
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(ranges) {
    ranges.addEventListener("click", handleRangeClick);
}

if(button) {
    button.addEventListener("click", handleModeClick);
}
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}