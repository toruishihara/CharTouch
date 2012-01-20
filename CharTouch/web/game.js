var startTime = 0;	// 開始時間
var count = 0;	// 旗を取った数
var timerID = null;	// タイマーID
kana = new Array("ヌ", "ヲ", "マ","メ","ミ","ケ","ワ","シ","ツ","ユ");
hira = new Array("ぬ", "を", "ま","め","み","け","わ","し","つ","ゆ");
var mat = new Array(20*15);
var msg = document.getElementById("quizMessage");
var date = new Date();
console.log("start " + date.getTime());

msg.addEventListener("touchstart", function(evt){evt.preventDefault();},true);
msg.addEventListener("click", function(evt){evt.preventDefault();},true);

for(var i=1; i<=10; i++){
	var ele = document.createElement("div");
	ele.id = "f"+i;
	ele.innerHTML = kana[i-1];
	var x,y;
	do {
	  x = Math.floor(Math.random()*20);
	  y = Math.floor(Math.random()*15);
	} while (mat[y*20+x] == 1)
	mat[y*20+x] = 1;
	ele.style.left = (x * 32)+"px";
	ele.style.top = (y * 32)+"px";

    ele.addEventListener("touchstart", touchHandler, true);
    ele.addEventListener("click", touchHandler, true);
	document.getElementById("gameScreen").appendChild(ele);
}
setTimeout("window.scrollTo(0,1)", 10);	// ナビゲーションバーを消す
nextQuiz();
setTimeout(function(){
	document.addEventListener("touchstart", function(evt){
		evt.preventDefault();	// 全体がスクロールするのを禁止
	}, true);
}, 1500);

function touchHandler(evt) {
    if (this.className == "fade") return;	// すでにタッチされ処理中の場合は以後の処理はしない
    //alert("id="+this.id+" count="+count+" match="+this.id.match("f"+(count+1)) );
    if (!this.id.match("f"+(count+1))) return;
    var obj = this;
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
}

function nextQuiz() {
	var obj = document.getElementById("quiz");
	var msg = document.getElementById("quizMessage");
    var d = new Date();
    msg.hideTime = d.getTime() + 2000;
    console.log("nextQuix " + msg.hideTime);

	obj.innerHTML = hira[count];
	msg.style.display = "inline";
	setTimeout(hideQuizMessage, 2000);
}

function hideQuizMessage() {
	var msg = document.getElementById("quizMessage");
    var d = new Date();
    console.log("hideQuizMessage " + d.getTime() );

	if (msg.hideTime <= d.getTime() ) {
        msg.style.display = "none";
    }
}