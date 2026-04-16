const fade = document.getElementById("fade");

/* SCENE SWITCH */
function setScene(id) {
    fade.style.opacity = 1;
    setTimeout(() => {
        document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        fade.style.opacity = 0;
        document.getElementById("game").classList.remove("entering");
    }, 700);
}

/* 🚪 COTTAGE ENTRY */
document.querySelector(".cottage-wrap").onclick = () => {
    document.getElementById("game").classList.add("entering");
    setTimeout(() => setScene("inside"), 800);
};

/* 🌅 SLOW SKY SYSTEM */
let time = 0;
function sky() {
    const game = document.getElementById("outside");
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    
    // Slower increment for sun/moon movement
    time += 0.0002; 
    if (time > 1) time = 0;

    // Orbital Arc
    let x = 10 + time * 80;
    let y = Math.sin(time * Math.PI) * -45 + 65;

    sun.style.left = x + "%";
    sun.style.top = y + "%";

    moon.style.left = (110 - x) + "%"; 
    moon.style.top = (130 - y) + "%"; // Moon follows a lower offset path

    // Dynamic Sky Colors
    let dayProgress = Math.sin(time * Math.PI); 
    if (dayProgress > 0.8) {
        game.style.background = "linear-gradient(to bottom, #87CEEB, #f5e6c8)"; // Day
    } else if (dayProgress > 0.2) {
        game.style.background = "linear-gradient(to bottom, #f7a35c, #d97a2b)"; // Sunrise/Set
    } else {
        game.style.background = "linear-gradient(to bottom, #0b1026, #05060c)"; // Night
    }

    moon.style.opacity = (dayProgress < 0.3) ? 1 : 0;
    
    requestAnimationFrame(sky);
}
sky();

/* WEATHER */
let rainInt;
function startRain() {
    let b = document.getElementById("rainBox");
    rainInt = setInterval(() => {
        let d = document.createElement("div");
        d.style.cssText = "position:absolute; width:2px; height:15px; background:rgba(255,255,255,0.3); z-index:10;";
        d.style.left = Math.random() * window.innerWidth + "px";
        d.style.top = "-20px";
        b.appendChild(d);

        let f = setInterval(() => {
            d.style.top = (parseInt(d.style.top) + 12) + "px";
            if (parseInt(d.style.top) > window.innerHeight) { d.remove(); clearInterval(f); }
        }, 16);
    }, 100);
}

setInterval(() => {
    let m = ["sunny", "rainy", "sunny"][Math.floor(Math.random() * 3)];
    document.getElementById("rainBox").innerHTML = "";
    clearInterval(rainInt);
    if (m === "rainy") startRain();
}, 25000);

/* INTERACTABLES */
document.getElementById("candle").onclick = function() { this.classList.toggle("lit"); };

document.querySelectorAll(".clickable-book").forEach(b => {
    b.onclick = () => {
        const type = b.getAttribute("data-book");
        document.getElementById("bookWorld").classList.add("active");
        const content = document.getElementById("bookContent");
        if (type === "ballet") {
            content.innerHTML = "<h2>Ballet World</h2><p>The ballerina dances in the pixelated moonlight...</p><div style='font-size:50px; animation: sway 2s infinite;'>💃</div>";
        } else {
            content.innerHTML = "<h2>Landscape World</h2><p>You see a vast painting of a golden autumn field.</p>";
        }
    };
});

document.querySelector(".close-btn").onclick = () => {
    document.getElementById("bookWorld").classList.remove("active");
};

document.getElementById("cat").onclick = function() {
    this.style.transform = "scale(1.2)";
    setTimeout(() => this.style.transform = "scale(1)", 200);
};
