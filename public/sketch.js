var socket;

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
    noStroke();
    fill(255, 0, 0);
    ellipse(position.x, position.y, 10, 10);

    //if (overBox) {
    //    locked = true;
    //    fill(255, 255, 255);
    //} else {
    //    locked = false;
    //}
    //xOffset = mouseX - bx;
    //yOffset = mouseY - by;
}

function mouseDragged()
{
    console.log('Sending: '+ mouseX + ', ' + mouseY)

    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);

    draw(data);
}

function draw(position)
{
    noStroke();
    fill(255, 0, 100);
    ellipse(position.x, position.y, 4, 4);
}