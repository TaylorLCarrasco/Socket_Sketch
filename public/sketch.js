var socket;
var dataLocal;
var database;

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

function upload()
{
    var files = [];
    document.getElementById("files").addEventListener("change", function (e) {
        files = e.target.files;
    });

    document.getElementById("send").addEventListener("click", function () {
        //checks if files are selected
        if (files.length != 0) {

            //Loops through all the selected files
            for (let i = 0; i < files.length; i++) {

                //create a storage reference
                var storage = firebase.storage().ref(files[i].name);

                //upload file
                var upload = storage.put(files[i]);

                //update progress bar
                upload.on(
                    "state_changed",
                    function progress(snapshot) {
                        var percentage =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.getElementById("progress").value = percentage;
                    },

                    function error() {
                        alert("error uploading file");
                    },

                    function complete() {
                        document.getElementById(
                            "uploading"
                        ).innerHTML += `${files[i].name} upoaded <br />`;
                    }
                );
            }
        } else {
            alert("No file chosen");
        }
    });
}


function saveDrawing()
{
    var ref = database.ref('drawings');
    var data = {
        name: "Dan",
        drawing: "drawing"
    }
    ref.push(data);    
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