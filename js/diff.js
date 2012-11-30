function Diff(world, from, to, branch) {
	this.world = world;
	this.from = from;
	this.to = to;
	this.branch = branch;
}

Diff.prototype.apply = function() {
	if(this.to.author == null) {
		this.to.author = this.branch.author;
		this.to.users.add(this.branch.author);
	} else {
		this.onMerged();
	}
	this.to.parents.push(this.from);
	this.to.updateUsers();
};
Diff.prototype.onMerged = function() {};
Diff.prototype.drawTo = function(ctx, progress) {
	var self = this;
	var to = self.to;
	var from = self.from;
	var toPoint = new Vector(to.x, to.y);
	var unit = toPoint.minus(from).normalize().perp();

	var toPoint = new Vector(from.x, from.y).lerp(to, progress);

	//clear surroundings
	ctx.scoped(function() {
		ctx.globalCompositeOperation = "destination-out";
		ctx.strokeStyle = "rgba(0, 0, 0, 1)";
		ctx.lineCap = 'butt';
		ctx.lineWidth = self.world.DIFF_WIDTH + 4;
		ctx.beginPath();
		ctx.moveTo(from.x    * self.world.SPACING, from.y    * self.world.SPACING);
		ctx.lineTo(toPoint.x * self.world.SPACING, toPoint.y * self.world.SPACING);
		ctx.stroke();
	});


	if(progress == 1) {
		var spacing = self.world.DIFF_WIDTH / from.users.size;
		var offset = -spacing * (from.users.size - 1) / 2;
		// draw colored parts
		ctx.lineWidth = spacing;
		from.users.forEach(function(author, i) {
			var off = unit.times(offset + spacing * i)
			ctx.strokeStyle = ""+author.color;
			ctx.beginPath();
			ctx.moveTo(from.x    * self.world.SPACING + off.x, from.y    * self.world.SPACING + off.y);
			ctx.lineTo(toPoint.x * self.world.SPACING + off.x, toPoint.y * self.world.SPACING + off.y);
			ctx.stroke();
		});
	} else {
		ctx.strokeStyle = ""+this.branch.author.color;
		ctx.lineWidth = self.world.DIFF_WIDTH;
		ctx.beginPath();
		ctx.moveTo(from.x    * self.world.SPACING, from.y    * self.world.SPACING);
		ctx.lineTo(toPoint.x * self.world.SPACING, toPoint.y * self.world.SPACING);
		ctx.stroke();

		if(self.branch instanceof KeyboardBranch) {
			ctx.fillStyle = "white";
			ctx.fillText(self.branch.controls.name, toPoint.x * self.world.SPACING, toPoint.y * self.world.SPACING)
		}
	}

}
