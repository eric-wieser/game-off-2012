Direction = function(x, y, name) {
	Vector.call(this, x, y);
	this.name = name;
}
Direction.prototype = new Vector();

Direction.n  = new Direction( 0, -1, "n");
Direction.ne = new Direction( 1, -1, "ne");
Direction.e  = new Direction( 1,  0, "e");
Direction.se = new Direction( 1,  1, "se");
Direction.s  = new Direction( 0,  1, "s");
Direction.sw = new Direction(-1,  1, "sw");
Direction.w  = new Direction(-1,  0, "w");
Direction.nw = new Direction(-1, -1, "nw");

Direction.prototype.right = function() {
	if(this == Direction.n ) return Direction.ne;
	if(this == Direction.ne) return Direction.e ;
	if(this == Direction.e ) return Direction.se;
	if(this == Direction.se) return Direction.s ;
	if(this == Direction.s ) return Direction.sw;
	if(this == Direction.sw) return Direction.w ;
	if(this == Direction.w ) return Direction.nw;
	if(this == Direction.nw) return Direction.n ;
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
}

Direction.prototype.toString = function() {
	return this.name;
};