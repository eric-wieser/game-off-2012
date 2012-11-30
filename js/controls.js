Controls = Class.extend({
	init: function(name, keymap) {
		this.name = name;
		this.keymap = keymap;
		this.nameFor = {}
		for(var key in keymap) {
			this[key] = false;
			this.nameFor[keymap[key]] = key;
		}
		Controls.instances.push(this)
	},
	keyUp: function(k) {
		var name = this.nameFor[k];
		if(name) this[name] = false;
	},
	keyDown: function(k) {
		var name = this.nameFor[k];
		if(name) this[name] = true;
	},
	direction: function() {
		var x = 0, y = 0;
		if(this.up) y--;
		if(this.down) y++;
		if(this.left) x--;
		if(this.right) x++;
		return new Direction(x, y);
	},
	toString: function() {
		return "Controls#"+Controls.instances.indexOf(this);
	}
})

Controls.instances = [];
Controls.wasd = new Controls("wasd", {
	up:    87,
	down:  83,
	left:  65,
	right: 68,
	fork:  69
});
Controls.numpad = new Controls("numpad", {
	up:    104,
	down:  101,
	left:  100,
	right: 102,
	fork:  103
});
Controls.ijkl = new Controls("ijkl", {
	up:    73,
	down:  75,
	left:  74,
	right: 76,
	fork: 79
});
Controls.arrows = new Controls("arrows", {
	up:    38,
	down:  40,
	left:  37,
	right: 39
});

/*
Controls.hjkl = new Controls({
	up:    74,
	down:  75,
	left:  72,
	right: 76
});*/

Controls.keyUpHandler = function(e) {
	var key = e.which;
	Controls.instances.forEach(function(i) {
		i.keyUp(key);
	});
}
Controls.keyDownHandler = function(e) {
	var key = e.which;
	Controls.instances.forEach(function(i) {
		i.keyDown(key);
	});
}