const fade = document.getElementById("fade");

/* SCENE LOGIC */
function setScene(id) {
    fade.style.opacity = 1;
    setTimeout(() => {
        document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        fade.style.opacity = 0;
    }, 700);
}

document.querySelector(".cottage-wrap").onclick = () => setScene("inside");

/* SMOOTH CELESTIAL ENGINE */
let time = 0; 
function skyLogic() {
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const sky = document.getElementById("sky-layer");
    const game = document.getElementById("game");

    time += 0.0001; // Slow time
    if (time > 1) time = 0;

    // Movement math
    let x = 5 + time * 90;
    let y = Math.sin(time * Math.PI) * -60 + 80;

    sun.style.left = x + "%";
    sun.style.top = y + "%";
    moon.style.left = (100 - x) + "%"; 
    moon.style.top = (150 - y) + "%"; 

    // Precise Sky Transitions
    let day = Math.sin(time * Math.PI);

    if (day > 0.5) { 
        // HIGH DAY
        sky.style.background = "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)";
        game.style.filter = "brightness(1) saturate(1)";
        moon.style.opacity = 0;
    } 
    else if (day > 0.1) { 
        // GOLDEN HOUR / SUNRISE / SUNSET
        sky.style.background = "linear-gradient(to bottom, #1e3c72 0%, #ff6a00 100%)";
        game.style.filter = "brightness(0.9) sepia(0.2) saturate(1.2)";
        moon.style.opacity = 0.2;
    } 
    else { 
        // DEEP NIGHT
        sky.style.background = "linear-gradient(to bottom, #000428 0%, #004e92 100%)";
        game.style.filter = "brightness(0.4) saturate(0.7) hue-rotate(20deg)";
        moon.style.opacity = 1;
    }

    requestAnimationFrame(skyLogic);
}
skyLogic();

/* AMBIENT SWAY */
function sway() {
    document.querySelectorAll('.horizon-tree').forEach((t, i) => {
        const movement = Math.sin(Date.now() / 3000 + i) * 1;
        t.style.transform = `scale(1.4) rotate(${movement}deg)`;
    });
    requestAnimationFrame(sway);
}
sway();

/* INTERACTIONS */
document.getElementById("candle").onclick = function() { this.classList.toggle("lit"); };
document.getElementById("cat").onclick = function() {
    this.style.transform = "scale(1.2) translateY(-10px)";
    setTimeout(() => this.style.transform = "scale(1)", 200);
};

document.querySelectorAll(".clickable-book").forEach(b => {
    b.onclick = () => {
        const type = b.getAttribute("data-book");
        document.getElementById("bookWorld").classList.add("active");
        document.getElementById("bookContent").innerHTML = `<h2>${type.toUpperCase()}</h2><p>Entering the world of ${type}...</p>`;
    };
});
document.querySelector(".close-btn").onclick = () => document.getElementById("bookWorld").classList.remove("active");
