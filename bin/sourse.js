const newImage = (key, src) => {
    let nImg = new Image();
    nImg.src = "bin/img/" + src;
    img[key] = nImg;
}

newImage("CIP", "mapcip.png");
