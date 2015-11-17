var stage;
var ship;
var bulletImg;
//var bullet;
var bullets = new Array();
var enemyImg;
var enemys = new Array();
//var enemy;
var lastShoot = 0;
var lastEnemyDisplay = 0;
var score = 0;
var scoreText;

var bulletEnemy;
var bulletsEnemy = new Array();

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

    // bullet = new createjs.Bitmap(bulletImg);

    //ENEMY
    enemyImg = new Image();
    enemyImg.src = 'img/enemy.png';

    enemy = new createjs.Bitmap(enemyImg);

    //BULLETS ENEMY
    bulletEnemyImg = new Image();
    bulletEnemyImg.src = 'img/bulletEnemy.png';

    //bulletEnemy = new createjs.Bitmap(bulletEnemyImg);


    //SCORE
    scoreText = new createjs.Text("score : " + score, "20px Verdana", "#FFFFFF");
    scoreText.x = 5;
    scoreText.y = 10;

    stage.addChild(bg, bg2, ship, scoreText, enemy); //ajout des images

    bg2.y = 451;
    ship.x = 280;
    ship.y = 810;

    stage.update();

    document.addEventListener('keypress', function(e) {
        if (e.keyCode == 39) {
            if(ship.x < 580) {
                ship.x += 10;
            }
        } else if (e.keyCode == 37) {
            if (ship.x > 0) {
                ship.x -= 10;
            };
        } 
        // else if (e.keyCode == 38) {
        //     shoot();
        // }
    });

    //createjs.Ticker.addEventListener("tick", shoot);
    createjs.Ticker.addEventListener("tick", displayEnemy);
    createjs.Ticker.addEventListener("tick", stage);
};

function scoreUpdate() {
    score += 100;
    stage.removeChild(scoreText);
    scoreText = new createjs.Text("score : " + score, "20px Verdana", "#FFFFFF");
    scoreText.x = 5;
    scoreText.y = 10;
    stage.addChild(scoreText);
}

function shoot() {
    if (Date.now() - lastShoot > 1000) {
        lastShoot = Date.now();

        bullet = new createjs.Bitmap(bulletImg);
        stage.addChild(bullet); //ajout des bullets
        bullet.x = ship.x + 12;
        bullet.y = ship.y;
        bullets.push(bullet);
    }

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].y -= 10;
        if (bullets[i].y == 10) {
            stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
        }
    };
}
function failed() {
    var textFail = new createjs.Text("Perdu !", "40px Verdana", "#FFFFFF");
    textFail.x = 170;
    textFail.y = 170;
    stage.addChild(textFail);
}

function displayEnemy() {
    shoot();
    var random = Math.floor(Math.random() * (550 + 1));

    if (Date.now() - lastEnemyDisplay > 3000) {
        lastEnemyDisplay = Date.now();

        var enemy = new createjs.Bitmap(enemyImg);
        enemys.push(enemy);

        stage.addChild(enemy); //ajout des bullets
        enemy.x = random;

        setInterval(function() {
            bulletEnemy = new createjs.Bitmap(bulletEnemyImg);
            bulletsEnemy.push(bulletEnemy);

            stage.addChild(bulletEnemy);
            bulletEnemy.x = enemy.x + 20;
            bulletEnemy.y = enemy.y + 50;
        }, 2000);
    }

    bulletsEnemy.forEach(function (bulletEnemy) {
        bulletEnemy.y += 20;
    });
    
    attackEnemy();
}

function attackEnemy() {
    for (var j = 0; j < enemys.length; j++) {

        enemys[j].y += 3;

        if (enemys[j].y >= 851) {
            //console.log('tto');
            stage.removeChild(enemys[j]);
            // enemys[j].splice(j, 1);
            failed();
        };

        for (var k = 0; k < bullets.length; k++) {
            if (typeof enemys[j] !== "undefined" && bullets[k].x >= enemys[j].x && bullets[k].x + 11 < enemys[j].x + 49 && bullets[k].y < enemys[j].y + 40) {
                //console.log('touche');
                scoreUpdate();
                stage.removeChild(enemys[j]);
                enemys.splice(j, 1);
                stage.removeChild(bullets[k]);
                bullets.splice(k, 1);
            };
        };
    };
}



document.addEventListener("DOMContentLoaded", function(event) {
    main();
});
