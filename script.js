var stage;
var ship;

var bulletImg;
var bullets = new Array();

var enemyImg;
var enemys = new Array();

var lastShoot = 0;
var lastEnemyDisplay = 0;

var score;
var scoreText;
var finalScore;
var textFail;

var bulletEnemy;
var bulletsEnemy = new Array();

var bossImg;
var boss;
var bossBullets = new Array();
var bossBullet;
var bossBullet2;

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
    var playImg = new Image();

    bgImg.src = 'img/stars.png';
    playImg.src = 'img/play2.png';

    bg = new createjs.Bitmap(bgImg);
    bg2 = new createjs.Bitmap(bgImg);
    play = new createjs.Bitmap(playImg);

    init();

});

function init() {
    var playText = new createjs.Text("New Game", "bold 40px Verdana", "#FF6666");

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
    enemyImg.src = 'img/enemy2.png';

    //BULLETS ENEMY
    bulletEnemyImg = new Image();
    bulletEnemyImg.src = 'img/bulletEnemy.png';

    //BOSS
    bossImg = new Image();
    bossImg.src = 'img/boss.gif';
    boss = new createjs.Bitmap(bossImg);

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
    createjs.Ticker.addEventListener("tick", shoot);
    createjs.Ticker.addEventListener("tick", stage);
};

function startGame() {

    levels();

    //shoot();

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

function addBulletEnemy() {

    myVar = setInterval(function () {
        for (var a = 0; a < enemys.length; a++) {
            bulletEnemy = new createjs.Bitmap(bulletEnemyImg);
            bulletsEnemy.push(bulletEnemy);

            stage.addChild(bulletEnemy);
            bulletEnemy.x = enemys[a].x + 15;
            bulletEnemy.y = enemys[a].y + 50;
        };
    }, 2000);
}

function addBulletBoss() {

}

function levels() {
    if (score == 0 || score == 100) {

        if (score == 0) {
            stage.removeChild(textLevel);
            textLevel = new createjs.Text("Level 1", "50px Verdana", "#FFFFFF");
            levelVitesse = 3000;
            stage.addChild(textLevel);
        } else {
            setTimeout(function () {
                stage.removeChild(textLevel);
            }, 500);
        }

    } else if (score == 500 || score == 600) {
        if (score == 500) {
            stage.removeChild(textLevel);
            textLevel = new createjs.Text("Level 2", "50px Verdana", "#FFFFFF");
            levelVitesse = 2000;
            stage.addChild(textLevel);
        } else {
            setTimeout(function () {
                stage.removeChild(textLevel);
            }, 500);
        }

    } else if (score == 1000 || score == 1100) {
        if (score == 1000) {
            stage.removeChild(textLevel);
            textLevel = new createjs.Text("Level 3", "50px Verdana", "#FFFFFF");
            levelVitesse = 2000;
            stage.addChild(textLevel);
        } else {
            setTimeout(function () {
                stage.removeChild(textLevel);
            }, 500);
        }

    } else if (score == 1400) {

        stage.removeChild(textLevel);
        textLevel = new createjs.Text("BOSS", "bold 50px Verdana", "#FFFFFF");
        stage.addChild(textLevel);

        enemys = [];
        bulletsEnemy = [];
        createjs.Ticker.removeEventListener("tick", startGame);
        createjs.Ticker.removeEventListener("tick", shoot);
        clearInterval(myVar);

        setTimeout(function () {
            stage.removeChild();
            stage.addChild(bg, bg2, scoreText, ship);
            displayBoss();
        }, 1500);
    }

    textLevel.x = 200;
    textLevel.y = 300;
}

function displayEnemy() {

    var random = Math.floor(Math.random() * (550 + 1));

    if (Date.now() - lastEnemyDisplay > levelVitesse) {
        lastEnemyDisplay = Date.now();

        var formation =  Math.floor(Math.random() * 2) + 1; //generation d'un nombre aleatoire pour les formation
        //console.log(formation);

        for (var i = 0; i <= formation ; i++) {

            var enemy = new createjs.Bitmap(enemyImg);
            enemys.push(enemy);

            stage.addChild(enemy); //ajout des enemy
            random += i * 40; //decalage des img pour les formations
            enemy.x = random;

        };
    }

    bulletsEnemy.forEach(function (bulletEnemy) { //deplacement des bullets enemy
        bulletEnemy.y += 10;
    });
}

function displayBoss() {

    stage.addChild(boss);
    boss.x = 225;

    var timeBoss = setInterval(function () {
        bossBullet = new createjs.Bitmap(bulletEnemyImg);
        bossBullets.push(bossBullet);
        bossBullet2 = new createjs.Bitmap(bulletEnemyImg);
        bossBullets.push(bossBullet2);

        stage.addChild(bossBullet, bossBullet2);

        bossBullet.x = boss.x + 35;
        bossBullet.y = boss.y + 110;

        bossBullet2.x = boss.x + 85;
        bossBullet2.y = boss.y + 110;
    }, 1000);

    createjs.Ticker.addEventListener("tick", shoot);
    createjs.Ticker.addEventListener("tick", collisionBoss);
    createjs.Ticker.addEventListener("tick", stage);


}

function collisionBoss() {
    for (var p = 0; p < bossBullets.length; p++) {

        bossBullets[p].y += 10;

        if (bossBullets[p].y >= 851) { //suppression bulletboss en dehors du canvas
            stage.removeChild(bossBullets[p]);
            enemys.splice(p, 1);
        };

        for (var k = 0; k < bullets.length; k++) { // collision tirs allies
            if (bullets[k].x >= boss.x && bullets[k].x + 11 < boss.x + 128 && bullets[k].y < boss.y + 128) {

                scoreUpdate();

                //LE BOSS PERD UNE VIE
            };
        };

        //COLLISION TIR BOSS
        if (bossBullets[p].x >= ship.x && bossBullets[p].x + 11 < ship.x + 37 && bossBullets[p].y > ship.y) {
            //console.log('touche');
            stage.removeChild(bossBullets[p]); //supression de la bullet qui m'a touche
            bulletsEnemy.splice(p, 1);

            failed();
        };
        if (typeof bossBullets[p] !== "undefined" && bossBullets[p].y >= 851) {
            stage.removeChild(bossBullets[p]);
            bulletsEnemy.splice(p, 1);
        };
    };
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

                stage.removeChild(enemys[j]); //suppresion de l'enemis et de la bullet qui le touche`
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

function failed() {
    textFail = new createjs.Text("Perdu !", "40px Verdana", "#FFFFFF");
    finalScore = new createjs.Text("Score final : " + score, "30px Verdana", "#FFFFFF");

    stage.removeChild(lifeArray[lifeArray.length - 1]);
    //lifeArray.splice(0, 1);
    lifeArray.pop();
    stage.update();

    if (!lifeArray.length) {
        enemys = [];
        bullets = [];
        bulletsEnemy = [];
        bossBullets = [];
        // stage.removeChild(bg, bg2, scoreText)
        createjs.Ticker.removeEventListener("tick", startGame);
        createjs.Ticker.removeEventListener("tick", shoot);
        createjs.Ticker.removeEventListener("tick", collisionBoss);

        stage.addChild(bg, bg2, textFail, finalScore, play);

        textFail.x = 250;
        textFail.y = 350;
        finalScore.x = 200;
        finalScore.y = 300;

        clearInterval(myVar);
        clearInterval(timeBoss);
    };
}
