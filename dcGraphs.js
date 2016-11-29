// UI fetch function
function getDCGraphs() {
    var day = document.getElementById("dateInp").value;
    getRevisionData(new Date(day), function (data) {
        WriteLineConsole("Latest revision is " + data[0]["Revision"]);
        var rev = data[0]["Revision"];
        getDCData(new Date(day), rev, function (data) {
            //WriteLineConsole(JSON.stringify(data));
            WriteLineConsole("Launching the graph window...");
            var generatorIndex = 2;
            //get the header values
            var genSelectEl = document.getElementById("generatorSelect");
            var selectedGenerator = genSelectEl.options[genSelectEl.selectedIndex].value;
            for (var i = 0; i < data.jaggedarray[0].length; i++) {
                var dataStr = data.jaggedarray[0][i];
                if(dataStr.indexOf(selectedGenerator) == 0){
                    generatorIndex = i;
                }
            }
            //get the time block rows
            var orderedPairs = [];
            //get the generatorIndex
            for (var blk = 1; blk <= 96; blk++) {
                orderedPairs.push([data.jaggedarray[blk][0], data.jaggedarray[blk][generatorIndex]]);
            }
            ipc.send('create-graph-replace', {data: orderedPairs});
        });
    });
}