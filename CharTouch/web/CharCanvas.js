//  CharCanvas.js
//      Create small (32x32) canvases for Kanji
//      Sub canvas has 'bushu' part of Kanji
//      Main canvas has rest part of Kanji and handle touch event.
//

// Constructor
function CharCanvas(in_index, in_str, in_font_size) {
    this.str = in_str;
    this.font_size = in_font_size;
    this.index = in_index;
        
    // public methods
    this.init = charCanvas_init;
    this.start = charCanvas_start;
    this.separate = charCanvas_separate;
    this.merge = charCanvas_merge;
    
    // prifate_methods
    this.blackOut = charCanvas_blackOut;
    this.clipRect = charCanvas_clipRect;
    
    this.test = charCanvas_test;
    
    return this;
}
function charCanvas_test() {
    console.log("test");
}

function charCanvas_init() {
    var fx = document.getElementById("f" + this.index);
    if (fx) {
        fx.parentNode.removeChild(fx);
    }
    var px = document.getElementById("p" + this.index);
    if (px) {
        px.parentNode.removeChild(px);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.id = "f" + this.index;
    this.canvas.height = this.font_size;
	this.canvas.width = this.font_size;
	this.canvas.style = "background-color:rgba(250,0,0,0.5)";
    
    this.sub_canvas = document.createElement('canvas');
    this.sub_canvas.id = "p" + this.index;    
    this.sub_canvas.height = this.font_size;
	this.sub_canvas.width = this.font_size;
	this.sub_canvas.style = "background-color:rgba(0,250,0,0.5)";
}

function charCanvas_separate() {
    console.log("charCanvas_separate");
    // main part
    var parts = this.str.split("_");
    
    var ctx = this.canvas.getContext("2d");
	ctx.fillStyle = "#FFFF00";
	ctx.font = "32px Helvetica";
	ctx.textBaseline="top";
	ctx.fillText(parts[0], 0, 0);
    
	var i = 1;
	while(parts[i]) {
		this.blackOut(ctx, parts[i]);
		i++;
	}
    
    // bushu part
    var i = 1;
    var ctx = this.sub_canvas.getContext("2d");
	while(parts[i]) {
		this.clipRect(ctx, parts[i]);
		i++;
	}
	ctx.clip();
    
	ctx.fillStyle = "#FFFF00";
	ctx.font = "32px Helvetica";
	ctx.textBaseline="top";
	ctx.fillText(parts[0], 0, 0);
}

function charCanvas_merge() {
    console.log("charCanvas_merge");

    this.sub_canvas.parentNode.removeChild(this.sub_canvas);

    var parts = this.str.split("_");
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.font_size, this.font_size);
    ctx.fillStyle = "#FFFF00";
    ctx.font = "32px Helvetica";
    ctx.textBaseline="top";
    ctx.fillText(parts[0], 0, 0);
}

function charCanvas_blackOut(ctx, rect_str)
{
	var part = rect_str.charAt(0);
	var x = parseInt(rect_str.substr(1,2), 10);
	var y = parseInt(rect_str.substr(3,2), 10);
	var w = parseInt(rect_str.substr(5,2), 10);
	var h = parseInt(rect_str.substr(7,2), 10);
	ctx.fillStyle="rgba(0,0,0,1.0)";
	ctx.clearRect(x*this.font_size/100, y*this.font_size/100, w*this.font_size/100, h*this.font_size/100);
}

function charCanvas_clipRect(ctx, rect_str)
{
	var part = rect_str.charAt(0);
	var x = parseInt(rect_str.substr(1,2), 10);
	var y = parseInt(rect_str.substr(3,2), 10);
	var w = parseInt(rect_str.substr(5,2), 10);
	var h = parseInt(rect_str.substr(7,2), 10);
	ctx.rect(x*this.font_size/100, y*this.font_size/100, w*this.font_size/100, h*this.font_size/100);
}

function charCanvas_start(x, y) {
    this.separate();
    
    this.sub_canvas.style.left = x + "px";
    this.sub_canvas.style.top = y + "px";
    this.sub_canvas.className = 'dropin3sec';
    
    this.canvas.style.left = x + "px";
    this.canvas.style.top = y + "px";
    this.canvas.className = 'slidein1sec';
    
    document.getElementById("gameScreen").appendChild(this.sub_canvas);
    document.getElementById("gameScreen").appendChild(this.canvas);
}


