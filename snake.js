let width = 9;
let height = 9;

let score = 0;

let length = 1;

let gameOver = false;

let updateTime = 125;

let snakePos = [{x: 4, y: 4}]

window.onload = function () {
    initialize();
}

let applePosX;
let applePosY;

function spawnApple(){
    let applePos = Math.floor(Math.random() * width * height);
    applePosY = Math.floor(applePos / height);
    applePosX = applePos % width;

    for( let part of snakePos){
        if(applePosX == part.x && applePosY == part.y){
            applePos = Math.floor(Math.random() * width * height);
            applePosY = Math.floor(applePos / height);
            applePosX = applePos % width;
        }
    }

    let tile = document.getElementById(applePosY.toString() + '-' + applePosX.toString());
    tile.classList.remove("empty");
    tile.classList.add("food");
}

function initialize(){
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            let tile = document.createElement("span");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            if(i == 4 && j == 4){
                tile.classList.add("snake")
            }
            else{
                tile.classList.add("empty")
            }
            document.getElementById("board").appendChild(tile);
        }
    }
    spawnApple();

    setInterval(update, updateTime);
}

let direction = {x:0, y:0};

function update(){

    if(gameOver)
    {
        document.getElementById("score").innerText = "Game Over";
        return;
    }

    let head = snakePos[0];
    let newHead = {x: head.x + direction.x, y: head.y + direction.y};

    if (newHead.x > width - 1 || newHead.y > height - 1 || newHead.x < 0 || newHead.y < 0){
        gameOver = true;
    }

    for(let part of snakePos){
        if(part.x == newHead.x && part.y == newHead.y && (direction.x != 0 || direction.y != 0)){
            
            gameOver = true;
        }
    }

    snakePos.unshift(newHead);

    let newHeadTile = document.getElementById(newHead.y.toString() + '-' + newHead.x.toString());
    if (newHeadTile.classList.contains("food")){
        newHeadTile.classList.remove("food");
        score++;
        document.getElementById("score").innerText = "Score: " + score.toString();
        spawnApple();
    }
    else{
        let tail = snakePos.pop();
        let tailTile = document.getElementById(tail.y.toString() + '-' + tail.x.toString());
        tailTile.classList.remove("snake");
        tailTile.classList.add("empty");
    }

    newHeadTile.classList.remove("empty");
    newHeadTile.classList.add("snake");

}

document.addEventListener("keydown", function (e){
    if(gameOver)
        return;

    switch(e.code){
        case "ArrowUp" :
            if(direction.y !== 1)
            {
                direction.y = -1; 
                direction.x = 0;
            }
            break;
        case "ArrowLeft":
            if(direction.x !== 1)
            {
                direction.y = 0; 
                direction.x = -1;
            }
            break;
        case "ArrowDown":
            if(direction.y !== -1)
            {
                direction.y = 1; 
                direction.x = 0;
            }
            break;
        case "ArrowRight":
            if(direction.x !== -1)
            {
                direction.y = 0; 
                direction.x = 1;
            }
            break;
    }
});