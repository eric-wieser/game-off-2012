function RandomPlayer(startCommit, author) {
	this.author = author;
	this.world = startCommit.world;
	this.at = startCommit;
	this.dir = Direction.random();

	this.at.author = this.author;
	this.at.isRoot = true;
	this.at.updateUsers();
	this.merged = false;
}

RandomPlayer.prototype.update = function() {
	var self = this;
	if(this.merged) return;
	var r = Math.random() * 3;
	var nextDir = this.dir;
	if(r < 1)      nextDir = this.dir.left();
	else if(r < 2) nextDir = this.dir.right();

	var nextCommit = world.get(
		this.at.x + nextDir.x,
		this.at.y + nextDir.y
	)
	if(nextCommit) {
		var d = new Diff(world, this.at, nextCommit, this.author);
		d.onMerged = function() { self.merged = true; }
		this.world.diffs.push(d)
		this.dir = nextDir;
		this.at = nextCommit;
	}
}