var num_quiz = 10;
var startTime = 0;
var count = 0; // number of touched item
var font_size = 32;
var answer_array_width = 20;
var answer_array_height = 20;
var answer_offset = 120;
var default_grade = "1k_10";
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
console.log("start at " + date.getTime());

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

full.addEventListener("touchmove", moveHandler, true); 

document.getElementById("restart").addEventListener("touchstart", gameStart, true);
document.getElementById("setting").addEventListener("touchstart", gameSetting, true);
//document.getElementById("backbtn").addEventListener("touchstart", gameBack, true);

document.getElementById("quizMessage").style.display = "none";

console.log("top level main");
onload();
//window.addEventListener("load", onload, true);

ks = new Array(20);
ks['0'] = '花_U00009928';
ks['1'] = '字_U00009930_L00002042_R80001942';
ks['2'] = '学_U00009935_L00002050_R80001950';
ks['3'] = '休_L00002599_L00003025';
ks['4'] = '村_L00004399';
ks['5'] = '速_L00003099_B00809919';
ks['6'] = '岩_U00009935';
ks['7'] = '顔_L00005099';
ks['8'] = '黒_B00759999';
ks['9'] = '算_U00009932';
ks['10'] = '貝_B00759999';
ks['11'] = '貝_B00759999';


var charCnt = 0;
var fontSize = 32;
function createOneCharCanvas(canvas)
{
        qz = ks[charCnt].split("_");
	canvas.height = fontSize;
	canvas.width = fontSize;
	canvas.style = "background-color:rgba(0,0,0,0.0)";
	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "#FFFF00";
	ctx.font = "32px Helvetica";
	ctx.textBaseline="top";
	ctx.fillText(qz[0], 0, 0);

	var i = 1;
	while(qz[i]) {
		blackOut(ctx, qz[i]);
		i++;
	}
}
function createOnePartCanvas(canvas)
{
        qz = ks[charCnt].split("_");
	canvas.height = fontSize;
	canvas.width = fontSize;
	canvas.style = "background-color:rgba(0,0,0,0.0)";
	var ctx = canvas.getContext("2d");

	var i = 1;
	ctx.beginPath();
	while(qz[i]) {
		clipRect(ctx, qz[i]);
		i++;
	}
	ctx.clip();

	ctx.fillStyle = "#FFFF00";
	ctx.font = "32px Helvetica";
	ctx.textBaseline="top";
	ctx.fillText(qz[0], 0, 0);

	// only for debug
	charCnt++;
}

function blackOut(ctx, str)
{
	var part = str.charAt(0);
	var x = parseInt(str.substr(1,2), 10);
	var y = parseInt(str.substr(3,2), 10);
	var w = parseInt(str.substr(5,2), 10);
	var h = parseInt(str.substr(7,2), 10);
	ctx.fillStyle="rgba(0,0,0,1.0)";
	ctx.clearRect(x*fontSize/100,y*fontSize/100,w*fontSize/100,h*fontSize/100);
}
function clipRect(ctx, str)
{
	var part = str.charAt(0);
	var x = parseInt(str.substr(1,2), 10);
	var y = parseInt(str.substr(3,2), 10);
	var w = parseInt(str.substr(5,2), 10);
	var h = parseInt(str.substr(7,2), 10);
	ctx.rect(x*fontSize/100,y*fontSize/100,w*fontSize/100,h*fontSize/100);
}

function onload() {
    console.log("onload");
	// for faster debug
    gameTitle();
    //setTimeout(gameStart, 4000);
    setTimeout(gameStart, 400);
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
               }, 200);
    setTimeout(function(){
               title.style.display = "none";
               }, 400);
}

function gameStart() {
    count = 0;
    console.log("game_start innerWidth=" + window.innerWidth + " H=" + window.innerHeight);
	document.getElementById("resultMessage").style.display = "none";
    if (window.innerWidth <= 640) {
        isIphone = 1;
        font_size = 24 + (window.innerWidth - 320)/13;
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
        if (old) {
            old.parentNode.removeChild(old);
        }
        var old2 = document.getElementById("p"+i);
        if (old2) {
            old2.parentNode.removeChild(old2);
        }
        var q;
        do { 
            q = Math.floor( Math.random() * all_quiz_num );
            qz = all_quiz[data_prefix+q].split(",");
        } while (used_quiz[qz[0]] == 1);
        quizs[i] = q;
        used_quiz[qz[0]] = 1;
        qz = all_quiz[data_prefix+q].split(",");

        var ele = document.createElement('canvas');
        ele.id = "f"+i;
        //ele.innerHTML = qz[0];
	createOneCharCanvas(ele);

        var elePart = document.createElement('canvas');
        elePart.id = "p"+i;
	createOnePartCanvas(elePart);

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
        elePart.style.left = left_offset + (x * font_size)+"px";
        elePart.style.top = answer_offset + (y * font_size)+"px";
        elePart.className = 'dropin';

        ele.style.left = left_offset + (x * font_size)+"px";
        ele.style.top = answer_offset + (y * font_size)+"px";
        ele.className = 'slidein';

        ele.addEventListener("touchstart", touchHandler, true);
        ele.addEventListener("click", touchHandler, true);
        document.getElementById("gameScreen").appendChild(elePart);
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

