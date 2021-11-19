var socket;

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);
    background(51);
    
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
    ellipse(position.x, position.y, 10, 10);
}