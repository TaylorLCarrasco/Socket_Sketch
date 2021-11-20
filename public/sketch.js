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

function drawingboard() {
    var imageBoard = new DrawingBoard.Board('div', {
        controls: true,
        color: '#000',
        webStorage: false,
        controls: [
            'Color',
            { Size: { type: "range" } },
            { Navigation: { back: true, forward: true } },
            'DrawingMode'
        ],
    });
}