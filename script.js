const fade = document.getElementById('fade');

// SCENE SWITCH
function setScene(id) {
    fade.style.opacity = 1;
    setTimeout(() => {
        document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        fade.style.opacity = 0;
    }, 600);
}

// ENTER HOUSE
document.querySelector('.cottage-wrap')
    .addEventListener('click', () => setScene('inside'));

// TIME
setInterval(() => {
    document.getElementById('game').classList.toggle('night');
}, 25000);

// WEATHER
let rainInterval;

function startRain() {
    const box = document.getElementById('rainBox');
    rainInterval = setInterval(() => {
        let drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * window.innerWidth + "px";
        drop.style.top = "-20px";
        box.appendChild(drop);

        let fall = setInterval(() => {
            drop.style.top = (parseInt(drop.style.top) + 10) + "px";
            if (parseInt(drop.style.top) > window.innerHeight) {
                drop.remove();
                clearInterval(fall);
            }
        }, 16);
    }, 120);
}

function stopRain() {
    clearInterval(rainInterval);
    document.getElementById('rainBox').innerHTML = "";
}

setInterval(() => {
    const modes = ['sunny', 'rainy', 'windy'];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    stopRain();
    document.getElementById('game').classList.remove('windy');

    if (mode === 'rainy') startRain();
    if (mode === 'windy') document.getElementById('game').classList.add('windy');

}, 20000);

// CANDLE
document.getElementById('candle').onclick = () => {
    document.getElementById('candle').classList.toggle('lit');
    document.getElementById('game').classList.toggle('candle-glow');
};

// CAT
document.getElementById('cat').onclick = () => {
    const msg = document.createElement('div');
    msg.innerText = "The cat watches quietly.";
    msg.style.position = "fixed";
    msg.style.bottom = "20px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.background = "white";
    msg.style.padding = "10px";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
};

// BOOK SYSTEM
const books = {
    ballet: {
        title: "The Ballerina",
        content: `
            <div id="lane">
                <div class="hit-zone"></div>
            </div>
            <div id="dancer" class="dancer">💃</div>
            <p id="feedback">Press arrow keys</p>
        `,
        init: () => {

            const lane = document.getElementById('lane');
            const dancer = document.getElementById('dancer');

            const keys = ["ArrowLeft","ArrowUp","ArrowDown","ArrowRight"];
            let notes = [];

            function spawn() {
                let note = document.createElement('div');
                let key = keys[Math.floor(Math.random()*keys.length)];
                note.className = 'note';
                note.dataset.key = key;
                note.innerText = "⬇️";
                note.style.left = Math.random()*80 + "%";
                note.style.top = "-20px";
                lane.appendChild(note);
                notes.push(note);
            }

            function update() {
                notes.forEach((n,i)=>{
                    let y = parseInt(n.style.top);
                    n.style.top = (y+5)+"px";
                    if(y>300){ n.remove(); notes.splice(i,1); }
                });
            }

            window.onkeydown = (e)=>{
                notes.forEach((n,i)=>{
                    let y = parseInt(n.style.top);
                    if(n.dataset.key===e.key && y>220 && y<300){
                        n.remove(); notes.splice(i,1);
                        dancer.style.transform=`rotate(${Math.random()*360}deg)`;
                    }
                });
            };

            setInterval(spawn,1200);
            setInterval(update,30);
        }
    },

    landscape: {
        title: "Landscapes",
        content: `<p>A peaceful painted world.</p>`,
        init: () => {}
    }
};

document.querySelectorAll('.clickable-book').forEach(b=>{
    b.onclick = ()=>{
        let book = books[b.dataset.book];
        setScene('bookWorld');
        let content = document.getElementById('bookContent');
        content.innerHTML = `<h3>${book.title}</h3>${book.content}`;
        setTimeout(book.init,50);
    };
});

document.querySelector('.close-btn').onclick = () => setScene('inside');
