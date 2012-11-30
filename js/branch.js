Branch = Class.extend({
	init: function(author, startCommit, direction) {
		this.author = author;
		this.world = startCommit.world;
		this.at = startCommit;
		this.dir = direction || Direction.random();

		this.at.author = this.author;
		this.at.isRoot = true;
		this.at.updateUsers();
		this.merged = false;
	},
	getNextDir: function() {
		return this.dir;
	},
	update: function() {
		var self = this;
		if(this.merged) return;
		var r = Math.random() * 3;
		var nextDir = this.getNextDir();

		var nextCommit = world.get(
			this.at.x + nextDir.x,
			this.at.y + nextDir.y
		)
		if(nextCommit) {
			var d = new Diff(world, this.at, nextCommit, this);
			d.onMerged = function() { self.merged = true; }
			this.world.diffs.push(d)
			this.dir = nextDir;
			this.at = nextCommit;
		} else {
			this.merged = true;
		}
	},
	drawTo: function(ctx) {}
})