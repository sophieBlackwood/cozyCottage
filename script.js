function fadeTransition(callback) {
  const fade = document.getElementById("fade");
  fade.style.opacity = 1;

  setTimeout(() => {
    callback();
    fade.style.opacity = 0;
  }, 800);
}

function switchScene(id) {
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* 🚪 Enter */
function enterHouse() {
  fadeTransition(() => switchScene("inside"));
}

/* 📖 Books */
function openBook(type) {
  const content = document.getElementById("bookContent");

  if (type === "ballet") {
    content.innerHTML = "Soft music plays... you move like drifting petals...";
  }

  if (type === "landscape") {
    content.innerHTML = "Golden hills stretch endlessly under a painted sky...";
  }

  if (type === "forest") {
    content.innerHTML = `
      Catch the fireflies ✨<br><br>
      <div id="gameArea"></div>
    `;
    startFireflyGame();
  }

  fadeTransition(() => switchScene("bookWorld"));
}

function closeBook() {
  fadeTransition(() => switchScene("inside"));
}

/* 🕯️ Candle */
function toggleCandle() {
  document.getElementById("candle").classList.toggle("lit");
}

/* 🐈 Cat wandering */
setInterval(() => {
  const cat = document.getElementById("cat");
  const x = Math.random() * 200;
  cat.style.transform = `translateX(-${x}px)`;
}, 4000);

/* 🌙 Day/Night */
setInterval(() => {
  document.body.classList.toggle("night");
}, 25000);

/* 🌧️ Rain system */
setInterval(() => {
  for (let i = 0; i < 20; i++) {
    const drop = document.createElement("div");
    drop.className = "rain";
    drop.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(drop);

    setTimeout(() => drop.remove(), 1000);
  }
}, 300);

/* ✨ Firefly mini game */
function startFireflyGame() {
  const area = document.getElementById("gameArea");

  for (let i = 0; i < 5; i++) {
    const f = document.createElement("div");
    f.innerHTML = "✨";
    f.style.position = "absolute";
    f.style.left = Math.random() * 300 + "px";
    f.style.top = Math.random() * 200 + "px";
    f.style.cursor = "pointer";

    f.onclick = () => f.remove();

    area.appendChild(f);
  }
}
