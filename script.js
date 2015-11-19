var stage;
var ship;

var bulletImg;
var bullets = new Array();

var enemyImg;
var enemys = new Array();

var lastShoot = 0;
var lastEnemyDisplay = 0;

var score = 0;
var scoreText;
var finalScore;
var textFail;

var bulletEnemy;
var bulletsEnemy = new Array();

var lifeScore = 3;
var lifeArray = new Array();

var bg;
var bg2;
var play;
var myVar;

var level = 0;
var levelVitesse = 3000;
var textLevel;

document.addEventListener("DOMContentLoaded", function(event) {

    //The stage contains all of the display objects we will be painting to our canvas. 
    //You can either pass the ID of the canvas you want to use, or a reference to it. 
    stage = new createjs.Stage("demoCanvas");

    // BACKGROUND
    var bgImg = new Image();
    var bg2Img = new Image();
    var playImg = new Image();

    bgImg.src = 'img/stars.png';
    bg2Img.src = 'img/stars.png';
    playImg.src = 'img/play2.png';

    bg = new createjs.Bitmap(bgImg);
    bg2 = new createjs.Bitmap(bg2Img);
    play = new createjs.Bitmap(playImg);

    init();

});

function init() {
    var playText = new createjs.Text("New Game", "40px Verdana", "#FF6666");

    play.addEventListener("click", function ()
    {
        load();
        stage.removeChild(finalScore, textFail);
        stage.removeChild(play, playText);
        stage.update();
    });
    stage.removeChild
    stage.addChild(bg, bg2, play, playText);

    bg2.y = 451;
    play.x = 225;
    play.y = 400;
    playText.x = 200;
    playText.y = 350;
    stage.update();
}

function load() {
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

    //BULLETS ENEMY
    bulletEnemyImg = new Image();
    bulletEnemyImg.src = 'img/bulletEnemy.png';

    //SCORE
    score = 0;
    scoreText = new createjs.Text("score : " + score, "20px Verdana", "#FFFFFF");
    scoreText.x = 5;
    scoreText.y = 10;


    stage.addChild(ship, scoreText); //ajout des images
    stage.update();
    
    //LIVES
    for (var n = 0; n < 3; n++) {
        var imgLive = new Image();
        imgLive.src = 'img/lives.png';

        lifeArray.push(new createjs.Bitmap(imgLive));
    };

    var posImgLive = 600;

    lifeArray.forEach(function (live) {
        stage.addChild(live);
        live.y = 851 - 40;
        live.x = posImgLive - 40;
        posImgLive -= 30;
        stage.update();
    });

    ship.x = 280;
    ship.y = 810;

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
    });

    addBulletEnemy(); //en dehors du tick car need a setInterval

    createjs.Ticker.addEventListener("tick", startGame);
    createjs.Ticker.addEventListener("tick", stage);
};

function startGame() {
    //console.log(levelVitesse);
    levels();

    shoot();

    displayEnemy();

    collisions();
}

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
    textFail = new createjs.Text("Perdu !", "40px Verdana", "#FFFFFF");
    finalScore = new createjs.Text("Score final : " + score, "30px Verdana", "#FFFFFF");

    stage.removeChild(lifeArray[lifeArray.length - 1]);
    //lifeArray.splice(0, 1);
    lifeArray.pop();
    stage.update();

    if (!lifeArray.length) {
        enemys = new Array();
        bullets = new Array();
        bulletsEnemy = new Array();
        // stage.removeChild(bg, bg2, scoreText)
        createjs.Ticker.removeEventListener("tick", startGame);

        stage.addChild(bg, bg2, textFail, finalScore, play);

        textFail.x = 250;
        textFail.y = 350;
        finalScore.x = 200;
        finalScore.y = 300;

        clearInterval(myVar);
    };


}

function addBulletEnemy() {

    myVar = setInterval(function () {
        for (var a = 0; a < enemys.length; a++) {
            bulletEnemy = new createjs.Bitmap(bulletEnemyImg);
            bulletsEnemy.push(bulletEnemy);

            stage.addChild(bulletEnemy);
            bulletEnemy.x = enemys[a].x + 20;
            bulletEnemy.y = enemys[a].y + 50;
        };
    }, 1500);
}

function levels() {
    if (score >= 0 && score < 500) {
        //console.log('lvl 1');
        textLevel = new createjs.Text("Level 1", "50px Verdana", "#FFFFFF");
        levelVitesse = 3000;

    } else if (score >= 500 && score < 800) {
        //console.log('lvl 2');
        textLevel = new createjs.Text("Level 2", "50px Verdana", "#FFFFFF");
        levelVitesse = 1050;

    } else if (score => 800 && score < 1000) {
        //console.log('lvl 3');
        textLevel = new createjs.Text("Level 3", "50px Verdana", "#FFFFFF");
        levelVitesse = 875;
    };

    stage.addChild(textLevel);
    textLevel.x = 200;
    textLevel.y = 300;

    setTimeout(function () {
        //console.log('toto');
        stage.removeChild(textLevel);
        stage.update();
    }, 1000);
}

function displayEnemy() {

    //console.log(levelVitesse);

    var random = Math.floor(Math.random() * (550 + 1));

    if (Date.now() - lastEnemyDisplay > levelVitesse) {
        lastEnemyDisplay = Date.now();

        var enemy = new createjs.Bitmap(enemyImg);
        enemys.push(enemy);

        stage.addChild(enemy); //ajout des enemy
        enemy.x = random;
    }

    bulletsEnemy.forEach(function (bulletEnemy) { //deplacement des bullets enemy
        bulletEnemy.y += 20;
    });
}

function collisions() {
    for (var j = 0; j < enemys.length; j++) {

        enemys[j].y += 3;

        if (enemys[j].y >= 851) { //suppression enemy en dehors du canvas
            stage.removeChild(enemys[j]);
            enemys.splice(j, 1);
        };

        for (var k = 0; k < bullets.length; k++) { // collision tirs allies
            if (typeof enemys[j] !== "undefined" && bullets[k].x >= enemys[j].x && bullets[k].x + 11 < enemys[j].x + 49 && bullets[k].y < enemys[j].y + 40) {

                scoreUpdate();

                stage.removeChild(enemys[j]); //suppresion de l'enemis et de la bullet qui lq touche`
                enemys.splice(j, 1);

                stage.removeChild(bullets[k]);
                bullets.splice(k, 1);
            };
        };

        for (var m = 0; m < bulletsEnemy.length; m++) { // collision tirs enemy

            if (bulletsEnemy[m].x >= ship.x && bulletsEnemy[m].x + 11 < ship.x + 37 && bulletsEnemy[m].y > ship.y) {
                //console.log('touche');
                stage.removeChild(bulletsEnemy[m]); //supression de la bullet qui m'a touche
                bulletsEnemy.splice(m, 1);

                failed();
            };
            if (typeof bulletsEnemy[m] !== "undefined" && bulletsEnemy[m].y >= 851) {
                stage.removeChild(bulletsEnemy[m]);
                bulletsEnemy.splice(m, 1);
            };
        };
    };
}
