var socket;
var dataLocal;

dataLocal = 
{
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0
}

var el = document.getElementById("clickMe");
if (el.addEventListener)
    el.addEventListener("click", doFunction, false);
else if (el.attachEvent)
    el.attachEvent('onclick', doFunction);

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
    socket.on('clear', clearCanvas);
}

function saveDrawing()
{
    //var timestamp = Number(new Date());
    //var storageRef = firebase.storage().ref(timestamp.toString());
    var storageRef = firebase.storage().ref();

    canvas.toBlob(function (blob) {
        var image = new Image();
        image.src = blob;
        var uploadTask = storageRef.child('images/' + "canvas").put(blob);
    });

    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
    });

    //storageRef.put(canvas.toDataURL());
}

function newDrawing(data)
{
    draw(data);
}

function mousePressed() 
{
    dataLocal.x0 = mouseX;
    dataLocal.y0 = mouseY;
}

function mouseDragged()
{
    dataLocal.x1 = mouseX;
    dataLocal.y1 = mouseY;

    socket.emit('mouse', dataLocal);

    draw(dataLocal);
}

function draw(position)
{
    fill(0, 0, 0); 
    strokeWeight(4)
    line(position.x0, position.y0, position.x1, position.y1);

    dataLocal.x0 = position.x1;
    dataLocal.y0 = position.y1;

    saveDrawing();
}

function clearCanvas()
{
    strokeWeight(0)
    fill('white');
    rect(1, 1, 540, 960);
}

function buttonClear()
{
    socket.emit('clear');
    clearCanvas();
}