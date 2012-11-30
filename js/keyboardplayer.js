KeyboardPlayer = Author.extend({
	init: function(name, color, initialcommit) {
		this._super(name, color)
		this.branches = [new KeyboardBranch(this, initialcommit, Controls.wasd)];
	},
	getNextControls: function() {
		var controls;
		return Controls.instances.some(function(c) {
			controls = c;
			return this.branches.every(function(b) {
				return b.controls != c;
			});
		}, this) ? controls : null;
	},
	update: function() {
		var newBranches = [];
		var canFork = this.branches.length < 4
		this.branches.forEach(function(b) {
			if(b.controls.fork) {
				var c = this.getNextControls();
				if(!c) return;
				console.log("forking!");
				var d = b.dir;
				b.dir = d.left();
				newBranches.push(new KeyboardBranch(this, b.at, d.right(), c))
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