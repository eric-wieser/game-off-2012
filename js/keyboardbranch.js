KeyboardBranch = Branch.extend({
	init: function() {
		console.log(arguments);
		this.controls = [].pop.call(arguments);
		console.log(arguments);
		this._super.apply(this, arguments);
	},
	getNextDir: function() {
		var nextDir = this.dir;
		var askedDir = this.controls.direction();
		if(this.dir.isLeftOf(askedDir))
			nextDir = this.dir.right();
		else if(this.dir.isRightOf(askedDir))
			nextDir = this.dir.left();
		return nextDir;
	}
});
