class Effect {
    constructor(x, y, width, height) {
        this.id = 0;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.width = width;
        this.height = height;
        this.t = 0;
        this.img = "EFFECT";
        this.effectiveness = true;
    }
    update() {
        if (!this.effectiveness) {
            return;
        }
        this.t++;
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        if (!this.effectiveness) {
            return;
        }
    }
}

class Smoke extends Effect {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.id = 0;
    }
    update() {
        super.update();
        if (this.t > 24) {
            this.effectiveness = false;
        }
    }
    draw() {
        if (!this.effectiveness) {
            return;
        }
        drawCip32(this.img, Math.floor(this.t / 5) % 5, 0, this.x, this.y);
    }
}

class Brightness extends Effect {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.id = 1;
        this.vy = 0.2;
        this.vx = Math.random() * 0.2 - 0.1;
        this.color = rnd(8);
    }
    update() {
        super.update();
        if (this.t > 100) {
            this.effectiveness = false;
        }
    }
    draw() {
        if (!this.effectiveness) {
            return;
        }
        drawCip32(this.img, Math.floor(this.t / 4) % 4 + 4 * (this.color % 2), 1 + Math.floor(this.color / 2), this.x, this.y);
    }
}

class Spark extends Effect {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.id = 2;
        this.color = rnd(4);
        let hoge = Math.random()*Math.PI*2;
		let vel = Math.random();
		this.vx = Math.cos(hoge)*vel;
		this.vy = Math.sin(hoge)*vel;
    }
    update() {
        super.update();
        if (this.t > 20) {
            this.effectiveness = false;
        }
    }
    draw() {
        if (!this.effectiveness) {
            return;
        }
        drawCip32(this.img, Math.floor(this.t / 3) % 4 + (this.color % 2) * 4, 5 + Math.floor(this.color / 2), this.x - this.width/2, this.y - this.height/2);
    }
}
