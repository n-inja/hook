(window.onresize = function() {
    let cv = document.querySelector("#can");
    let rect = document.body.getBoundingClientRect();
    let scaleW = rect.width / cv.width;
    let scaleH = rect.height / cv.height;
    scale = scaleW < scaleH ? scaleW : scaleH;
    cv.style.transform = "scale(" + scale + ", " + scale + ")";
    cv.style.position = "fixed";
    cv.style.left = ((scale - 1) * cv.width / 2 + (rect.width - cv.width * scale) / 2) + "px";
    cv.style.top = ((scale - 1) * cv.height / 2 + (rect.height - cv.height * scale) / 2) + "px";
})();

//初期化
window.onload = function() {
    screenCanvas = document.getElementById('can');
    screenCanvas.width = 640;
    screenCanvas.height = 960;
    ctx = screenCanvas.getContext('2d');
    game = new Game();

    screenCanvas.addEventListener('mousedown', (e) => {
        let ck = e.button;
        if (ck == 0) {
            pressMouse[0] = true;
        } else if (ck == 2) {
            pressMouse[1] = true;
        }
    }, true);
    screenCanvas.addEventListener('mouseup', (e) => {
        let ck = e.button;
        if (ck == 0) {
            pressMouse[0] = false;
            pressMouseLock[0] = false;
        } else if (ck == 2) {
            pressMouse[1] = false;
            pressMouseLock[1] = false;
        }
    }, true);
    screenCanvas.addEventListener("mousemove", (e) => {
        var rect = e.target.getBoundingClientRect();
        x = (e.clientX - rect.left)/scale;
        y = (e.clientY - rect.top)/scale;
    }, true);
};

const InputKey = function() {
    var key_input = null;
    var key_lock = null;

    function KeyDown(e) {
        key_input[e.keyCode] = true;
    }

    function KeyUp(e) {
        key_input[e.keyCode] = false;
        key_lock[e.keyCode] = false;
    }

    function reset(e) {
        //this.key_input.length = 0;
        //this.key_lock.length = 0;
    }
    this.isDownToggle = function(key_code) {
        if (key_input[key_code] && !key_lock[key_code]) {
            key_lock[key_code] = true;
            return true;
        }
        return false;
    };
    this.isDown = function(key_code) {
        if (key_input[key_code]) {
            key_lock[key_code] = true;
            return true;
        }
        return false;
    };
    this.release = function() {
        if (window.removeEventListener) {
            document.removeEventListener("keydown", KeyDown);
            document.removeEventListener("keyup", KeyUp);
        } else if (window.detachEvent) {
            document.detachEvent("onkeydown", KeyDown);
            document.detachEvent("onkeyup", KeyUp);
        }
    };
    (function() {
        key_input = new Array();
        key_lock = new Array();

        if (window.addEventListener) {
            document.addEventListener("keydown", KeyDown);
            document.addEventListener("keyup", KeyUp);
            //    window.addEventListener("blur", reset);
        } else if (window.attachEvent) {
            document.attachEvent("onkeydown", KeyDown);
            document.attachEvent("onkeyup", KeyUp);
            //      window.attachEvent("onblur", reset);
        }
    })();
}
pressKey = new InputKey();

function right() {
    if (pressMouse[1] && !pressMouseLock[1]) {
        pressMouseLock[1] = true;
        return true;
    } else {
        return false;
    }
}

function left() {
    if (pressMouse[0] && !pressMouseLock[0]) {
        pressMouseLock[0] = true;
        return true;
    } else {
        return false;
    }
}

//メイン関数
const main = function() {
    if (this.t === undefined) {
        this.t = 0;
    }
    game.update();
    game.draw();
    this.t++;
};
setInterval(main, 1000 / 60);
