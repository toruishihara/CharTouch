var g_debug = 1;
var g_test = 0;
var g_num_quiz = 10;
var startTime = 0;
var count = 0; // number of touched item
var g_font_size = 32;
var g_answer_array_width = 9;
var g_answer_array_height = 9;
var g_answer_offset = 90;
var default_grade = "3k_64";
var mat;// = new Array(20*15);
var mat_base = 20;
//var msg = document.getElementById("quizMessage");
var full = document.getElementById("gameScreen");
var date = new Date();
var Quizs;// = new Array(g_num_quiz);
var results;// = new Array(g_num_quiz);
var UsedQuiz;// = new Array(all_quiz_num);
var isIphone = 0;
var g_left_offset = 16;
var g_char_canvas;// = new Array(10);
var g_time_game_start = 4000;
var g_test_base = 0;

console.log("start at " + date.getTime());

// Debug console redirection
/*
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
 */
// End Debug console redirection

full.addEventListener("touchmove", moveHandler, true); 

document.getElementById("restart").addEventListener("touchstart", gameStart, true);
document.getElementById("setting").addEventListener("touchstart", gameSetting, true);

if (g_debug) {
    document.getElementById("restart").addEventListener("click", gameStart, true);
    document.getElementById("setting").addEventListener("click", gameSetting, true);
    g_time_game_start = 1000;
    document.getElementById("test").addEventListener("touchstart", gameTestStart, true);
    document.getElementById("test").addEventListener("click", gameTestStart, true);
    document.getElementById("testNext").addEventListener("touchstart", gameTestNext, true);
    document.getElementById("testNext").addEventListener("click", gameTestNext, true);
}

document.getElementById("quizMessage").style.display = "none";

console.log("top level main");


function onload() {
    console.log("onload");
    gameTitle();
    setTimeout(gameStart, g_time_game_start);
}

function moveHandler(evt) {
    console.log("moveHandler " + evt.target.tagName);
    if (evt.target.tagName != 'SELECT' && evt.target.tagName != 'INPUT') {
        evt.preventDefault();
    }
}

function gameTitle() {
    console.log("gameTitle");
	document.getElementById("resultMessage").style.display = "none";

    var title = document.getElementById("titleLogo");
    setTimeout(function(){
               title.className = "fadeTitle";
               }, g_time_game_start/2);
    setTimeout(function(){
               title.style.display = "none";
               }, g_time_game_start);
}

function adjustToScreenSize() {
    console.log("game_start innerWidth=" + window.innerWidth + " H=" + window.innerHeight);
    if (window.innerWidth <= 640 && !g_test) {
        isIphone = 1;
        //g_font_size = 24 + (window.innerWidth - 320)/13;
        g_font_size = 32;
        g_answer_array_width = 9;
        g_answer_array_height = 9;
        //g_answer_offset = 60;
        g_answer_offset = 90;
        g_left_offset = 16;
    }
    
}

