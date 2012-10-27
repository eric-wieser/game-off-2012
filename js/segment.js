function Segment(a, b, colorid, dir) {
	this.a = a;
	this.b = b;
	this.colorid = colorid;
	this.color = Color.niceColor(colorid).toString();
	this.dir = dir;
	this.active = true;
}
Segment.prototype.fork = function() {
	this.active = false;
	return [
		new Segment(this.b, this.b.clone(), (this.colorid + 0.95) % 1, this.dir.left()),
		new Segment(this.b, this.b.clone(), (this.colorid + 0.05) % 1, this.dir.right())
	]
}
Segment.prototype.length = function() {
	return this.a.minus(this.b).magnitude();
};
Segment.prototype.drawTo = function(ctx) {
	ctx.save();
	ctx.lineWidth = 8;
	ctx.strokeStyle = this.color;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(this.a.x, this.a.y);
	ctx.lineTo(this.b.x, this.b.y);
	ctx.stroke();
	ctx.restore();
};

Segment.prototype.update = function() {
	if(this.active) this.b.plusEquals(this.dir);
}