var min = 1;
var sec = 00;
renderClock(min, sec);
var bell = document.getElementById("bell");


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
    pomodoroInterval = setInterval(pomodoroClock, 500);
}
function pomodoroClock(){
    if(sec <= 0 && min <= 0){
        bell.play();
        renderTitle("Pausa");
        clearInterval(pomodoroInterval);
        min = 1;
        restInterval = setInterval(restClock, 500);
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
        bell.play();
        renderTitle("Pomodoro");
        clearInterval(restInterval);
        min = 1;
        pomodoroInterval = setInterval(pomodoroClock, 500)
    }else if(sec <= 0){
        min--;
        sec = 59;
        renderClock(min, sec);
    }else{
        sec--;
        renderClock(min, sec);
    }
}