function getStateTotalNetMUData(stateStr, day, rev, done) {
    getNetScheduleData(day, rev, function (data) {
        // Search for MWHR row index in second column
        var muRow = -1;
        var muArray = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i][1] == "MWHR") {
                muRow = i;
                break;
            }
        }
        //Search for state columns
        //first combine the first 2 rows strings
        var headings = [];
        for (var i = 0; i < data[0].length; i++) {
            headings[i] = data[0][i] + " " + data[1][i];
        }
        for (var i = 0; i < stateStr.length; i++) {
            var headingIndex = headings.indexOf(stateStr[i]);
            if (headingIndex == -1) {
                muArray[i] = {"mu": -1, "Error": "Invalid State Search String", name: stateStr[i]};
            } else {
                muArray[i] = {"mu": (data[muRow][headingIndex]) * 0.001, name: stateStr[i]};
            }
        }
        done({"muArray": muArray});
    });
}

function getStateTotalNetMU() {
    var day = document.getElementById("dateInp").value;
    var stateSelectEl = document.getElementById("stateSelect");
    var stateStr = stateSelectEl.options[stateSelectEl.selectedIndex].value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getStateTotalNetMUData([stateStr], new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

function getAllStatesTotalNetMU() {
    var day = document.getElementById("dateInp").value;
    var stateSelectEl = document.getElementById("stateSelect");
    var stateStrArray = [];
    for (var i = 0; i < stateSelectEl.options.length; i++) {
        stateStrArray.push(stateSelectEl.options[i].value);
    }
    //get latest revision
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getStateTotalNetMUData(stateStrArray, new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}