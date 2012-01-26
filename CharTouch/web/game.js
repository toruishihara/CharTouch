var startTime = 0;	// 開始時間
var count = 0;	// 旗を取った数
var timerID = null;	// タイマーID
var mat = new Array(20*15);
var msg = document.getElementById("quizMessage");
var full = document.getElementById("gameScreen");
var date = new Date();
var quizs = new Array(10);
var used_quiz = new Array(50);
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
// Debug console redirection


msg.addEventListener("touchstart", function(evt){evt.preventDefault();},true);
msg.addEventListener("click", function(evt){evt.preventDefault();},true);

full.addEventListener("touchstart", function(evt){evt.preventDefault();},true);

for(var i=0; i<10; i++){
    var q;
    do { 
        q = Math.floor( Math.random() * 46 );
    } while (used_quiz[q] == 1)
    quizs[i] = q;
    used_quiz[q] = 1;
	var ele = document.createElement("div");
	ele.id = "f"+i;
	ele.innerHTML = num_answer[q];
	var x,y;
	do {
	  x = Math.floor(Math.random()*20);
	  y = Math.floor(Math.random()*15);
	} while (mat[y*20+x] == 1)
	mat[y*20+x] = 1;
	ele.style.left = (x * 32)+"px";
	ele.style.top = 90 + (y * 32)+"px";

    ele.addEventListener("touchstart", touchHandler, true);
    ele.addEventListener("click", touchHandler, true);
    document.getElementById("gameScreen").appendChild(ele);
}
setTimeout("window.scrollTo(0,1)", 10);	// ナビゲーションバーを消す
nextQuiz();

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
        return;
    }
    setTimeout(function(){
        obj.style.display = "none";
    }, 2000);
    this.className = "fade";
    count = count + 1;	// 旗を取得した数を1増やす
    if (count >= 10){	// 全ての旗を取った
        var t = (new Date()).getTime() - startTime;
        clearInterval(timerID);
    } else {
        nextQuiz();
    }
    console.log("touchHandler out");
}

function nextQuiz() {
	var obj = document.getElementById("quiz");
	var msg = document.getElementById("quizMessage");
    var d = new Date();
    msg.hideTime = d.getTime() + 20000;
    console.log("nextQuix in " + msg.hideTime);

	obj.innerHTML = answer_quiz[num_answer[quizs[count]]];
	msg.style.display = "inline";
	setTimeout(hideQuizMessage, 20000);
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