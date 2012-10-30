function Ticker(f, t) {
	this.onTick = f;
	this.period = 1000 * t;
	this.id = null;
	this.lastTick = null;
}
Ticker.prototype.start = function() {
	var self = this;
	self.lastTick = Date.now();
	self.onTick();
	self.id = setInterval(function() {
		self.onTick();
		self.lastTick = Date.now();
	}, self.period)
};
Ticker.prototype.stop = function() {
	clearInterval(this.id);
	this.id = null;
	this.lastTick = null;
};
Ticker.prototype.progress = function() {
	return Math.min((Date.now() - this.lastTick) / this.period, 1);
};
