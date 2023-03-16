var initialMin = 25;
var sec = 00;
var bell = document.getElementById("bell");
var editDiv = document.getElementById("edit");
var editBtn = document.getElementById("editBtn");
var saveBtn = document.getElementById("startBtn");
var resetBtn = document.getElementById("resetBtn");
var edited = false;
var min = initialMin;
var clockTick = 200;

window.onload = function() {
    Notification.requestPermission();    
};
function renderClock(m , s){
    document.getElementById("clock").innerHTML = m + "m " + s + "s";
}
function renderTitle(title){
    document.getElementById("title").innerHTML = title;
}
function edit(){
    editDiv.style.display = "block";
    editBtn.style.display = "none";
    saveBtn.style.display = "none";
}
function save(){
    let editMin = document.getElementById("min").value;
    let editSec = document.getElementById("sec").value;
    if(editMin == 0 && editSec == 0){
        editDiv.style.display = "none";
        editBtn.style.display = "inline";
        saveBtn.style.display = "inline"; 
    }else{
        initialMin = editMin;
        sec = editSec;
    }
    renderClock(initialMin, sec);
    edited = true;
    editDiv.style.display = "none";
    editBtn.style.display = "inline";
    saveBtn.style.display = "inline";
}
function reset(){
    if(pomodoroInterval){
        clearInterval(pomodoroInterval);
    }else{
        clearInterval(restInterval)
    }
    initialMin = 25;
    sec = 00;
    document.getElementById("min").value = 0;
    document.getElementById("sec").value = 0;
    renderClock(initialMin, sec);
    editBtn.style.display = "inline";
    saveBtn.style.display = "inline";
    resetBtn.style.display = "none";
}
function start(){
    if(!edited){
        initialMin--
        min = initialMin;
        sec = 59;
        renderTitle("Pomodoro");
        renderClock(initialMin, sec);
        pomodoroInterval = setInterval(pomodoroClock, clockTick);
        editBtn.style.display = "none";
        saveBtn.style.display = "none";
        resetBtn.style.display = "inline";
    }else if(sec <= 0){
        initialMin--
        min = initialMin;
        sec = 59;
        renderTitle("Pomodoro");
        pomodoroInterval = setInterval(pomodoroClock, clockTick);
        editBtn.style.display = "none";
        saveBtn.style.display = "none";
        resetBtn.style.display = "inline";
    }else{
        min = initialMin;
        renderTitle("Pomodoro");
        pomodoroInterval = setInterval(pomodoroClock, clockTick);
        editBtn.style.display = "none";
        saveBtn.style.display = "none";
        resetBtn.style.display = "inline";
    }
}
function pomodoroClock(){
    if(sec <= 0 && min <= 0){
        bell.play();
        clockNotification("Hora da Pausa");
        renderTitle("Pausa");
        clearInterval(pomodoroInterval);
        min = 5;
        restInterval = setInterval(restClock, clockTick);
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
        clockNotification("Hora do Pomodoro");
        renderTitle("Pomodoro");
        clearInterval(restInterval);
        min = initialMin;
        pomodoroInterval = setInterval(pomodoroClock, clockTick)
    }else if(sec <= 0){
        min--;
        sec = 59;
        renderClock(min, sec);
    }else{
        sec--;
        renderClock(min, sec);
    }
}
function clockNotification(m){
    if( typeof Notification !== "undefined" && Notification.permission !=  "denied"){
            var notification = new Notification("Pomodoro", {
                icon: 'img/tomato.png',
                body: m
            });
            notification.onclick = () => { 
                   notification.close();
                   window.parent.focus();
            }
    }
}