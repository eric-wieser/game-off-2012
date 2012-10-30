function IdSet() {
	this.lookup = {};
	this.size = 0;
}

IdSet.prototype.add = function(x) {
	if(!(x.id in this.lookup)) {
		this.lookup[x.id] = x;
		this.size++;
	}
	return this;
};
IdSet.prototype.addAll = function(s) {
	s.forEach(function(x) {
		this.add(x);
	}, this);
	return this;
};
IdSet.prototype.contains = function(x) {
	return x.id in this.lookup;
};
IdSet.prototype.remove = function(x) {
	if(this.contains(x)) {
		this.size--;
		delete this.lookup[x.id];
	}
	return this;
};
IdSet.prototype.forEach = function(f, thisPtr) {
	var i = 0;
	for(var id in this.lookup) f.call(thisPtr, this.lookup[id], i++, this);
	return this;
};