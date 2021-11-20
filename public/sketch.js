var socket;
var dataLocal;

function setup()
{
    let cnv = createCanvas(542, 962);
    cnv.position(0, 0);rect(30, 20, 55, 55);
    background('white');
    //border
    stroke('black');
    strokeWeight(1);
    rect(0, 0, 542, 962);
    
    socket = io.connect('https://socket-sketch-app.herokuapp.com/');
    socket.on('mouse', newDrawing);
}

function newDrawing(data)
{
    draw(data);
}

function mousePressed() {
    dataLocal = {
        x0: mouseX,
        y0: mouseY
    }
}

function mouseDragged()
{
    console.log('Sending: '+ mouseX + ', ' + mouseY)

    var dataLocal = {
        x1: mouseX,
        y1: mouseY
    }
    socket.emit('mouse', dataLocal);

    draw(dataLocal);
}

function draw(position)
{
    fill(0, 0, 0); 
    strokeWeight(4)
    line(position.x0, position.y0, position.x1, position.y1);
    dataLocal = {
        x0: position.x1,
        y0: position.y1
    }
}