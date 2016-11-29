function getStateTotalNetMUData(stateStr, day, rev, header, done) {
    getNetScheduleData(day, rev, function (data) {
        // Search for MWHR row index in second column
        var muRow = -1;
        var muArray = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i][1] == header) {
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
                muArray[i] = {"value": -1, "tag": header, "Error": "Invalid State Search String", name: stateStr[i]};
            } else {
                muArray[i] = {"value": (data[muRow][headingIndex]) , "tag": header, name: stateStr[i]};
            }
        }
		//now get the MTOA, STOA, LTA, IEX, PXI MUs
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
        getStateTotalNetMUData([stateStr], new Date(day), rev, "MWHR", function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

function getAllStatesTotalNetMU() {
    var day = document.getElementById("dateInp").value;
    var stateSelectEl = document.getElementById("stateSelect");
    var stateStrArray = [];
    for (var i = 0; i < stateSelectEl.options.length; i++) {
        //stateStrArray.push(stateSelectEl.options[i].value);
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " Total");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " MTOA");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " STOA");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " LTA");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " IEX");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " PXI");
    }
    //get latest revision
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getStateTotalNetMUData(stateStrArray, new Date(day), rev, "MWHR", function (data) {
            //WriteLineConsole(JSON.stringify(data));
			for (var i = 0; i < data.muArray.length; i++) {
				WriteLineConsole(JSON.stringify(data.muArray[i]));
			}
        });
    });
}

function getAllStatesValuesAtHrs(hr) {
    var day = document.getElementById("dateInp").value;
    var stateSelectEl = document.getElementById("stateSelect");
    var stateStrArray = [];
    for (var i = 0; i < stateSelectEl.options.length; i++) {
        //stateStrArray.push(stateSelectEl.options[i].value);
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " Total");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " MTOA");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " STOA");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " LTA");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " IEX");
        stateStrArray.push(stateSelectEl.options[i].innerHTML + " PXI");
    }
    //get latest revision
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getStateTotalNetMUData(stateStrArray, new Date(day), rev, hr, function (data) {
            //WriteLineConsole(JSON.stringify(data));
			for (var i = 0; i < data.muArray.length; i++) {
				WriteLineConsole(JSON.stringify(data.muArray[i]));
			}
        });
    });
}