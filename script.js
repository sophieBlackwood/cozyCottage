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

// --- DYNAMIC WEATHER & TIME ---
let weather = 'sunny'; 
setInterval(() => {
    // Cycle Time: Day -> Night
    document.getElementById('game').classList.toggle('night');
    
    // Cycle Weather: Sunny -> Rainy -> Windy
    const modes = ['sunny', 'rainy', 'windy'];
    weather = modes[Math.floor(Math.random() * modes.length)];
    if(weather === 'rainy') startRain();
}, 20000);

function startRain() {
    const rainBox = document.getElementById('rainBox');
    for(let i=0; i<30; i++) {
        let drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.top = Math.random() * 100 + "vh";
        rainBox.appendChild(drop);
        
        let fall = setInterval(() => {
            drop.style.top = (parseInt(drop.style.top) + 8) + "px";
            if(parseInt(drop.style.top) > window.innerHeight) drop.style.top = "-20px";
        }, 20);
        
        setTimeout(() => { clearInterval(fall); drop.remove(); }, 10000);
    }
}

// --- CANDLE & CAT ---
function toggleCandle() {
    document.getElementById('candle').classList.toggle('lit');
}

document.getElementById('cat').onclick = () => {
    alert("The white cat meows. Her blue eyes track a butterfly.");
};

// --- BOOKS & GAMES ---
function openBook(type) {
    const content = document.getElementById('bookContent');
    document.getElementById('bookWorld').classList.add('active');
    
    if(type === 'ballet') {
        content.innerHTML = `<h3>The Ballerina</h3><div id='dancer' style='font-size:60px; cursor:pointer;'>💃</div><p>Click her to dance!</p>`;
        const d = document.getElementById('dancer');
        d.onclick = () => d.style.transform = `rotate(${Math.random()*360}deg) scale(1.2)`;
    } else {
        content.innerHTML = `<h3>Landscapes</h3><p>You see a painted world of ${weather} hills.</p>`;
    }
}

function closeBook() {
    document.getElementById('bookWorld').classList.remove('active');
}
