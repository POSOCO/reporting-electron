function getStateTotalNetMUData(stateStr,  done) {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getNetScheduleData(new Date(day), rev, function (data) {
            //Search for geb columns
            //first combine the first 2 rows strings
            var headings = [];
            for (var i = 0; i < data[0].length; i++) {
                headings[i] = data[0][i] + " " + data[1][i];
            }
            var headingIndex = headings.indexOf(stateStr);
            if (headingIndex == -1) {
                done({"mu": "Invalid State Search String"});
                return;
            }
            //now search for MWHR row index in second column
            var muRow = -1;
            for (var i = 0; i < data.length; i++) {
                if (data[i][1] == "MWHR") {
                    muRow = i;
                    //TODO skip for loop
                }
            }
            done({"mu": (data[muRow][headingIndex]) * 0.001});
        });
    });
}

function getStateTotalNetMU(){
    var stateSelectEl = document.getElementById("stateSelect");
    var stateStr = stateSelectEl.options[stateSelectEl.selectedIndex].innerHTML;
    getStateTotalNetMUData(stateStr, function (data) {
        WriteLineConsole(JSON.stringify(data));
    });
}