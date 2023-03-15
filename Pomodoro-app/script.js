var min = 10;
var sec = 00;
renderClock(min, sec);

function renderClock(m , s){
    document.getElementById("clock").innerHTML = m + "m " + s + "s";
}
function renderTitle(title){
    document.getElementById("title").innerHTML = title;
}
function start(){
    min--;
    sec = 59;
    renderClock(min, sec);
    renderTitle("Pomodoro");
    pomodoroInterval = setInterval(pomodoroClock, 10);
}
function pomodoroClock(){
    if(sec <= 0 && min <= 0){
        renderTitle("Pausa");
        clearInterval(pomodoroInterval);
        min = 5;
        restInterval = setInterval(restClock, 10);
    }else if(sec <= 0){
        min--;
        sec = 59;
        renderClock(min, sec);
    }else{
        sec--;
        renderClock(min, sec);
    }
}
function restClock(){
    if(sec <= 0 && min <= 0){
        renderTitle("Pomodoro");
        clearInterval(restInterval);
        min = 25
        pomodoroInterval = setInterval(pomodoroClock, 10)
    }else if(sec <= 0){
        min--;
        sec = 59;
        renderClock(min, sec);
    }else{
        sec--;
        renderClock(min, sec);
    }
}