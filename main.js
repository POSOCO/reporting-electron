var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

var graphChildWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        'web-preferences': {
            'web-security': false
        },
        width: 1920,
        height: 1080,
        resizable: false,
        icon: __dirname + '/favicon.ico'
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    //ipc stuff
    var ipc = require("electron").ipcMain;

    ipc.on('create-graph', function (event, args) {
        if (graphChildWindow == null) {
            graphChildWindow = new BrowserWindow({
                'web-preferences': {
                    'web-security': false
                },
                width: 800,
                height: 800,
                resizable: true,
                show: false,
                icon: __dirname + '/favicon.ico'
            });
            // and load the index.html of the app.
            graphChildWindow.loadURL('file://' + __dirname + '/graphChild.html');

            // Emitted when the window is closed.
            graphChildWindow.on('closed', function () {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                graphChildWindow = null;
            });

            graphChildWindow.webContents.on('did-finish-load', function () {
                graphChildWindow.show();
                graphChildWindow.webContents.send('append-graph-data', args);
            });
        }
        else {
            graphChildWindow.show();
            graphChildWindow.webContents.send('append-graph-data', args);
        }
    });

    ipc.on('create-graph-replace', function (event, args) {
        if (graphChildWindow == null) {
            graphChildWindow = new BrowserWindow({
                'web-preferences': {
                    'web-security': false
                },
                width: 800,
                height: 800,
                resizable: true,
                show: false,
                icon: __dirname + '/favicon.ico'
            });
            // and load the index.html of the app.
            graphChildWindow.loadURL('file://' + __dirname + '/graphChild.html');

            // Emitted when the window is closed.
            graphChildWindow.on('closed', function () {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                graphChildWindow = null;
            });

            graphChildWindow.webContents.on('did-finish-load', function () {
                graphChildWindow.show();
                graphChildWindow.webContents.send('replace-graph-data', args);
            });
        }
        else {
            graphChildWindow.show();
            graphChildWindow.webContents.send('replace-graph-data', args);
        }
    });
    
});