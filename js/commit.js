function Commit(world, x, y) {
	this.world = world;
	this.x = x;
	this.y = y;
	this.author = null;
	this.parents = [];
	this.users = new IdSet();
	this.isRoot = false;
}

Commit.prototype.mergeInto = function(main) {
	if(main.author == null) {
		main.author = this.author;
	}
	main.parents.push(this);
	main.updateUsers();
}
Commit.prototype.updateUsers = function() {
	this.parents.forEach(function(parent) {
		var added = false;
		this.users.forEach(function(user) {
			if(parent.users.add(user))
				added = true;
		});
		if(parent.users.add(this.author))
			added = true;
		if(added)
			parent.updateUsers();
	}, this);
}
Commit.prototype.drawTo = function(ctx) {
	if(this.parents.length > 0 || this.isRoot) {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.circle(this.x * this.world.SPACING, this.y * this.world.SPACING, 4);
		ctx.fill();
	} /*else {
		ctx.fillStyle = "gray";
	}*/
}