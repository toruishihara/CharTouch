var startTime = 0;	// 開始時間
var count = 0;	// 旗を取った数
var timerID = null;	// タイマーID
kana = new Array("ヌ", "ヲ", "マ","メ","ミ","ケ","ワ","シ","ツ","ユ");
hira = new Array("ぬ", "を", "ま","め","み","け","わ","し","つ","ゆ");
var mat = new Array(20*15);

//var msgEle = document.getElementById("message");
for(var i=1; i<=10; i++){
	var ele = document.createElement("div");
	ele.id = "f"+i;
	ele.innerHTML = kana[i-1];
	var x,y;
	do {
	  x = Math.floor(Math.random()*20);
	  y = Math.floor(Math.random()*15);
	} while (mat[y*20+y] == 0)
	mat[y*20+y] = 1;
	ele.style.left = (x * 32)+"px";
	ele.style.top = (y * 32)+"px";
	ele.addEventListener("touchstart", function(evt){
		if (this.className == "fade") return;	// すでにタッチされ処理中の場合は以後の処理はしない
		//alert("id="+this.id+" count="+count+" match="+this.id.match("f"+(count+1)) );
		if (!this.id.match("f"+(count+1))) return;
		var obj = this;
		setTimeout(function(){
			obj.style.display = "none";
		}, 2000);
		this.className = "fade";
		if (startTime == 0){	// 初めてタッチした場合
			startTime = (new Date()).getTime();
			timerID = setInterval(function(){
				msgEle.innerText = (new Date()).getTime() - startTime+"msec";
			}, 100);
		}
		count = count + 1;	// 旗を取得した数を1増やす
		if (count >= 10){	// 全ての旗を取った
			var t = (new Date()).getTime() - startTime;
			clearInterval(timerID);
			var txt = "ゲームクリア！タイム："+t+"msec"+"<br>";
			txt = txt + "<button ontouchstart='location.reload()'>リトライ</button>";
			msgEle.innerHTML = txt;
		} else {
		  nextQuiz();
		}
	}, true);
	document.getElementById("gameScreen").appendChild(ele);
}
setTimeout("window.scrollTo(0,1)", 10);	// ナビゲーションバーを消す
nextQuiz();
setTimeout(function(){
	document.addEventListener("touchstart", function(evt){
		evt.preventDefault();	// 全体がスクロールするのを禁止
	}, true);
}, 1500);

function nextQuiz() {
	var obj = document.getElementById("quiz");
	var msg = document.getElementById("quizMessage");
	obj.innerHTML = hira[count];
	msg.style.display = "inline";
	setTimeout('document.getElementById("quizMessage").style.display="none"', 2000);
}
