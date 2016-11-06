var mConsole;

//http://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
//https://developer.mozilla.org/en/docs/web/api/document/readystate
// alternative to DOMContentLoaded event
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        mConsole = document.getElementById("console");
    } else if (document.readyState == "complete") {
        //DOM load initialization function

    }
};

//Utility Functions
function WriteLineConsole(str) {
    var currentDate = new Date();
    var para = document.createElement("span");
    var n = "******************************";
    var node = document.createTextNode(str);
	para.appendChild(document.createElement("BR"));
    para.appendChild(document.createTextNode(n));
	para.appendChild(document.createElement("BR"));
    para.appendChild(node);
    para.appendChild(document.createElement("BR"));
    //mConsole.appendChild(para);
    mConsole.insertBefore(para, mConsole.firstChild);
}

//Utility Functions
function clearConsole() {
    mConsole.innerHTML = "";
}