function gameStart() {
    adjustToScreenSize();
    count = 0;
	document.getElementById("resultMessage").style.display = "none";
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
    Quizs = new Array(g_num_quiz);
    results = new Array(g_num_quiz);
    UsedQuiz = new Array(all_quiz_num);
    g_char_canvas = new Array(g_num_quiz);

    console.log("g_num_quiz=" + g_num_quiz);
    for(var i=0; i<g_num_quiz; i++){
        var q, qz;
        do { 
            q = Math.floor( Math.random() * all_quiz_num );
            if (all_quiz[data_prefix+q]) {
                qz = all_quiz[data_prefix+q].split(",");
            }
        } while (!qz || UsedQuiz[qz[0]] == 1);
        Quizs[i] = q;
        UsedQuiz[qz[0]] = 1;
        g_char_canvas[i] = new CharCanvas(i, qz[0], g_font_size);
        g_char_canvas[i].init();

        var x,y;
        do {
            x = Math.floor(Math.random()*(g_answer_array_width));
            y = Math.floor(Math.random()*g_answer_array_height);
        } while (mat[mat_base + y*g_answer_array_width + x] > 0);
        mat[mat_base + y*g_answer_array_width + x] = 1;
        mat[mat_base + y*g_answer_array_width + x+1] = 1;
        mat[mat_base + y*g_answer_array_width + x+2] = 1;
        mat[mat_base + y*g_answer_array_width + x-1] = 1;
        mat[mat_base + y*g_answer_array_width + x-2] = 1;
        mat[mat_base + (y-1)*g_answer_array_width + x] = 1;
        mat[mat_base + (y-1)*g_answer_array_width + x+1] = 1;
        mat[mat_base + (y-1)*g_answer_array_width + x-1] = 1;
        mat[mat_base + (y+1)*g_answer_array_width + x] = 1;
        mat[mat_base + (y+1)*g_answer_array_width + x+1] = 1;
        mat[mat_base + (y+1)*g_answer_array_width + x-1] = 1;
        
        g_char_canvas[i].canvas.addEventListener("touchstart", touchHandler, true);
        g_char_canvas[i].canvas.addEventListener("click", touchHandler, true);
        g_char_canvas[i].start(g_left_offset + (x * g_font_size), g_answer_offset + (y * g_font_size));
    }
    nextQuiz();
    setTimeout(mergeCharCanvas, 2100);
}

function gameTestStart() {
    g_test = 1;
    g_num_quiz = g_answer_array_width*g_answer_array_width;
    
    count = 0;
    var grade = window.localStorage["grade"];
    console.log("grade=" + grade);
    if (grade==undefined || grade.length < 2) {
        console.log("grade=default");
        grade = default_grade;
    }
    
    data_prefix = grade.split("_")[0];
    all_quiz_num = grade.split("_")[1];
    console.log("pre=" + data_prefix + " qn=" + all_quiz_num);
        
    console.log("g_num_quiz=" + g_num_quiz);
    for(var i=0; i<g_num_quiz; i++) {
        var q = g_test_base + i;
        if (!all_quiz[data_prefix+q]) {
            continue;
        }
        var qz = all_quiz[data_prefix+q].split(",");
        
        var char_canvas = new CharCanvas(i, qz[0], g_font_size);
        char_canvas.init();
        
        var x,y;
        x = i%g_answer_array_width;
        y = Math.floor(i/g_answer_array_width);
        console.log("i="+i+ " x=" + x + " y=" + y);
        
        char_canvas.start(g_left_offset + (x * g_font_size), g_answer_offset + (y * g_font_size));
    }
}
function mergeCharCanvas() {
    for(var i=0;i<g_num_quiz;++i){
        if (g_char_canvas[i]) {
            g_char_canvas[i].merge();
        }
    }

}

function gameTestNext() {
    g_test_base += 81;
    gameTestStart();
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
        //this.savedId = this.id;
        this.className = "shake";
        setTimeout(function(){
                   obj.iclassName = "";
                   }, 2000);
        results[count] = -1;
        return;
    }
    setTimeout(function(){
        console.log("hide item");
        obj.style.display = "none";
    }, 2000);
    this.className = "fade";
    if (results[count] != -1) {
        results[count] = 1;
    }
    count = count + 1;
    if (count >= g_num_quiz){
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

    qz = all_quiz[data_prefix+Quizs[count]].split(",");
    obj.innerHTML = qz[1];
    msg.style.display = "inline";
    //document.getElementById("qhelp").className = "fade";
}

function showResult() {
    console.log("showResult");
	var obj = document.getElementById("result");
	var msg = document.getElementById("resultMessage");
    
    var sam = 0;
    for(var i=0;i<g_num_quiz;++i) {
        if (results[i] == 1) {
            sam = sam + 1;
        }
    }
	obj.innerHTML = sam*100/g_num_quiz;
	msg.style.display = "inline";
}
