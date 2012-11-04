function HumanPlayer(startCommit, author, controls) {
	this.author = author;
	this.world = startCommit.world;
	this.at = startCommit;
	this.dir = Direction.random();

	this.controls = controls;

	this.at.author = this.author;
	this.at.isRoot = true;
	this.at.updateUsers();
	this.merged = false;
}

HumanPlayer.prototype.update = function() {
	var self = this;
	if(this.merged) return;

	var nextDir = this.dir;
	var askedDir = this.controls.direction();
	if(this.dir.isLeftOf(askedDir))
		nextDir = this.dir.right();
	else if(this.dir.isRightOf(askedDir))
		nextDir = this.dir.left();

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