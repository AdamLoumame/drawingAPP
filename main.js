let canvas = document.querySelector(".canvas")
let context = canvas.getContext("2d")

canvas.width = innerWidth/1.4
canvas.height = innerHeight/1.4
// set the BG
context.fillStyle = "white"
context.fillRect(0,0,canvas.width,canvas.height)

let drawColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim()
let drawWidth = document.querySelector(".weight").value
let isDrawing = false 

function changeColor(e){
  document.documentElement.style.setProperty("--main-color",e.style.backgroundColor)
  drawColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim()
}
function changeColor2(e){
  document.documentElement.style.setProperty("--main-color",e.value)
  drawColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim()
}
function changeWhidth(e){
  drawWidth = e.value
}

canvas.addEventListener("touchstart",start)
canvas.addEventListener("touchmove",draw)
canvas.addEventListener("mousedown",start)
canvas.addEventListener("mousemove",draw)

canvas.addEventListener("mouseup",stop)
canvas.addEventListener("touchend",stop)
canvas.addEventListener("mouseout",stop)

let lastImages = []

function start(event){
  context.beginPath()
  context.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop)
  isDrawing = true
}
function draw(event){
  if(isDrawing){
    context.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop)
    context.strokeStyle = drawColor
    context.lineCap ="round"
    context.lineJoin = "round"
    context.lineWidth = drawWidth
    context.stroke()
  }
}
function stop(event){
  isDrawing = false
  if (event.type !== "mouseout"){
    lastImages.push(context.getImageData(0,0,canvas.width,canvas.height))
  }
}

document.querySelector(".clear").addEventListener("click",()=>{
  context.fillStyle = "white"
  context.fillRect(0,0,canvas.width,canvas.height)
  lastImages = []
})

document.querySelector(".undo").addEventListener("click",()=>{
  if (lastImages.length>1){
    context.putImageData(lastImages[lastImages.length - 2],0,0)
    lastImages.pop()
  }else{
    context.fillStyle = "white"
    context.fillRect(0,0,canvas.width,canvas.height)
    lastImages = []
  }
})