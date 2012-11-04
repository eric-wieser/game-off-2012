Direction = function(x, y, name) {
	if(name === undefined) {
		return Direction.__cache[x+','+y];
	} else {
		Vector.call(this, x, y);
		this.name = name;
		Direction.__cache[x+','+y] = this;
	}
}
Direction.__cache = {};
Direction.prototype = new Vector();

Direction.n    = new Direction( 0, -1, "n");
Direction.ne   = new Direction( 1, -1, "ne");
Direction.e    = new Direction( 1,  0, "e");
Direction.se   = new Direction( 1,  1, "se");
Direction.s    = new Direction( 0,  1, "s");
Direction.sw   = new Direction(-1,  1, "sw");
Direction.w    = new Direction(-1,  0, "w");
Direction.nw   = new Direction(-1, -1, "nw");
Direction.none = new Direction(0, 0, "none");
Direction.prototype.right = function() {
	if(this == Direction.n ) return Direction.ne;
	if(this == Direction.ne) return Direction.e ;
	if(this == Direction.e ) return Direction.se;
	if(this == Direction.se) return Direction.s ;
	if(this == Direction.s ) return Direction.sw;
	if(this == Direction.sw) return Direction.w ;
	if(this == Direction.w ) return Direction.nw;
	if(this == Direction.nw) return Direction.n ;
	return direction.none;
}
Direction.prototype.left = function() {
	if(this == Direction.n ) return Direction.nw;
	if(this == Direction.ne) return Direction.n ;
	if(this == Direction.e ) return Direction.ne;
	if(this == Direction.se) return Direction.e ;
	if(this == Direction.s ) return Direction.se;
	if(this == Direction.sw) return Direction.s ;
	if(this == Direction.w ) return Direction.sw;
	if(this == Direction.nw) return Direction.w ;
	return direction.none;
}

Direction.prototype.isLeftOf = function(that) {
	var a = this.x * that.y - this.y * that.x;
	return a > 0; 
}
Direction.prototype.isRightOf = function(that) {
	var a = this.x * that.y - this.y * that.x;
	return a < 0; 
}


Direction.prototype.toString = function() {
	return this.name;
};

Direction.random = function() {
	var x = Math.random() * 8;
	if(x < 1)      return Direction.n ;
	else if(x < 2) return Direction.ne;
	else if(x < 3) return Direction.e ;
	else if(x < 4) return Direction.se;
	else if(x < 5) return Direction.s ;
	else if(x < 6) return Direction.sw;
	else if(x < 7) return Direction.w ;
	else           return Direction.nw;
}