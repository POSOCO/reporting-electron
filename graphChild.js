var ipc = require("electron").ipcRenderer;



var trace1 = {
    x: [0],
    y: [0],
    type: 'scatter'
};
var data = [trace1];
var layout = {
    title: 'Drawing'
};
Plotly.newPlot('myDiv', data, layout);

ipc.on('append-graph-data', function (event, data) {
    for (var i = 0; i < data.data.length; i++) {
        trace1.x.push(data.data[i][0]);
        trace1.y.push(data.data[i][1]);
    }

    Plotly.newPlot('myDiv', [trace1], layout);
});

ipc.on('replace-graph-data', function (event, data) {
    trace1.x = [];
    trace1.y
        = [];
    for (var i = 0; i < data.data.length; i++) {
        trace1.x.push(data.data[i][0]);
        trace1.y.push(data.data[i][1]);
    }

    Plotly.newPlot('myDiv', [trace1], layout);
});