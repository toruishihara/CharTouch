var num_quiz = 10;
var startTime = 0;
var count = 0; // number of touched item
var FontSize = 32;
var answer_array_width = 20;
var answer_array_height = 20;
var answer_offset = 90;
var default_grade = "3k_12";
var mat;// = new Array(20*15);
var mat_base = 20;
//var msg = document.getElementById("quizMessage");
var full = document.getElementById("gameScreen");
var date = new Date();
var Quizs;// = new Array(num_quiz);
var results;// = new Array(num_quiz);
var UsedQuiz;// = new Array(all_quiz_num);
var isIphone = 0;
var LeftOffset = 16;
var g_char_canvas;// = new Array(10);
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

document.getElementById("quizMessage").style.display = "none";

console.log("top level main");

function onload() {
    console.log("onload");
    gameTitle();
    setTimeout(gameStart, 4000);
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
               }, 2000);
    setTimeout(function(){
               title.style.display = "none";
               }, 4000);
}

function gameStart() {
    count = 0;
    console.log("game_start innerWidth=" + window.innerWidth + " H=" + window.innerHeight);
	document.getElementById("resultMessage").style.display = "none";
    if (window.innerWidth <= 640) {
        isIphone = 1;
        //FontSize = 24 + (window.innerWidth - 320)/13;
        FontSize = 32;
        answer_array_width = 9;
        answer_array_height = 9;
        //answer_offset = 60;
        answer_offset = 90;
        LeftOffset = 16;
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
    Quizs = new Array(num_quiz);
    results = new Array(num_quiz);
    UsedQuiz = new Array(all_quiz_num);
    g_char_canvas = new Array(num_quiz);

    console.log("num_quiz=" + num_quiz);
    for(var i=0; i<num_quiz; i++){
        var q, qz;
        do { 
            q = Math.floor( Math.random() * all_quiz_num );
            if (all_quiz[data_prefix+q]) {
                qz = all_quiz[data_prefix+q].split(",");
            }
        } while (UsedQuiz[qz[0]] == 1);
        Quizs[i] = q;
        UsedQuiz[qz[0]] = 1;
        g_char_canvas[i] = new CharCanvas(i, qz[0], FontSize);
        g_char_canvas[i].init();

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
        
        g_char_canvas[i].canvas.addEventListener("touchstart", touchHandler, true);
        g_char_canvas[i].canvas.addEventListener("click", touchHandler, true);
        g_char_canvas[i].start(LeftOffset + (x * FontSize), answer_offset + (y * FontSize));
    }
    nextQuiz();
    setTimeout(mergeCharCanvas, 3300);
}
function mergeCharCanvas() {
    for(var i=0;i<num_quiz;++i){
        g_char_canvas[i].merge();
    }

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
    if (count >= num_quiz){
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
    for(var i=0;i<num_quiz;++i) {
        if (results[i] == 1) {
            sam = sam + 1;
        }
    }
	obj.innerHTML = sam*100/num_quiz;
	msg.style.display = "inline";
}

/*
function combineOneCharCavas()
{
    for(var i=0; i<num_quiz; i++){
        var px = document.getElementById("p"+i);
        if (px) {
            px.parentNode.removeChild(px);
        }
        var qz = all_quiz[data_prefix + Quizs[i]].split(",");
        var parts = qz[0].split("_");

        var canvas = document.getElementById("f"+i);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFFF00";
        ctx.font = "32px Helvetica";
        ctx.textBaseline="top";
        ctx.fillText(parts[0], 0, 0);
    }
}
function createOneCharCanvas(canvas,str)
{
    var parts = str.split("_");
	canvas.height = FontSize;
	canvas.width = FontSize;
	canvas.style = "background-color:rgba(0,0,0,0.0)";
	var ctx = canvas.getContext("2d");
    
	ctx.fillStyle = "#FFFF00";
	ctx.font = "32px Helvetica";
	ctx.textBaseline="top";
	ctx.fillText(parts[0], 0, 0);
    
	var i = 1;
	while(parts[i]) {
		blackOut(ctx, parts[i]);
		i++;
	}
}
function createOnePartCanvas(canvas,str)
{
    var parts = str.split("_");
	canvas.height = FontSize;
	canvas.width = FontSize;
	canvas.style = "background-color:rgba(0,0,0,0.0)";
	var ctx = canvas.getContext("2d");
    
	var i = 1;
	ctx.beginPath();
	while(parts[i]) {
		clipRect(ctx, parts[i]);
		i++;
	}
	ctx.clip();
    
	ctx.fillStyle = "#FFFF00";
	ctx.font = "32px Helvetica";
	ctx.textBaseline="top";
	ctx.fillText(parts[0], 0, 0);
}
function blackOut(ctx, str)
{
	var part = str.charAt(0);
	var x = parseInt(str.substr(1,2), 10);
	var y = parseInt(str.substr(3,2), 10);
	var w = parseInt(str.substr(5,2), 10);
	var h = parseInt(str.substr(7,2), 10);
	ctx.fillStyle="rgba(0,0,0,1.0)";
	ctx.clearRect(x*FontSize/100,y*FontSize/100,w*FontSize/100,h*FontSize/100);
}
function clipRect(ctx, str)
{
	var part = str.charAt(0);
	var x = parseInt(str.substr(1,2), 10);
	var y = parseInt(str.substr(3,2), 10);
	var w = parseInt(str.substr(5,2), 10);
	var h = parseInt(str.substr(7,2), 10);
	ctx.rect(x*FontSize/100,y*FontSize/100,w*FontSize/100,h*FontSize/100);
}
*/

