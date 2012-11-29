KeyboardPlayer = Author.extend({
	init: function(name, color, initialcommit) {
		this._super(name, color)
		this.branches = [new KeyboardBranch(this, initialcommit, Controls.wasd)];
	},
	update: function() {
		var newBranches = [];
		var canFork = this.branches.length < 4
		this.branches.forEach(function(b) {
			if(b.controls.fork) {
				console.log("forking!");
				var d = b.dir;
				b.dir = d.left();
				newBranches.push(new KeyboardBranch(this, b.at, d.right(), Controls.ijkl))
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