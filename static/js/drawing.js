// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', ()=>{

});

const canvas = document.querySelector('#canvas');
// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

$(document).ready(function(){

  resize(); // Resizes the canvas once the window loads
  document.addEventListener('mousedown', startPainting);
  document.addEventListener('mouseup', stopPainting);
  document.addEventListener('mousemove', sketch);
  window.addEventListener('resize', resize);
  

  $("#clear").click(function(){
    clearcanvas1()
  });

  $("#save").click(function(){

    console.log("started")

    var image = new Image();
    var url = document.getElementById('url');
    image.id = "pic";
    image.src = canvas.toDataURL("image/png");
    url.value = image.src;

    console.log("working")
    console.log(url.value);

      $.ajax({
        type: "POST",
        url: "/predict", //I have doubt about this url, not sure if something specific must come before "/take_pic"
        data: image,
        success: function(data) {
          if (data.success) {
            alert('Your file was successfully uploaded!');
          } else {
            alert('There was an error uploading your file!');
          }
        },
        error: function(data) {
          alert('There was an error uploading your file!');
        }
      }).done(function() {
        console.log("Sent");
      });

  });

});

function clearcanvas1()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// Resizes the canvas to the available size of the window.
function resize(){
  ctx.canvas.width = 600;
  ctx.canvas.height = 600;
}
    
// Stores the initial position of the cursor
let coord = {x:0 , y:0}; 
   
// This is the flag that we are going to use to 
// trigger drawing
let paint = false;
    
// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.
function getPosition(event){
  coord.x = event.clientX// - canvas.offsetLeft;
  coord.y = (event.clientY - canvas.offsetTop);
}
  
// The following functions toggle the flag to start
// and stop drawing
function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}
    
function sketch(event){
  if (!paint) return;
  ctx.beginPath();
    
  ctx.lineWidth = 50;
   
  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = 'round';
    
  ctx.strokeStyle = 'white';
      
  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x, coord.y);
   
  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);
   
  // A line is traced from start
  // coordinate to this coordinate
  ctx.lineTo(coord.x , coord.y);
    
  // Draws the line.
  ctx.stroke();
}