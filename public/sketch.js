
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
    
    var config = {
        apiKey: "AIzaSyC4cQmnCHXvkDLE6QISv4RSv59EDQnZiCc",
        authDomain: "socket-sketch-7355b.firebaseapp.com",
        databaseURL: "https://socket-sketch-7355b-default-rtdb.firebaseio.com",
        projectId: "socket-sketch-7355b",
        storageBucket: "socket-sketch-7355b.appspot.com",
        messagingSenderId: "1017385164549",
        appId: "1:1017385164549:web:4e28c02faecadefc77616c"
    };
    var firebase = initializeApp(config);
    var database = firebase.database();
    
}

function saveDrawing()
{
    var ref = database.ref('drawings');
    var data = {
        name: "Dan",
        drawing: drawing
    }
    var result = ref.push(data, dataSent);
    console.log(result.key);
    function dataSent(status){
        console.log(status);
    }
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

    //saveDrawing();
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