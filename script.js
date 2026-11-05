let player = document.getElementById("player");
let enemy = document.getElementById("enemy");

let score = 0;
let x = 130;
let y = 0;
let game;

function startgame() {
    score = 0;
    x = (document.getElementById("road").clientWidth -
         player.offsetWidth) / 2;
    y = 0;

    clearInterval(game);

    document.getElementById("score").innerText = score;

    player.style.left = x + "px";
    enemy.style.left =
        Math.random() * (document.getElementById("road").clientWidth -
        enemy.offsetWidth) + "px";

    enemy.style.top = "0px";

    game = setInterval(function() {

        y += 5;
        enemy.style.top = y + "px";

        // Collision detection
        let p = player.getBoundingClientRect();
        let e = enemy.getBoundingClientRect();

        if (
            p.left < e.right &&
            p.right > e.left &&
            p.top < e.bottom &&
            p.bottom > e.top
        ) {
            clearInterval(game);
            game = null;
            alert("Game Over mf! Your score: " + score);
            return;
        }

        // Enemy reaches the bottom
        if (y > document.getElementById("road").clientHeight) {

            y = -enemy.offsetHeight;

            enemy.style.left =
                Math.random() *
                (document.getElementById("road").clientWidth -
                enemy.offsetWidth) + "px";

            score++;

            document.getElementById("score").innerText = score;
        }

    }, 50);
}

// Keyboard controls
document.addEventListener("keydown", function(e) {

    if (e.key === "ArrowLeft") {
        x -= 15;
    }

    if (e.key === "ArrowRight") {
        x += 15;
    }

    let road = document.getElementById("road");

    x = Math.max(0, Math.min(x, road.clientWidth - player.offsetWidth));

    player.style.left = x + "px";
});
