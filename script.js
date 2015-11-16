var stage;
var ship;
var bulletImg;
var bullets = new Array();
var enemyImg;
var enemys = new Array();
var enemy;
var lastShoot = 0;
var lastEnemyDisplay = 0;
var score = 0;

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

    //SHIP
    var shipImg = new Image();
    shipImg.src = 'img/ship.png';
    ship = new createjs.Bitmap(shipImg);

    //BULLETS
    bulletImg = new Image();
    bulletImg.src = 'img/bullet.png';

    //ENEMY
    enemyImg = new Image();
    enemyImg.src = 'img/enemy.png';
    enemy = new createjs.Bitmap(enemyImg);

    //SCORE
    var scoreText = new createjs.Text("score : " + score, "20px Verdana", "#FFFFFF");
    scoreText.x = 5;
    scoreText.y = 10;
    // scoreText.textBaseline = "alphabetic";

    stage.addChild(bg, bg2, ship, scoreText, enemy); //ajout des images

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
    
    createjs.Ticker.addEventListener("tick", displayEnemy);
    createjs.Ticker.addEventListener("tick", shoot);
    createjs.Ticker.addEventListener("tick", function () {
        stage.update();
    });
};


function shoot() {
    if (Date.now() - lastShoot > 500) {
        lastShoot = Date.now();
        //console.log(lastShoot);

        bullets.push(new createjs.Bitmap(bulletImg));
        var bullet = bullets[bullets.length - 1]

        stage.addChild(bullet); //ajout des bullets
        bullet.x = ship.x + 12;
        bullet.y = ship.y;

        //console.log(bullet.canvas.width);
    }
    //console.log(Date.now());
    bullets.forEach(function (bullet) {
        bullet.y -= 10;
    });
}


function displayEnemy() {
    /*var random = Math.floor(Math.random() * (580 + 1));

    if (Date.now() - lastEnemyDisplay > 2000) {
        lastEnemyDisplay = Date.now();
        console.log(lastEnemyDisplay);

        enemys.push(new createjs.Bitmap(enemyImg));
        var enemy = enemys[enemys.length - 1]

        stage.addChild(enemy); //ajout des bullets
        enemy.x = random;
    }

    enemys.forEach(function (enemy) {
        enemy.y += 3;
        touch(enemy);
    });*/

    enemy.y += 3;
    touch(enemy);
}

function touch(enemy) {
    bullets.forEach(function (bullet) {
        if (bullet.x == enemy.x || bullet.x == enemy.x + 1 || bullet.x == enemy.x - 1) {
            console.log('touche');
        };
        console.log("bullet : " + bullet.x);
        //console.log("enemy : " + enemy.x);
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});
