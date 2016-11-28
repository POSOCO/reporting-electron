function getStateTotalNetMUData(stateStr, day, rev, done) {
    getNetScheduleData(day, rev, function (data) {
        //Search for geb columns
        //first combine the first 2 rows strings
        var headings = [];
        for (var i = 0; i < data[0].length; i++) {
            headings[i] = data[0][i] + " " + data[1][i];
        }
        var headingIndex = headings.indexOf(stateStr);
        if (headingIndex == -1) {
            done({"mu": -1, "Error": "Invalid State Search String"});
            return;
        }
        //now search for MWHR row index in second column
        var muRow = -1;
        for (var i = 0; i < data.length; i++) {
            if (data[i][1] == "MWHR") {
                muRow = i;
                break;
            }
        }
        done({"mu": (data[muRow][headingIndex]) * 0.001});
    });
}

function getStateTotalNetMU() {
    var day = document.getElementById("dateInp").value;
    var stateSelectEl = document.getElementById("stateSelect");
    var stateStr = stateSelectEl.options[stateSelectEl.selectedIndex].value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getStateTotalNetMUData(stateStr, new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

function getAllStatesTotalNetMU() {
    var day = document.getElementById("dateInp").value;
    var stateSelectEl = document.getElementById("stateSelect");
    //get latest revision
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        for (var i = 0; i < stateSelectEl.options.length; i++) {
            var stateStr = stateSelectEl.options[i].value;
            var callBackFactory = function () {
                var str = stateStr;
                return function (data) {
                    WriteLineConsole(str + " Net MUs is " + data.mu);
                }
            };
            getStateTotalNetMUData(stateStr, new Date(day), rev, callBackFactory());
        }
    });
}