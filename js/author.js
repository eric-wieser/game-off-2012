Author = Class.extend({
	init: function(name, color) {
		this.name = name;
		this.color = color;
		this.id = Author.nextId++;
	}
});
Author.nextId = 0;