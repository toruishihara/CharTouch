var num_quiz = 10;
var startTime = 0;
var count = 0; // number of touched item
var font_size = 32;
var answer_array_width = 20;
var answer_array_height = 20;
var answer_offset = 120;
var default_grade = "1m_20";
var mat;// = new Array(20*15);
var mat_base = 20;
var msg = document.getElementById("quizMessage");
var full = document.getElementById("gameScreen");
var date = new Date();
var quizs;// = new Array(num_quiz);
var results;// = new Array(num_quiz);
var used_quiz;// = new Array(all_quiz_num);
var isIphone = 0;
var left_offset = 32;
console.log("start " + date.getTime());

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

//msg.addEventListener("touchstart", function(evt){evt.preventDefault();},true);
//msg.addEventListener("click", function(evt){evt.preventDefault();},true);

//full.addEventListener('touchmove', function(e){ e.preventDefault(); }); 
document.getElementById("restart").addEventListener("touchstart", gameStart, true);
document.getElementById("setting").addEventListener("touchstart", gameSetting, true);
document.getElementById("backbtn").addEventListener("touchstart", gameBack, true);

document.getElementById("quizMessage").style.display = "none";

console.log("top level main");
onload();
//window.addEventListener("load", onload, true);

function onload() {
    console.log("onload");
    gameTitle();
    setTimeout(gameStart, 4000);
}

function gameTitle() {
    console.log("gameTitle");
	document.getElementById("resultMessage").style.display = "none";

    var title = document.getElementById("titleLogo");
    setTimeout(function(){
               title.className = "fadeTitle";
               }, 2000);
    setTimeout(function(){
               title.style.display = "none";
               }, 4000);
}

function gameStart() {
    count = 0;
    console.log("game_start innerWidth=" + window.innerWidth);
	document.getElementById("resultMessage").style.display = "none";
    if (window.innerWidth <= 320) {
        isIphone = 1;
        font_size = 24;
        answer_array_width = 13;
        answer_array_height = 13;
        answer_offset = 60;
        left_offset = 10;
    }
    var grade = window.localStorage["grade"];
    console.log("grade=" + grade);
    if (grade==undefined || grade.length < 2) {
        console.log("grade=default");
        grade = default_grade;
    }
        
    data_prefix = grade.split("_")[0];
    all_quiz_num = grade.split("_")[1];
    console.log("pre=" + data_prefix + " qn=" + all_quiz_num);

    mat = new Array(20*15);
    quizs = new Array(num_quiz);
    results = new Array(num_quiz);
    used_quiz = new Array(all_quiz_num);

    for(var i=0; i<num_quiz; i++){
        var old = document.getElementById("f"+i);
        if (old != null) {
            old.parentNode.removeChild(old);
        }
        var q;
        do { 
            q = Math.floor( Math.random() * all_quiz_num );
            qz = all_quiz[data_prefix+q].split(",");
        } while (used_quiz[qz[0]] == 1);
        quizs[i] = q;
        used_quiz[qz[0]] = 1;
        var ele = document.createElement("div");
        ele.id = "f"+i;
        qz = all_quiz[data_prefix+q].split(",");
        ele.innerHTML = qz[0];
        var x,y;
        do {
            x = Math.floor(Math.random()*(answer_array_width-1));
            y = Math.floor(Math.random()*answer_array_height);
        } while (mat[mat_base + y*answer_array_width + x] > 0);
        mat[mat_base + y*answer_array_width + x] = 1;
        mat[mat_base + y*answer_array_width + x+1] = 1;
        mat[mat_base + y*answer_array_width + x+2] = 1;
        mat[mat_base + y*answer_array_width + x-1] = 1;
        mat[mat_base + y*answer_array_width + x-2] = 1;
        mat[mat_base + (y-1)*answer_array_width + x] = 1;
        mat[mat_base + (y-1)*answer_array_width + x+1] = 1;
        mat[mat_base + (y-1)*answer_array_width + x-1] = 1;
        mat[mat_base + (y+1)*answer_array_width + x] = 1;
        mat[mat_base + (y+1)*answer_array_width + x+1] = 1;
        mat[mat_base + (y+1)*answer_array_width + x-1] = 1;
        ele.style.left = left_offset + (x * font_size)+"px";
        ele.style.top = answer_offset + (y * font_size)+"px";
        ele.className = 'dropin';

        ele.addEventListener("touchstart", touchHandler, true);
        ele.addEventListener("click", touchHandler, true);
        document.getElementById("gameScreen").appendChild(ele);
    }
    nextQuiz();
}

function gameSetting() {
    console.log("gameSetting");
    //window.open('setting.html');
    location.href="setting.html";
    return false;
}

function gameBack() {
    console.log("game_back");
    location.href="index.html";
}

function touchHandler(evt) {
    console.log("touchHandler in " + this.id + " " + this.className);
    if (this.className == "fade") return;
    var obj = this;
    if (!this.id.match("f"+count)) {
        this.savedId = this.id;
        this.className = "shake";
        setTimeout(function(){
                   obj.id = obj.savedId;
                   }, 2000);
        results[count] = -1;
        return;
    }
    setTimeout(function(){
        obj.style.display = "none";
    }, 2000);
    this.className = "fade";
    if (results[count] != -1) {
        results[count] = 1;
    }
    count = count + 1;	// 旗を取得した数を1増やす
    if (count >= num_quiz){	// 全ての旗を取った
        showResult();
    } else {
        nextQuiz();
    }
    //console.log("touchHandler out");
}

function nextQuiz() {
	var obj = document.getElementById("quiz");
	var msg = document.getElementById("quizMessage");
    var d = new Date();

    qz = all_quiz[data_prefix+quizs[count]].split(",");
    obj.innerHTML = qz[1];
	msg.style.display = "inline";
    document.getElementById("qhelp").className = "fade";
}

function showResult() {
    console.log("showResult");
	var obj = document.getElementById("result");
	var msg = document.getElementById("resultMessage");
    
    var sam = 0;
    for(var i=0;i<num_quiz;++i) {
        if (results[i] == 1) {
            sam = sam + 1;
        }
    }
	obj.innerHTML = sam*100/num_quiz;
	msg.style.display = "inline";
}

