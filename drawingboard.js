
$(document).ready(function () {
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
})