var initialMin = 25;
var sec = 00;
var bell = document.getElementById("bell");
var editDiv = document.getElementById("edit");
var additionalRestDiv = document.getElementById("additionalRest");
var editBtn = document.getElementById("editBtn");
var saveBtn = document.getElementById("startBtn");
var resetBtn = document.getElementById("resetBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resumeBtn = document.getElementById("resumeBtn");
var restBtnYes = document.getElementById("restBtnYes");
var restBtnNo = document.getElementById("restBtnNo");
var edited = false;
var min = initialMin;
var clockTick = 1000;
var moment = " ";
var pomodoroCounter = 1;
var additionalRest = false;

window.onload = function() {
    Notification.requestPermission();    
};
function renderClock(m , s){
    document.getElementById("clock").innerHTML = m + "m " + s + "s";
}
function renderTitle(title){
    document.getElementById("title").innerHTML = title;
}
function renderCounter(n){
    document.getElementById("counter").innerHTML = "Numero de pomodoros da sessao: " + n;
}
function edit(){
    display(editDiv, "block");
    display(editBtn, "none");
    display(saveBtn, "none");
}
function save(){
    let editMin = document.getElementById("min").value;
    let editSec = document.getElementById("sec").value;
    if(editMin == 0 && editSec == 0){
        display(editDiv, "none");
        display(editBtn, "inline");
        display(saveBtn, "inline");
    }else{
        initialMin = editMin;
        sec = editSec;
    }
    renderClock(initialMin, sec);
    edited = true;
    display(editDiv, "none");
    display(editBtn, "inline");
    display(saveBtn, "inline");
}
function reset(){
    if(moment == "pomodoro"){
        clearInterval(pomodoroInterval);
        
    }else{
        clearInterval(restInterval);
        
    }
    initialMin = 25;
    sec = 00;
    document.getElementById("min").value = 0;
    document.getElementById("sec").value = 0;
    renderClock(initialMin, sec);

    display(editBtn, "inline");
    display(saveBtn, "inline");
    display(resetBtn, "none");
    display(pauseBtn, "none");
    display(resumeBtn, "none");

    renderTitle("Pomodoro");
}
function pause(){
    if(moment == "pomodoro"){
        clearInterval(pomodoroInterval);
    }else{
        clearInterval(restInterval);
    }
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "inline";
}
function resume(){
    if(moment == "pomodoro"){
        pomodoroInterval = setInterval(pomodoroClock, clockTick);
    }else{
        restInterval = setInterval(restClock, clockTick);
    }
    pauseBtn.style.display = "inline";
    resumeBtn.style.display = "none";
}
function start(){
    min = initialMin;
    if(!edited || sec <= 0){
        min--
        sec = 59;
        renderClock(initialMin, sec);
    }
    display(editBtn, "none");
    display(saveBtn, "none");
    display(resetBtn, "inline");
    display(pauseBtn, "inline");
    renderTitle("Pomodoro");
    moment = "Pomodoro"
    pomodoroInterval = setInterval(pomodoroClock, clockTick);
}
function pomodoroClock(){
    if(sec <= 0 && min <= 0){
        bell.play();
        clockNotification("Hora da Pausa");
        renderTitle("Pausa");
        moment = "rest"
        clearInterval(pomodoroInterval);
        pomodoroCounter++;
        if(additionalRest){
            min = 2;
        }else{
            min = 1;
        }        
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
        moment = "pomodoro";
        renderCounter(pomodoroCounter);
        min = initialMin;
        pomodoroInterval = setInterval(pomodoroClock, clockTick);
        if(additionalRest){
            additionalRest = false;
            pomodoroCounter = 1;
        }
        if(pomodoroCounter == 4){
            openAdditionalRest();
        }     
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
function closeAdditionalRest(){
    additionalRestDiv.style.display = "none";
    pomodoroCounter = 1;
}
function openAdditionalRest(){
    additionalRestDiv.style.display = "block";
}
function addAdditionalRest(){
    additionalRest = true;
    closeAdditionalRest();
}
function display(element, attb){
    element.style.display = attb;
}