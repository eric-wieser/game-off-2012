RandomPlayer = Author.extend({
	init: function(name, color, initialcommit) {
		this._super(name, color)
		this.branches = [new RandomBranch(this, initialcommit)];
	},
	update: function() {
		var newBranches = [];
		var canFork = this.branches.length < 4
		this.branches.forEach(function(b) {
			if(false && b.controls.fork) {
				console.log("forking!");
				var d = b.dir;
				b.dir = d.left();
				newBranches.push(new RandomBranch(this, b.at, d.right()))
			}
		}, this);
		this.branches = this.branches.filter(function(b) {
			return !b.merged;
		}).concat(newBranches);
		this.branches.forEach(function(b) {
			b.update();
		});
	}
})