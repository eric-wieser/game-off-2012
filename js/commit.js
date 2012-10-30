function Commit(world, x, y) {
	this.world = world;
	this.x = x;
	this.y = y;
	this.author = null;
	this.parents = [];
	this.users = new IdSet();
}

Commit.prototype.mergeInto = function(main) {
	if(main.author == null) {
		main.author = this.author;
	}
	main.parents.push(this);
	main.updateUsers();
}
Commit.prototype.updateUsers = function() {
	this.users.add(this.author);
	this.parents.forEach(function(parent) {
		parent.users.addAll(this.users);
		parent.updateUsers();
	}, this);
}
Commit.prototype.drawTo = function(ctx) {
	ctx.beginPath();
	ctx.circle(this.x * this.world.SPACING, this.y * this.world.SPACING, 4);
	if(this.parents.length > 0) {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = "gray";
	}
	ctx.fill();
}