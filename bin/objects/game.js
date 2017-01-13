class Game {
    constructor() {
        this.windowX = 640;
        this.windowY = 960;
        this.cameraX = 0;
        this.cameraY = 0;
        this.player = new Player();
        this.block = new Array();
        for (let i = 0; i < 8; i++)
            this.block.push(new Block(i * 80, 880));
        for (let i = 0; i < 11; i++) {
            this.block.push(new Block(0, i * 80));
            this.block.push(new Block(560, i * 80));
        }
    }
    update() {
        this.ref();
        this.hook();
        this.player.update();
        this.collision();
        this.player.move();
        this.ground();
    }
    hook() {
        let v = new Vec(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, (x + this.cameraX - this.player.x - this.player.width / 2) * 1000 + x + this.cameraX, (y + this.cameraY - this.player.y - this.player.height / 2) * 1000 + y + this.cameraY);
        let minR = v.r;
        let newV = new Vec(0, 0, 0, 0);
        for (let i = 0; i < this.block.length; i++) {
            for (let j = 0; j < this.block[i].vec.length; j++) {
                if (!this.block[i].vec[j].enable) {
                    continue;
                }
                if (isParallel(v, this.block[i].vec[j])) {
                    if (isIntersected(v, this.block[i].vec[j])) {
                        let vv = Intersection(v, this.block[i].vec[j]).copy();
                        if (vv.r < minR) {
                            minR = vv.r;
                            newV = vv.copy();
                        }a
                    }
                }
            }
        }
        if (minR < v.r) {
            this.player.tx = newV.x2;
            this.player.ty = newV.y2;
        }
    }
    collision() {
        let minR = 10000000;
        let id = -1;
        let v = new Vec(0, 0, 0, 0);
        for (let k = 0; k < 4; k++) {
            let vec = this.player.colVec[k];
            for (let i = 0; i < this.block.length; i++) {
                for (let j = 0; j < this.block[i].vec.length; j++) {
                    if (!this.block[i].vec[j].enable) {
                        continue;
                    }
                    if (isParallel(vec, this.block[i].vec[j])) {
                        if (isIntersected(vec, this.block[i].vec[j])) {
                            let newV = Intersection2(vec, this.block[i].vec[j]);
                            if (newV.r < minR) {
                                minR = newV.r;
                                id = k;
                                v = newV.copy();
                            }
                        }
                    }
                }
            }
        }
        if (id != -1) {
            for (let i = 0; i < 4; i++) {
                this.player.colVec[i].x2 = this.player.colVec[i].x1 + v.x2 - v.x1;
                this.player.colVec[i].y2 = this.player.colVec[i].y1 + v.y2 - v.y1;
            }
            this.player.moveVec.x2 = this.player.moveVec.x1 + v.x2 - v.x1;
            this.player.moveVec.y2 = this.player.moveVec.y1 + v.y2 - v.y1;
        }
        minR = 10000000;
        id = -1;
        v = new Vec(0, 0, 0, 0);
        for (let k = 0; k < 4; k++) {
            let vec = this.player.colVec[k];
            for (let i = 0; i < this.block.length; i++) {
                for (let j = 0; j < this.block[i].vec.length; j++) {
                    if (!this.block[i].vec[j].enable) {
                        continue;
                    }
                    if (isParallel(vec, this.block[i].vec[j])) {
                        if (isIntersected(vec, this.block[i].vec[j])) {
                            let newV = Intersection(vec, this.block[i].vec[j]);
                            if (newV.r < minR) {
                                minR = newV.r;
                                id = k;
                                v = newV.copy();
                            }
                        }
                    }
                }
            }
        }
        if (id != -1) {
            this.player.moveVec = v.copy();
        }
    }
    ground() {
        let b = false;
        let v = new Vec(this.player.x, this.player.y + this.player.height, this.player.x, this.player.y + this.player.height + 1);
        for (let i = 0; i < this.block.length; i++) {
            for (let j = 0; j < this.block[i].vec.length; j++) {
                if (isIntersected(v, this.block[i].vec[j])) {
                    if (this.block[i].vec[j].floor) {
                        b = true;
                    }
                }
            }
        }
        v = new Vec(this.player.x + this.player.width, this.player.y + this.player.height, this.player.x + this.player.width, this.player.y + this.player.height + 1);
        for (let i = 0; i < this.block.length; i++) {
            for (let j = 0; j < this.block[i].vec.length; j++) {
                if (isIntersected(v, this.block[i].vec[j])) {
                    if (this.block[i].vec[j].floor) {
                        b = true;
                    }
                }
            }
        }
        if (b) {
            this.player.isGround = true;
            this.player.vy = 0;
        }
    }
    ref() {
        for (let i = 0; i < this.block.length; i++) {
            for (let j = 0; j < this.block.length; j++) {
                if (this.block[i].x - this.block[j].x == 80 && this.block[i].y - this.block[j].y == 0) {
                    this.block[i].vec[1].enable = false;
                    this.block[j].vec[3].enable = false;
                }
                if (this.block[i].x - this.block[j].x == 0 && this.block[i].y - this.block[j].y == 80) {
                    this.block[i].vec[2].enable = false;
                    this.block[j].vec[0].enable = false;
                }
            }
        }
    }
    draw() {
        drawRect(0, 0, 640, 960, "#000000");
        this.player.draw(this.cameraX, this.cameraY);
        for (let i = 0; i < this.block.length; i++) {
            this.block[i].draw(this.cameraX, this.cameraY);
        }
    }
}

