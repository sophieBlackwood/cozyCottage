const fade = document.getElementById("fade");

function setScene(id) {
    fade.style.opacity = 1;
    setTimeout(() => {
        document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        fade.style.opacity = 0;
    }, 700);
}

document.querySelector(".cottage-wrap").onclick = () => setScene("inside");

let time = 0; 
function skyLogic() {
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const sky = document.getElementById("sky-layer");
    const game = document.getElementById("game");

    time += 0.00008; 
    if (time > 1) time = 0;

    let x = 5 + time * 90;
    let y = Math.sin(time * Math.PI) * -70 + 85;

    sun.style.left = x + "%";
    sun.style.top = y + "%";
    moon.style.left = (100 - x) + "%"; 
    moon.style.top = (150 - y) + "%"; 

    let day = Math.sin(time * Math.PI);

    if (day > 0.6) { 
        sky.style.background = "linear-gradient(to bottom, #4facfe 0%, #bde4ff 100%)";
        game.style.filter = "brightness(1) saturate(1)";
        moon.style.opacity = 0;
    } 
    else if (day > 0.2) { 
        sky.style.background = "linear-gradient(to bottom, #203a43, #2c5364, #ffaf7b)";
        game.style.filter = "brightness(0.85) sepia(0.3) saturate(1.3)";
        moon.style.opacity = 0.3;
    } 
    else if (day > 0.05) {
        sky.style.background = "linear-gradient(to bottom, #480048, #C04848)";
        game.style.filter = "brightness(0.6) saturate(0.8) hue-rotate(-20deg)";
        moon.style.opacity = 0.6;
    }
    else { 
        sky.style.background = "linear-gradient(to bottom, #000428, #004e92)";
        game.style.filter = "brightness(0.35) saturate(0.6) hue-rotate(20deg)";
        moon.style.opacity = 1;
    }

    requestAnimationFrame(skyLogic);
}
skyLogic();

function sway() {
    document.querySelectorAll('.horizon-tree').forEach((t, i) => {
        const movement = Math.sin(Date.now() / 4000 + i) * 1.5;
        t.style.transform = `scale(0.9) rotate(${movement}deg)`;
    });
    requestAnimationFrame(sway);
}
sway();

document.getElementById("candle").onclick = function() { this.classList.toggle("lit"); };
