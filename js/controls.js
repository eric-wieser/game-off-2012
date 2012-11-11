Controls = Class.extend({
	init: function(keymap) {
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
	}
})

Controls.instances = [];
Controls.wasd = new Controls({
	up:    87,
	down:  83,
	left:  65,
	right: 68
});
Controls.arrows = new Controls({
	up:    38,
	down:  40,
	left:  37,
	right: 39
});
Controls.numpad = new Controls({
	up:    104,
	down:  101,
	left:  100,
	right: 102
});
Controls.hjkl = new Controls({
	up:    74,
	down:  75,
	left:  72,
	right: 76
});

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