//描画関数
const drawRect = (x, y, width, height, color) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}

const drawStrokeRect = (x, y, width, height, color) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
}

const drawLine = (x1, y1, x2, y2, color) => {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

const drawTriangle = (x1, y1, x2, y2, x3, y3, color) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
}

const drawPoint = (x, y, color) => {
    drawRect(x, y, 1, 1, color);
    return;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.arc(x, y, 1, 0, Math.PI * 2, false);
    ctx.fill();
}

const drawCircle = (x, y, r, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.stroke();
}

const drawImage = (key, sx, sy, sw, sh, dx, dy, dw, dh) => {
    ctx.msImageSmoothingEnabled = true;
    ctx.drawImage(img[key], sx, sy, sw, sh, dx, dy, dw, dh);
}

const drawCip = (key, cx, cy, x, y) => {
    ctx.msImageSmoothingEnabled = true;
    drawImage(key, 80 * cx, 80 * cy, 80, 80, x, y, 80, 80);
}
