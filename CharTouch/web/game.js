var num_quiz = 10;
var startTime = 0;	// 開始時間
var count = 0;	// 旗を取った数
var data_prefix = "1n";
var all_quiz_num = 46;
//var timerID = null;	// タイマーID
var mat;// = new Array(20*15);
var mat_base = 20;
var msg = document.getElementById("quizMessage");
var full = document.getElementById("gameScreen");
var date = new Date();
var quizs;// = new Array(num_quiz);
var results;// = new Array(num_quiz);
var used_quiz;// = new Array(all_quiz_num);
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
//full.addEventListener("touchstart", function(evt){evt.preventDefault();},true);
document.getElementById("restart").addEventListener("touchstart", game_start, true);
document.getElementById("restart").addEventListener("click", game_start, true);
document.getElementById("grade").addEventListener("change", grade_change, true);

game_start();

function game_start() {
    count = 0;
    mat = new Array(20*15);
    quizs = new Array(num_quiz);
    results = new Array(num_quiz);
    used_quiz = new Array(all_quiz_num);
	document.getElementById("resultMessage").style.display = "none";

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
            x = Math.floor(Math.random()*20);
            y = Math.floor(Math.random()*15);
        } while (mat[mat_base + y*20 + x] == 1);
        mat[mat_base + y*20+x] = 1;
        mat[mat_base + y*20+x+1] = 1;
        mat[mat_base + y*20+x+2] = 1;
        mat[mat_base + y*20+x-1] = 1;
        mat[mat_base + (y-1)*20 + x] = 1;
        mat[mat_base + (y+1)*20 + x] = 1;
        ele.style.left = (x * 32)+"px";
        ele.style.top = 180 + (y * 32)+"px";

        ele.addEventListener("touchstart", touchHandler, true);
        ele.addEventListener("click", touchHandler, true);
        document.getElementById("gameScreen").appendChild(ele);
    }
    setTimeout("window.scrollTo(0,1)", 10);	// ナビゲーションバーを消す
    nextQuiz();
}

function touchHandler(evt) {
    console.log("touchHandler in " + this.id + " " + this.className);
    if (this.className == "fade") return;	// すでにタッチされ処理中の場合は以後の処理はしない
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
    console.log("touchHandler out");
}

function nextQuiz() {
	var obj = document.getElementById("quiz");
	var msg = document.getElementById("quizMessage");
    var d = new Date();
    msg.hideTime = d.getTime() + 60000;
    console.log("nextQuix in " + msg.hideTime);

    qz = all_quiz[data_prefix+quizs[count]].split(",");
    obj.innerHTML = qz[1];
	msg.style.display = "inline";
	setTimeout(hideQuizMessage, 60000);
    console.log("nextQuix out " + msg.hideTime);
}

function hideQuizMessage() {
	var msg = document.getElementById("quizMessage");
    var d = new Date();
    console.log("hideQuizMessage in " + d.getTime() );

	if (msg.hideTime <= d.getTime() ) {
        msg.style.display = "none";
    }
    console.log("hideQuizMessage out " + d.getTime() );
}

function showResult() {
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

function grade_change() {
    var grade = document.getElementById("grade").value;
    data_prefix = grade.split("_")[0];
    all_quiz_num = grade.split("_")[1];
    game_start();
}
