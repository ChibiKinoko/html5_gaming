var stage,
    bullets = new Array();
var ship;
var bulletImg;

function main() {

    //The stage contains all of the display objects we will be painting to our canvas. 
    //You can either pass the ID of the canvas you want to use, or a reference to it. 
    stage = new createjs.Stage("demoCanvas");

    // BACKGROUND
    var bgImg = new Image();
    var bg2Img = new Image();

    bgImg.src = 'img/stars.png';
    bg2Img.src = 'img/stars.png';

    var bg = new createjs.Bitmap(bgImg);
    var bg2 = new createjs.Bitmap(bg2Img);

    var shipImg = new Image();
    shipImg.src = 'img/ship.png';
    ship = new createjs.Bitmap(shipImg);

    bulletImg = new Image();
    bulletImg.src = 'img/bullet.png';
    //bullets.push(new createjs.Bitmap(bulletImg));

    stage.addChild(bg, bg2, ship); //ajout des images

    bg2.y = 451;
    ship.x = 280;
    ship.y = 810;

    stage.update();

    document.addEventListener('keypress', function(e) {
        if (e.keyCode == 39) {
            if(ship.x < 580) {
                ship.x += 30;
            }
        } else if (e.keyCode == 37) {
            if (ship.x > 0) {
                ship.x -= 30;
            };
        }
        stage.update();
    });
    
    createjs.Ticker.addEventListener("tick", shoot);
    createjs.Ticker.addEventListener("tick", function () {
        stage.update();
    });
};

var lastShoot = 0;

function shoot() {
    if (Date.now() - lastShoot > 1000) {
        lastShoot = Date.now();
        bullets.push(new createjs.Bitmap(bulletImg));
        var bullet = bullets[bullets.length - 1]
        stage.addChild(bullet); //ajout des images
        bullet.x = ship.x, 10;
        bullet.y = ship.y + 5;
        //console.log(bullet.canvas.width);
    }
    //console.log(Date.now());
    bullets.forEach(function (bullet) {
        bullet.y -= 10;
    });
    

}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});
