var socket;
var lineStart;

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
    lineStart = {
        x0: mouseX,
        y0: mouseY
    }
}

function mouseDragged()
{
    console.log('Sending: '+ mouseX + ', ' + mouseY)

    var data = {
        x0: mouseX,
        y0: mouseY
    }
    socket.emit('mouse', data);

    draw(data);
}

function draw(position)
{
    fill(0, 0, 0); 
    strokeWeight(4)
    line(lineStart.x, lineStart.y, position.x0, position.y0);
    lineStart = {
        x0: position.x,
        y0: position.y
    }
}