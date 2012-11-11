RandomBranch = Branch.extend({
	getNextDir: function() {
		var r = Math.random() * 3;
		var nextDir = this.dir;
		if(r < 1)      nextDir = this.dir.left();
		else if(r < 2) nextDir = this.dir.right();
		return nextDir
	}
});