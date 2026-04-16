const fade = document.getElementById("fade");

/* SCENE SWITCHING */
function setScene(id) {
    fade.style.opacity = 1;
    setTimeout(() => {
        document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        fade.style.opacity = 0;
        document.getElementById("game").classList.remove("entering");
    }, 700);
}

document.querySelector(".cottage-wrap").onclick = () => {
    document.getElementById("game").classList.add("entering");
    setTimeout(() => setScene("inside"), 800);
};

/* CELESTIAL SYSTEM (VERY SLOW) */
let time = 0;
function skyLogic() {
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const skyContainer = document.getElementById("outside");
    
    time += 0.00015; 
    if (time > 1) time = 0;

    let x = 5 + time * 90;
    let y = Math.sin(time * Math.PI) * -50 + 65;

    sun.style.left = x + "%";
    sun.style.top = y + "%";
    moon.style.left = (100 - x) + "%"; 
    moon.style.top = (130 - y) + "%"; 

    let dayProgress = Math.sin(time * Math.PI);
    if (dayProgress > 0.8) skyContainer.style.background = "linear-gradient(to bottom, #87CEEB, #f5e6c8)";
    else if (dayProgress > 0.1) skyContainer.style.background = "linear-gradient(to bottom, #f7a35c, #d97a2b)";
    else skyContainer.style.background = "linear-gradient(to bottom, #0b1026, #05060c)";

    moon.style.opacity = (dayProgress < 0.2) ? 1 : 0;
    requestAnimationFrame(skyLogic);
}
skyLogic();

/* GENTLE FOREST SWAY */
function swayTrees() {
    document.querySelectorAll('.pixel-tree').forEach((tree, i) => {
        const angle = Math.sin(Date.now() / 2000 + i) * 1.5;
        const baseScale = tree.classList.contains('bg-tree') ? 2.8 : 3.5;
        tree.style.transform = `scale(${baseScale}) rotate(${angle}deg)`;
    });
    requestAnimationFrame(swayTrees);
}
swayTrees();

/* INTERACTIONS */
document.getElementById("candle").onclick = function() { this.classList.toggle("lit"); };

document.querySelectorAll(".clickable-book").forEach(b => {
    b.onclick = () => {
        const type = b.getAttribute("data-book");
        document.getElementById("bookWorld").classList.add("active");
        const content = document.getElementById("bookContent");
        content.innerHTML = type === "ballet" ? 
            "<h2>Ballet</h2><p>Graceful movements in a pixel world.</p><div style='font-size:50px;'>💃</div>" : 
            "<h2>Landscapes</h2><p>Golden hills and orange skies.</p>";
    };
});

document.querySelector(".close-btn").onclick = () => document.getElementById("bookWorld").classList.remove("active");
