// Debug console redirection

console = new Object();
console.log = function(log) {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", "ios-log:#iOS#" + log);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;    
}
console.debug = console.log;
console.info = console.log;
console.warn = console.log;
console.error = console.log;

// End Debug console redirection

console.log("setting top");
document.getElementById("backBtn").addEventListener("touchstart", gameBack, true);
document.getElementById("grade").addEventListener("change", gradeChange, true);

function onloadSetting() {
    var grade = window.localStorage["grade"];
    console.log("onload_setting grade=" + grade);
    if (grade != undefined && grade.length >= 2) {
        document.getElementById("grade").value = grade;
    }
}

function gameBack() {
    console.log("game_back");
    location.href="index.html";
}

function gradeChange(e) {
    console.log("grade change " + e.target.id + ":" + e.target.value);
    
    var grade = document.getElementById("grade").value;
    window.localStorage.setItem(e.target.id, e.target.value);
    location.href="index.html";
}