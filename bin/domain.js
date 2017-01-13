const DEBUG = false;

let ctx;
let img = {};
let pressKey = null;
let pressKeyLock = null;
let pressMouse = new Array(2);
let pressMouseLock = new Array(2);
let x = 0,
    y = 0;
let scale;

const isParallel = (vec1, vec2) => {
    return (vec1.px * vec2.vx + vec1.py * vec2.vy) < 0;
}

const isIntersected = (vec1, vec2) => {
    let a = (vec2.x1 - vec2.x2) * (vec1.y1 - vec2.y1) + (vec2.y1 - vec2.y2) * (vec2.x1 - vec1.x1);
    let b = (vec2.x1 - vec2.x2) * (vec1.y2 - vec2.y1) + (vec2.y1 - vec2.y2) * (vec2.x1 - vec1.x2);
    let c = (vec1.x1 - vec1.x2) * (vec2.y1 - vec1.y1) + (vec1.y1 - vec1.y2) * (vec1.x1 - vec2.x1);
    let d = (vec1.x1 - vec1.x2) * (vec2.y2 - vec1.y1) + (vec1.y1 - vec1.y2) * (vec1.x1 - vec2.x2);
    return c * d <= 0 && a * b <= 0;
}

const Intersection = (vec1, vec2) => {
    let ans = vec1.copy();
    let s1 = (vec2.x2 - vec2.x1) * (vec1.y1 - vec2.y1) - (vec2.y2 - vec2.y1) * (vec1.x1 - vec2.x1);
    let s2 = (vec2.x2 - vec2.x1) * (vec2.y1 - vec1.y2) - (vec2.y2 - vec2.y1) * (vec2.x1 - vec1.x2);
    ans.x2 = vec1.x1 + (vec1.x2 - vec1.x1) * s1 / (s1 + s2) + vec2.vx;
    ans.y2 = vec1.y1 + (vec1.y2 - vec1.y1) * s1 / (s1 + s2) + vec2.vy;
    return ans;
}

const Intersection2 = (vec1, vec2) => {
    let ans = Intersection(vec1, vec2);
    ans.x2 += (vec1.x2 - ans.x2) * Math.abs(vec2.px);
    ans.y2 += (vec1.y2 - ans.y2) * Math.abs(vec2.py);
    return ans;
}

const rnd = (n) => {
    return Math.floor(Math.random() * n);
};

const createRecVec = function(x, y, width, height) {
    var ans = new Array();
    ans.push(new Vec(x, y, x + width - 1, y));
    ans.push(new Vec(x + width - 1, y, x + width - 1, y + height - 1));
    ans.push(new Vec(x + width - 1, y + height - 1, x, y + height - 1));
    ans.push(new Vec(x, y + height - 1, x, y));
    ans[0].setup();
    ans[1].setup();
    ans[2].setup();
    ans[3].setup();
    return ans;
};
