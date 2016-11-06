$(document).ready(function () {
    document.getElementById('dateInp').valueAsDate = new Date();
    getRevisions();
});

// UI fetch function
function getRevisions() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole(JSON.stringify(data));
    });
}

// UI fetch function
function getLatestRevision() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole(JSON.stringify(data[0], null, '\t'));
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
