Array.prototype.contains = function(value) {
	for (var i = 0; i < this.length; i++)
		if(this[i] == value)
			return true;
	return false;	
}

CanvasRenderingContext2D.prototype.scoped = function(f) {
	this.save();
	f.call(this);
	this.restore();
};
CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
	ctx.arc(x, y, r, 0, Math.PI * 2, false);
}
window.requestAnimationFrame =
	window.requestAnimationFrame       ||
	window.mozRequestAnimationFrame    ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame     ||
	window.oRequestAnimationFrame      ||
	function(callback) {
		window.setTimeout(function() {callback(Date.now())}, 1000 / 60.0);
	};
