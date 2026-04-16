// --- SCENE NAVIGATION ---
function enterHouse() {
    const fade = document.getElementById('fade');
    fade.style.opacity = 1;
    setTimeout(() => {
        document.getElementById('outside').classList.remove('active');
        document.getElementById('inside').classList.add('active');
        fade.style.opacity = 0;
    }, 800);
}

// --- CANDLE & LIGHTING ---
function toggleCandle() {
    document.getElementById('candle').classList.toggle('lit');
}

// --- WEATHER & TIME SYSTEM ---
let dayCycle = 0; 
setInterval(() => {
    dayCycle++;
    if (dayCycle % 2 === 0) {
        document.body.classList.add('night');
    } else {
        document.body.classList.remove('night');
    }
}, 30000); // Switches every 30 seconds

function createRain() {
    if (!document.body.classList.contains('rainy')) return;
    const rainDrop = document.createElement('div');
    rainDrop.className = 'rain';
    rainDrop.style.left = Math.random() * 100 + "vw";
    rainDrop.style.top = "-20px";
    document.body.appendChild(rainDrop);
    
    let fall = setInterval(() => {
        rainDrop.style.top = (parseInt(rainDrop.style.top) + 10) + "px";
        if (parseInt(rainDrop.style.top) > window.innerHeight) {
            clearInterval(fall);
            rainDrop.remove();
        }
    }, 20);
}
setInterval(createRain, 100);

// --- BOOK WORLDS & GAME ---
function openBook(world) {
    const overlay = document.getElementById('bookWorld');
    const content = document.getElementById('bookContent');
    overlay.classList.add('active');
    
    if (world === 'ballet') {
        content.innerHTML = `
            <h2>The Ballerina's Dream</h2>
            <p>Help her find her rhythm!</p>
            <div id="miniGame" style="font-size: 50px; cursor: pointer;">💃</div>
            <p>Clicks: <span id="score">0</span></p>
        `;
        let score = 0;
        document.getElementById('miniGame').onclick = function() {
            score++;
            document.getElementById('score').innerText = score;
            this.style.transform = `scale(${1 + score*0.1}) rotate(${score*10}deg)`;
        };
    } else {
        content.innerHTML = `<h2>Landscape</h2><p>A quiet pixel field stretches forever...</p>`;
    }
}

function closeBook() {
    document.getElementById('bookWorld').classList.remove('active');
}

// --- THE CAT ---
document.getElementById('cat').onclick = function() {
    this.innerText = "🐾";
    setTimeout(() => this.innerText = "🐈", 1000);
    console.log("The white cat with blue eyes purrs.");
};
