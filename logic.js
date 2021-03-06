
function begin() {
    canvas = document.getElementById('Tricanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', MouseDown, false);
    canvas.addEventListener('mouseup', MouseUp, false);
    canvas.addEventListener('mousemove', MouseMove, false);
    canvas.addEventListener('dblclick', MouseDoubleClick, false);

    numoftri = [];
    tricolors = ["royalblue","yellow","pink","orange","gray","black","red","green","violet","indigo"];

    index = 0;
    flag = false;
    drag = false;
    canvas.onselectstart = function () { return false; };

}
function MouseDoubleClick(e) {
    var pos = getMousePos(canvas, e);
    dbX = pos.x;
    dbY = pos.y;
    if (numoftri !== null) {
        for (var j = 0; j < numoftri.length; j++) {
            intializePath(numoftri[j]);
            if (ctx.isPointInPath(dbX, dbY)) {
                numoftri.splice(j, 1);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawMoveTri();
            }
        }
    }
}


function MouseDown(e) {
    var pos = getMousePos(canvas, e);
    MouseX = pos.x;
    MouseY = pos.y;
    //drawTriangle()
    mc = true;
    if (numoftri !== null) {
        for (var j = 0; j < numoftri.length; j++) {
            intializePath(numoftri[j]);
            if (ctx.isPointInPath(MouseX, MouseY)) {

                index = j;
                drag = true;

            }
        }
    }
}

function MouseMove(e) {
    var pos = getMousePos(canvas, e);

    if (mc) {
        mmx = pos.x;
        mmy = pos.y;
        if (drag) {
            var newX = mmx - MouseX;
            var newY = mmy - MouseY;
            MouseX = mmx;
            MouseY = mmy;
            numoftri[index].X += newX;
            numoftri[index].Y += newY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMoveTri();
        }
        else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTriangle();
        }

    }

}

function MouseUp() {

    mc = false;
    drag = false;
    // doubleClick = false;
    if (flag) {
        var index = Math.floor(Math.random() * 6);
        ctx.fillStyle = tricolors[index];
        ctx.fill();
        numoftri.push({ X: 0, Y: 0, x0: MouseX, y0: MouseY, x1: mmx, y1: mmy, x2: MouseX + (MouseX - mmx), y2: mmy, col: index });
        flag = false;
    }
}

function drawTriangle() {

    if (numoftri !== null) {
        for (var i = 0; i < numoftri.length; i++) {
            redraw(numoftri[i]);
        }

    }

    ctx.beginPath();
    ctx.moveTo(MouseX, MouseY);
    ctx.lineTo(mmx, mmy);
    ctx.lineTo(MouseX + (MouseX - mmx), mmy);
    ctx.closePath();
    ctx.stroke();
    flag = true;
}
function redraw(numoftri) {

    ctx.beginPath();
    ctx.moveTo(numoftri.x0 + numoftri.X, numoftri.y0 + numoftri.Y);
    ctx.lineTo(numoftri.x1 + numoftri.X, numoftri.y1 + numoftri.Y);
    ctx.lineTo(numoftri.x2 + numoftri.X, numoftri.y2 + numoftri.Y);
    ctx.closePath();
    ctx.fillStyle = tricolors[numoftri.col];
    ctx.fill();
}
function intializePath(numoftri) {
    ctx.beginPath();
    ctx.moveTo(numoftri.x0 + numoftri.X, numoftri.y0 + numoftri.Y);
    ctx.lineTo(numoftri.x1 + numoftri.X, numoftri.y1 + numoftri.Y);
    ctx.lineTo(numoftri.x2 + numoftri.X, numoftri.y2 + numoftri.Y);
    ctx.closePath();
}

function drawMoveTri() {
    for (var k = 0; k < numoftri.length; k++) {

        ctx.beginPath();
        ctx.moveTo(numoftri[k].x0 + numoftri[k].X, numoftri[k].y0 + numoftri[k].Y);
        ctx.lineTo(numoftri[k].x1 + numoftri[k].X, numoftri[k].y1 + numoftri[k].Y);
        ctx.lineTo(numoftri[k].x2 + numoftri[k].X, numoftri[k].y2 + numoftri[k].Y);
        ctx.closePath();
        ctx.fillStyle = tricolors[numoftri[k].col];
        ctx.fill();

    }
}
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    }
}
function Clear() {
    numoftri = [];
    flag = false;
    drag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
