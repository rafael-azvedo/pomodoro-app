var min = 25;
var sec = 00;

function renderClock(m , s){
    document.getElementById("clock").innerHTML = m + "m " + s + "s";
}

function start(){
    min--;
    renderClock(min, sec);
}
console.log("teste btn")