class Mouse {
    constructor() {
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
    }
    update() {
        this.x = x;
        this.y = y;
    }
    draw() {
        drawCip("CIP", 1, 1, this.x - this.width / 2, this.y - this.height / 2);
    }
}

class Player {
    constructor() {
        this.x = 320;
        this.y = 800;
        this.width = 79;
        this.height = 79;
        this.t = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 1;
        this.delta = 0.01;
        this.isGround = true;
        this.boost = 0;
        this.colVec = new Array();
        this.moveVec = new Vec(0, 0, 0, 0);
        this.mouse = new Mouse();
        this.isHook = false;
        this.hook = new Hook(this.x, this.y);
        this.tx = this.x;
        this.ty = this.y;
    }
    update() {
        this.mouse.update();
        this.t++;
        this.hook.x = this.x + this.width / 2;
        this.hook.y = this.y + this.height / 2;
        if (this.isGround) {
            this.ay = 0;
            if (pressKey.isDown(32)) {
                this.isGround = false;
                this.vy = -20;
            }
        } else {
            this.ay = 1;
        }
        if (pressKey.isDown(65)) {
            this.boost--;
            if (this.boost < -5) {
                this.boost = -5;
            }
        } else if (pressKey.isDown(68)) {
            this.boost++;
            if (this.boost > 5) {
                this.boost = 5;
            }
        } else {
            if (this.boost < 0) {
                this.boost++;
            } else if (this.boost > 0) {
                this.boost--;
            }
        }
        if (!this.isHook) {
            this.hook.tx = this.tx;
            this.hook.ty = this.ty;
			console.log(this.tx);
            if (left()) {
                this.isHook = true;
                this.hook.enable = true;

            }
        }
        this.vx = this.boost * 5;
        this.colVec[0] = new Vec(this.x, this.y, this.x + this.vx, this.y + this.vy);
        this.moveVec = this.colVec[0].copy();
        this.colVec[1] = new Vec(this.x + this.width, this.y, this.x + this.vx + this.width, this.y + this.vy);
        this.colVec[2] = new Vec(this.x, this.y + this.height, this.x + this.vx, this.y + this.vy + this.width);
        this.colVec[3] = new Vec(this.x + this.width, this.y + this.height, this.x + this.vx + this.width, this.y + this.vy + this.height);
    }
    move() {
        this.x += this.moveVec.x2 - this.moveVec.x1;
        this.y += this.moveVec.y2 - this.moveVec.y1;
        this.vx += this.ax - this.delta * this.vx;
        this.vy += this.ay - this.delta * this.vy;
    }
    draw(cameraX, cameraY) {
        this.mouse.draw();
        drawCip("CIP", Math.floor(this.t / 5) % 4, 0, this.x - cameraX, this.y - cameraY);
        drawLine(this.x, this.y, this.tx, this.ty, "#FFFFFF");
    }
}

class Hook {
    constructor(x, y) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x;
        this.y2 = y;
        this.tx = x;
        this.ty = y;
        this.v = 10;
        this.shoot = false;
        this.enable = false;
    }
    update() {
        if (this.shoot) {
            if ((this.x2 - this.tx) * (this.x2 - this.tx) + (this.y2 - this.ty) * (this.y2 - this.ty) < this.v * this.v) {
                this.x2 = this.tx;
                this.y2 = this.ty;
            } else {
                let r = Math.sqrt((this.x2 - this.tx) * (this.x2 - this.tx) + (this.y2 - this.ty) * (this.y2 - this.ty));
                this.x2 += (this.tx - this.x2) / r * this.v;
                this.y2 += (this.ty - this.y2) / r * this.v;
            }
        }
    }
    draw() {
        if (this.enable) {
            drawLine(this.x1, this.y1, this.x2, this.y2, "#FFFFFF");
        }
    }
}

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.t = 0;
        this.vec = new Array();
        this.vec.push(new Vec(this.x, this.y, this.x + this.width, this.y));
        this.vec.push(new Vec(this.x + this.width, this.y, this.x + this.width, this.y + this.height));
        this.vec.push(new Vec(this.x + this.width, this.y + this.height, this.x, this.y + this.height));
        this.vec.push(new Vec(this.x, this.y + this.height, this.x, this.y));
    }
    update() {
        this.t++;
    }
    draw(cameraX, cameraY) {
        drawCip("CIP", 0, 1, this.x - cameraX, this.y - cameraY);
        for (let i = 0; i < 4; i++) {
            this.vec[i].draw();
        }
    }
}

class Vec {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.r = Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));
        this.px = (this.x2 - this.x1) / this.r;
        this.py = (this.y2 - this.y1) / this.r;
        this.vx = this.py;
        this.vy = -this.px;
        this.floor = this.x2 > this.x1;
        this.enable = true;
    }
    draw() {
        if (!this.enable) {
            //    drawLine(this.x1, this.y1, this.x2, this.y2, "#FF0000");
        }
    }
    copy() {
        return new Vec(this.x1, this.y1, this.x2, this.y2);
    }
}
