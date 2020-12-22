var tp = false;
var gameState = "PLAY";
var bunny_image;
var bg_image;

function preload() {
    bunny_image = loadImage("images/bunnyImg.png");
    bg_image = loadImage("images/bg.png");
    snakeImage = loadImage("images/snake.png");
    carrotImage = loadImage("images/carrot.png");
}

function setup() {
    createCanvas(600, 600);
    bg = createSprite(300, 300, 600, 600);
    bg.addImage(bg_image);
    bg.scale = 3.5
    bunny = createSprite(40, 575, 30, 30);
    bunny.addImage(bunny_image);
    bunny.scale = 0.5;
    carrot = createSprite(550, 40, 50, 50);
    carrot.addImage(carrotImage);
    carrot.scale = 0.2;
    platformUp = createSprite(300, -20, 650, 45);
    platformUp.visible = false;
    platformDown = createSprite(300, 620, 650, 45);
    platformDown.visible = false;
    platformLeft = createSprite(-20, 300, 45, 650);
    platformLeft.visible = false;
    platformRight = createSprite(620, 300, 45, 650);
    platformRight.visible = false;
    brickGroup = new Group();
    brickGroup2 = new Group();
    snakeGroup = new Group();
}

function draw() {
    background(220);

    if (gameState === "PLAY") {
        bunny.collide(platformUp);
        bunny.collide(platformDown);
        bunny.collide(platformLeft);
        bunny.collide(platformRight);

        if (frameCount % 300 === 0) {
            tp = true;
        }

        if (tp === true) {
            if (keyDown("up")) {
                bunny.y -= 3;
                if (keyDown("space")) {
                    bunny.y -= 6;
                }
            }

            if (keyDown("down")) {
                bunny.y += 3;
                if (keyDown("space")) {
                    bunny.y += 6;
                }
            }

            if (keyDown("left")) {
                bunny.x -= 3;
                if (keyDown("space")) {
                    bunny.x -= 6;
                }
            }

            if (keyDown("right")) {
                bunny.x += 3;
                if (keyDown("space")) {
                    bunny.x += 6;
                }
            }
        }

        if (bunny.isTouching(brickGroup) || bunny.isTouching(brickGroup2)) {
            bunny.x = 40;
            bunny.y = 575;
        }

        if (bunny.isTouching(snakeGroup)) {
            bunny.x = 40;
            bunny.y = 575;
        }

        generateBrick();
        generateBrick2();
        generateSnake();

        if (bunny.isTouching(carrot)) {
            gameState = "STOP";
        }
    } else if (gameState === "STOP") {
        brickGroup.setVelocityXEach(0);
        brickGroup2.setVelocityXEach(0);
        snakeGroup.setVelocityXEach(0);
        textSize(50);
        text("You Won !!!", 200, 40);
    }
    drawSprites();

    function generateBrick() {
        if (frameCount % 150 === 0) {
            var Brick = createSprite(700, 350, 150, 20);
            Brick.velocityX = -4;
            Brick.y = random(350, 550);
            Brick.lifeTime = 300;
            brickGroup.add(Brick);
        }
    }

    function generateBrick2() {
        if (frameCount % 150 === 0) {
            var Brick2 = createSprite(700, 200, 150, 20);
            Brick2.velocityX = -5;
            Brick2.y = random(200, 350);
            Brick2.lifeTime = 300;
            brickGroup2.add(Brick2);
        }
    }

    function generateSnake() {
        if (frameCount % 200 === 0) {
            var Snake = createSprite(700, 300, 100, 5);
            Snake.velocityX = -15;
            Snake.y = bunny.y - 70;
            Snake.lifeTime = 300;
            Snake.addImage(snakeImage);
            Snake.scale = 0.5
            snakeGroup.add(Snake);
        }
    }
}