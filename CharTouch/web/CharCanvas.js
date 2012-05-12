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
    
    return this;
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
    if (g_test) {
        return;
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
    if (g_test) {
        return;
    }
    
    if (this.sub_canvas.parentNode) {
        this.sub_canvas.parentNode.removeChild(this.sub_canvas);
    }
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
    if (g_test) {
        ctx.fillStyle="rgba(0,0,255,0.5)";
        ctx.fillRect(x*this.font_size/99, y*this.font_size/99, w*this.font_size/99, h*this.font_size/99);
    } else {
        ctx.clearRect(x*this.font_size/99, y*this.font_size/99, w*this.font_size/99, h*this.font_size/99);
    }
}

function charCanvas_clipRect(ctx, rect_str)
{
	var part = rect_str.charAt(0);
	var x = parseInt(rect_str.substr(1,2), 10);
	var y = parseInt(rect_str.substr(3,2), 10);
	var w = parseInt(rect_str.substr(5,2), 10);
	var h = parseInt(rect_str.substr(7,2), 10);
	ctx.rect(x*this.font_size/99, y*this.font_size/99, w*this.font_size/99, h*this.font_size/99);
}

function charCanvas_start(x, y) {
    console.log("x="+x+" y="+y);
    this.separate();
    
    this.sub_canvas.style.left = x + "px";
    this.sub_canvas.style.top = y + "px";
    this.sub_canvas.className = 'dropIn';
    
    this.canvas.style.left = x + "px";
    this.canvas.style.top = y + "px";
    this.canvas.className = 'zoomIn';
    
    document.getElementById("gameScreen").appendChild(this.sub_canvas);
    document.getElementById("gameScreen").appendChild(this.canvas);
}
