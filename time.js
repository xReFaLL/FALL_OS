function clockTime() {
    var Time = new Date().toLocaleString();
    var timetext= document.querySelector("#clock"); 
    timetext.innerHTML = Time
    }
    setInterval(clockTime, 999);
    clockTime()