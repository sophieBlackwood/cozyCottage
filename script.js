// --- SCENE NAVIGATION ---
function enterHouse() {
    const fade = document.getElementById('fade');
    fade.style.opacity = 1;
    setTimeout(() => {
        document.getElementById('outside').classList.remove('active');
        document.getElementById('inside').classList.add('active');
        fade.style.opacity = 0;
    }, 1000);
}

// --- WORLD LOGIC ---
let isNight = false;
setInterval(() => {
    isNight = !isNight;
    const game = document.getElementById('game');
    if(isNight) game.classList.add('night');
    else game.classList.remove('night');
}, 60000); // Transitions every minute

function toggleCandle() {
    document.getElementById('candle').classList.toggle('lit');
}

// --- THE BOOK WORLDS ---
function openBook(type) {
    const content = document.getElementById('bookContent');
    document.getElementById('bookWorld').classList.add('active');

    if(type === 'ballet') {
        content.innerHTML = `
            <h2 style="color:#4a2e1a">A Story of Dance</h2>
            <div class="mini-game" id="danceArea">
                <span id="dancer" style="font-size:50px; cursor:pointer;">💃</span>
            </div>
            <p>Score: <span id="score">0</span></p>
        `;
        initDanceGame();
    } else {
        content.innerHTML = `<h2>Landscape</h2><p>The pixelated hills roll on forever...</p>`;
    }
}

function initDanceGame() {
    let score = 0;
    const dancer = document.getElementById('dancer');
    dancer.onclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        dancer.style.transform = `translate(${Math.random()*40-20}px, ${Math.random()*40-20}px)`;
    };
}

function closeBook() {
    document.getElementById('bookWorld').classList.remove('active');
}

// --- THE CAT ---
const cat = document.getElementById('cat');
cat.addEventListener('click', () => {
    cat.style.transform = "translateY(-20px)";
    setTimeout(() => cat.style.transform = "translateY(0)", 200);
    console.log("The white cat blinks its blue eyes at you.");
});
