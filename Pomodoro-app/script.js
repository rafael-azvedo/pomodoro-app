var min = 25;
var sec = 00;

function renderClock(m , s){
    document.getElementById("clock").innerHTML = m + "m " + s + "s";
}
function renderTitle(title){
    document.getElementById("title").innerHTML = title;
}

function start(){
    min--;
    renderClock(min, sec);
    renderTitle("pomodoro")
}
console.log("teste btn")