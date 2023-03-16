var initialMin = 25;
var initialSec = 00;
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
var sec = initialSec;
var clockTick = 200;
var pomodoroMoment = true;
var pomodoroCounter = 1;
var additionalRest = false;

window.onload = function() {
    Notification.requestPermission();    
};
function renderClock(m , s){
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById("clock").innerHTML = m + ":" + s;
}
function renderTitle(){
    if(pomodoroMoment){
        document.getElementById("title").innerHTML = "Pomodoro";
    }else{
        document.getElementById("title").innerHTML = "Pausa";
    }
}
function renderCounter(n){
    document.getElementById("counter").innerHTML = "Numero de pomodoros da sessao: " + n;
}
function openEdit(){
    display(editDiv, "block");
    display(editBtn, "none");
    display(saveBtn, "none");
}
function save(){
    let editMin = document.getElementById("min").value;
    let editSec = document.getElementById("sec").value;
    if(editMin , editSec  != 0 ){
        initialMin = editMin;
        initialSec = editSec;
        renderClock(initialMin, initialSec);
        edited = true;
    }    
    display(editDiv, "none");
    display(editBtn, "inline");
    display(saveBtn, "inline");
}
function reset(){
    if(pomodoroMoment){
        clearInterval(pomodoroInterval);
        
    }else{
        clearInterval(restInterval);
        
    }
    initialMin = 25;
    initialSec = 00;
    document.getElementById("min").value = 0;
    document.getElementById("sec").value = 0;
    renderClock(initialMin, initialSec);

    display(editBtn, "inline");
    display(saveBtn, "inline");
    display(resetBtn, "none");
    display(pauseBtn, "none");
    display(resumeBtn, "none");

    renderTitle();
}
function pause(){
    clearInterval(pomodoroInterval);
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "inline";
}
function resume(){
    pomodoroInterval = setInterval(pomodoroTimer, clockTick);
    pauseBtn.style.display = "inline";
    resumeBtn.style.display = "none";
}
function start(){
    min = initialMin;
    sec = initialSec;
    if(!edited || sec <= 0){
        min--
        sec = 59;
        renderClock(min, sec);
    }
    display(editBtn, "none");
    display(saveBtn, "none");
    display(resetBtn, "inline");
    display(pauseBtn, "inline");
    pomodoroMoment = true
    pomodoroInterval = setInterval(pomodoroTimer, clockTick);
}
function pomodoro(){
        pomodoroMoment = false
        clockNotification("Hora da Pausa");
        pomodoroCounter++;
        console.log("entrou no pomodoro")
        if(additionalRest){
            min = 2;
        }else{
            min = 1;
        }
}
function rest(){
        pomodoroMoment = true;
        clockNotification("Hora do Pomodoro");
        min = initialMin;
        sec = initialSec;
        console.log("entrou no rest")
        if(additionalRest){
            additionalRest = false;
            pomodoroCounter = 1;
        }
        if(pomodoroCounter == 4){
            openAdditionalRest();
        }
}
function pomodoroTimer(){
    if(sec <= 0 && min <= 0){
        bell.play();
        if(pomodoroMoment){
            pomodoro();
        }else{
            rest();
        }
        renderTitle();
        renderClock(min, sec);   
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