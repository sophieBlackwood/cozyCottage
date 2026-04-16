const fade=document.getElementById("fade");

/* SCENE SWITCH */
function setScene(id){
fade.style.opacity=1;

setTimeout(()=>{
document.querySelectorAll(".scene").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
fade.style.opacity=0;
document.getElementById("game").classList.remove("entering");
},700);
}

/* 🚪 CINEMATIC COTTAGE ENTRY */
document.querySelector(".cottage-wrap").onclick=()=>{

// camera push forward
document.getElementById("game").classList.add("entering");

// fog intensifies briefly (illusion of passing through air)
document.body.style.filter="blur(1px)";

setTimeout(()=>{
setScene("inside");
document.body.style.filter="none";
},800);
};

/* SKY SYSTEM */
let time=0;

function sky(){
const game=document.getElementById("game");
time+=0.0008;if(time>1)time=0;

const sun=document.getElementById("sun");
const moon=document.getElementById("moon");
const glow=document.querySelector(".sky-glow");

let x=10+time*80;
let y=Math.sin(time*Math.PI)*-40+60;

sun.style.left=x+"%";
sun.style.top=y+"%";

moon.style.left=(100-x)+"%";
moon.style.top=(100-y)+"%";

let night=Math.max(0,Math.sin(time*Math.PI*2));

game.style.filter=`brightness(${1-night*.6}) saturate(${1-night*.3})`;
moon.style.opacity=night;
glow.style.opacity=night;

requestAnimationFrame(sky);
}
sky();

/* LEAVES */
function leaf(){
let c=document.getElementById("leaf-container");
let l=document.createElement("div");
l.className="leaf";
l.style.left=Math.random()*100+"vw";
l.style.animationDuration=5+Math.random()*5+"s";
c.appendChild(l);
setTimeout(()=>l.remove(),10000);
}
setInterval(leaf,1200);

/* WEATHER */
let rainInt;

function rain(){
let b=document.getElementById("rainBox");
rainInt=setInterval(()=>{
let d=document.createElement("div");
d.className="rain-drop";
d.style.left=Math.random()*window.innerWidth+"px";
d.style.top="-20px";
b.appendChild(d);

let f=setInterval(()=>{
d.style.top=(parseInt(d.style.top)+10)+"px";
if(parseInt(d.style.top)>window.innerHeight){d.remove();clearInterval(f);}
},16);
},120);
}

function stopRain(){
clearInterval(rainInt);
document.getElementById("rainBox").innerHTML="";
}

setInterval(()=>{
let m=["sunny","rainy","windy"][Math.random()*3|0];
stopRain();
document.getElementById("game").classList.remove("windy");
if(m=="rainy")rain();
if(m=="windy")document.getElementById("game").classList.add("windy");
},20000);
