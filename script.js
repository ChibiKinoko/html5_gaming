var stage;
var ship;
var bulletImg;
var bullet;
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

    bullet = new createjs.Bitmap(bulletImg);

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
    // enemy.x = 150;
    // enemy.y = 160;
    enemy.x = 350;
    enemy.y = 260;

    stage.update();

    document.addEventListener('keypress', function(e) {
        if (e.keyCode == 39) {
            if(ship.x < 580) {
                ship.x += 20;
            }
        } else if (e.keyCode == 37) {
            if (ship.x > 0) {
                ship.x -= 20;
            };
        } else if (e.keyCode == 38) {
            shoot();
        }
        stage.update();
    });
    
    createjs.Ticker.addEventListener("tick", displayEnemy);
    //createjs.Ticker.addEventListener("tick", shoot);
    createjs.Ticker.addEventListener("tick", stage);
};


// function shoot() {
//     if (Date.now() - lastShoot > 500) {
//         lastShoot = Date.now();
//         //console.log(lastShoot);
//         
//         bullet = new createjs.Bitmap(bulletImg);
//         bullet.x = ship.x + 12;
//         bullet.y = ship.y;
//         stage.addChild(bullet); //ajout des bullets
//         bullets.push(bullet);

//         //console.log(bullet.canvas.width);
//     }
//     //console.log(Date.now());
//     for (var i = 0; i < bullets.length; i++) {
//             bullets[i].y -= 10;
//             if (bullets[i].y == 10) {
//                 stage.removeChild(bullets[i]);
//                 bullets.splice(i, 1);
//             }
//     };
// }

function shoot() {
    stage.addChild(bullet);
    bullet.x = ship.x + 12;
    bullet.y = ship.y;
    setInterval(function() {
        bullet.y -= 20;
        if (bullet.y == 10) {
            stage.removeChild(bullet);
        };
        
    }, 150);
}


function displayEnemy() {
    // var random = Math.floor(Math.random() * (580 + 1));

    // if (Date.now() - lastEnemyDisplay > 4000) {
    //     lastEnemyDisplay = Date.now();
    //     //console.log(lastEnemyDisplay);

    //     enemys.push(new createjs.Bitmap(enemyImg));
    //     var enemy = enemys[enemys.length - 1]

    //     stage.addChild(enemy); //ajout des bullets
    //     enemy.x = random;
    // }

    // enemys.forEach(function (enemy) {
    //     enemy.y += 3;
    //     touch(enemy);
    // });

    //enemy.y += 2;
    touch(enemy);
}

function touch(enemy) {

    bullets.forEach(function (bullet) {

        var minX = enemy.x - 10;
        var maxX = enemy.x + 45;

        if (bullet.x >= minX && bullet.x <= maxX) {

            var minY = enemy.y + 10;
            var maxY = enemy.y + 20;

            if (bullet.y >= minY && bullet.y <= maxY) {
                console.log('touche');
                stage.removeChild(enemy);
                enemys.splice(enemy, 1);
                stage.removeChild(bullet);
                bullets.splice(bullet, 1);
            };
        };
        
        //console.log("bullet : " + bullet.x);
        //console.log("enemy : " + enemy.y);
        // console.log('min : '+minX);
        //console.log('max : '+maxX);
    });

    var minX = enemy.x - 10;
    var maxX = enemy.x + 45;

    if (bullet.x >= minX && bullet.x <= maxX) {

        var minY = enemy.y + 10;
        var maxY = enemy.y + 20;

        if (bullet.y >= minY && bullet.y <= maxY) {
            console.log('touche');
            stage.removeChild(enemy);
            enemys.splice(enemy, 1);
            stage.removeChild(bullet);
        };
    };

    // console.log("bullet : " + bullet.x);
    // console.log("enemy : " + enemy.x);
    // console.log('min : '+minX);
    // console.log('max : '+maxX);
}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});
