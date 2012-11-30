function World(width, height) {
	this.width = width;
	this.height = height;
	this.commits = [];
	for(var x = 0; x <= width; x++) {
		for(var y = 0; y <= height; y++) {
			this.commits[x + y * (width + 1)] = new Commit(this, x, y);
		}
	}

	this.appliedDiffs = [];
	this.diffs = [];
}

World.prototype.SPACING = 40;
World.prototype.DIFF_WIDTH = 8;

World.prototype.drawDiff = function(ctx, from, to) {
	new Diff(this, from, to, from.author).drawTo(ctx, 1);
}
World.prototype.tick = function() {
	this.diffs.forEach(function(diff) {
		diff.apply();
		this.appliedDiffs.push(diff);
	}, this);
	this.diffs = [];
}
World.prototype.drawTo = function(ctx, progress) {
	var intWidth = this.SPACING * this.width;
	var intHeight = this.SPACING * this.height;

	var dx = Math.floor((ctx.canvas.width - intWidth) / 2);
	var dy = Math.floor((ctx.canvas.height - intHeight) / 2);

	var self = this;
	ctx.scoped(function() {
		ctx.fillStyle = "#404040";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.translate(dx, dy);
		ctx.scoped(function() {
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			ctx.fillRect(
				-self.DIFF_WIDTH, -self.DIFF_WIDTH,
				intWidth+2*self.DIFF_WIDTH, intHeight+2*self.DIFF_WIDTH
			);
		});
		ctx.scoped(function() {
			ctx.lineWidth = this.DIFF_WIDTH;
			ctx.lineCap = 'round';
			self.appliedDiffs.forEach(function(diff) {
				diff.drawTo(ctx, 1);
			});
			self.diffs.forEach(function(diff) {
				diff.drawTo(ctx, progress);
			});
		});
		ctx.scoped(function() {
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			self.commits.forEach(function(commit) {
				commit.clearTo(ctx);
			});
		});
		ctx.scoped(function() {
			self.commits.forEach(function(commit) {
				commit.drawTo(ctx);
			});
		});
	});
}

World.prototype.get = function(x, y) {
	if(x < 0 || x > this.width) return null;
	if(y < 0 || y > this.height) return null;
	return this.commits[x + y * (this.width + 1)];
}