var ipc = require("electron").ipcRenderer;

$(document).ready(function () {
    document.getElementById('dateInp').valueAsDate = new Date();
    getRevisions();
});

// UI fetch function
function getRevisions() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        //WriteLineConsole(JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
            WriteLineConsole(data[i].Revision + " ---> " + data[i].Remark);
        }
        //WriteLineConsole((data.map(function(obj){return (obj.Revision + "===>" + obj.Remark)})).join("\n"));
    });
}

// UI fetch function
function getLatestRevision() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole(JSON.stringify(data[0], null, '\t'));
        WriteLineConsole("Latest Revision Comment is " + data[0].Remark);
        WriteLineConsole("Latest Revision Number is " + data[0].Revision);
    });
}

// UI fetch function
function getDC() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getDCData(new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

// UI fetch function
function getRequisition() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getRequisitionData(new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

// UI fetch function
function getExpp() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getExppData(new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

// UI fetch function
function getNetSchedule() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getNetScheduleData(new Date(day), rev, function (data) {
            WriteLineConsole(JSON.stringify(data));
        });
    });
}

// server fetch function
function getRevisionData(day, cb) {
    // get the date string
    var dateStr = getDateString(day);
    $.ajax({
        //fetch revisions data from sever
        url: "http://103.7.130.121/WBES/Report/GetFullScheduleList?regionid=2&ScheduleDate=" + dateStr,
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            cb(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

// server fetch function
function getDCData(day, rev, cb) {
    // get the date string
    var dateStr = getDateString(day);
    $.ajax({
        //fetch revisions data from sever
        url: "http://103.7.130.121/WBES/Report/GetDeclarationReport?regionId=2&date=" + dateStr + "&revision=" + rev + "&utilId=ALL&isBuyer=0&byOnBar=0",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            cb(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

// server fetch function
function getRequisitionData(day, rev, cb) {
    // get the date string
    var dateStr = getDateString(day);
    $.ajax({
        //fetch revisions data from sever
        url: "http://103.7.130.121/WBES/Report/GetRldcData?isBuyer=false&utilId=ALL&regionId=2&scheduleDate=" + dateStr + "&revisionNumber=" + rev + "&byOnBar=0",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            cb(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

// server fetch function
function getExppData(day, rev, cb) {
    // get the date string
    var dateStr = getDateString(day);
    $.ajax({
        //fetch revisions data from sever
        url: "http://103.7.130.121/WBES/ReportFullSchedule/GetFullInjSummary?scheduleDate=" + dateStr + "&sellerId=ALL&revisionNumber=" + rev + "&regionId=2&byDetails=0&isDrawer=0&isBuyer=0",
        type: "GET",
        success: function (data) {
            //console.log(data);
            var resultData = extractScheduleFromJSString(data, "vardata=JSON.parse(\"", "\");");
            console.log(resultData);
            cb(resultData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

// server fetch function
function getNetScheduleData(day, rev, cb) {
    // get the date string
    var dateStr = getDateString(day);
    $.ajax({
        //fetch revisions data from sever
        url: "http://103.7.130.121/WBES/ReportNetSchedule/GetNetScheduleSummary?regionId=2&scheduleDate=" + dateStr + "&sellerId=ALL&revisionNumber=" + rev + "&byDetails=1&isBuyer=1",
        type: "GET",
        success: function (data) {
            //console.log(data);
            var resultData = extractScheduleFromJSString(data, "vardata=JSON.parse(\"", "\");");
            console.log(resultData);
            cb(resultData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

// utility function
function getDateString(today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

//utility function
function extractScheduleFromJSString(contents, firstvariable, secondvariable) {
    contents = contents.replace(/\s/g, '');
    var firstInd = contents.indexOf(firstvariable);
    var secondInd = contents.indexOf(secondvariable, firstInd);
    var extracted = contents.substring(firstInd + firstvariable.length, secondInd).replace(/\\/g, "");
    var expp_array = JSON.parse(extracted);
    return expp_array;
}

//utility function
function createGraphChild() {
    ipc.send('create-graph', {data: [[Math.random(), Math.random()], [Math.random(), Math.random()]]});
}