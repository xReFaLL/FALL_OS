//Time Function
function clockTime() {
    var Time = new Date().toLocaleString();
    var timetext= document.querySelector("#clock"); 
    timetext.innerHTML = Time
    }
    setInterval(clockTime, 999);
    clockTime()


var highestZ = 1000;
function focusWindow(element) {
  highestZ++;
  element.style.zIndex = highestZ;
}

function toggleFullscreen(windowElement) {
  if (windowElement.dataset.fullscreen === "true") {
    windowElement.style.width = "";
    windowElement.style.height = "";
    windowElement.style.top = "";
    windowElement.style.left = "";
    windowElement.style.borderRadius = "16px";
    windowElement.dataset.fullscreen = "false";
    windowElement.classList.remove("is-fullscreen");
  } else {
    windowElement.style.width = "100vw";
    windowElement.style.height = "calc(100vh - 48px)";
    windowElement.style.top = "0";
    windowElement.style.left = "0";
    windowElement.style.borderRadius = "0";
    windowElement.dataset.fullscreen = "true";
    windowElement.classList.add("is-fullscreen");
  }
}


//Window function
dragElement(document.getElementById("window"));  




function dragElement(element) {

  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  
  if (document.getElementById(element.id + "header")) {

    
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
 

    element.onmousedown = startDragging;
  }
   element.addEventListener("mousedown", function() {
    focusWindow(element);
  });

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.transition = "none";
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
    element.style.transition = ""; 
  }
}




//
var welcomeScreen = document.getElementById("window");

function openWindow(element) {
  element.style.display = "block";
  element.style.pointerEvents = "all";
  requestAnimationFrame(function() {
    element.style.opacity = "1";
  });
}

function closeWindow(element) {
  element.style.opacity = "0";
  element.style.pointerEvents = "none";
  setTimeout(function() { element.style.display = "none"; }, 300);
}

function hideWindow(element) {
  element.style.opacity = "0";
  element.style.pointerEvents = "none";
  setTimeout(function() { element.style.display = "none"; }, 300);
}

function killWindow(element) {
  element.style.opacity = "0";
  element.style.pointerEvents = "none";
  setTimeout(function() {
    element.style.display = "none";
    element.dataset.fullscreen = "false";
    element.style.width = "";
    element.style.height = "";
    element.style.top = "";
    element.style.left = "";
    element.style.borderRadius = "16px";
    element.classList.remove("is-fullscreen");
  }, 300);
}




document.getElementById("welcomeclose").addEventListener("click", function() { killWindow(document.getElementById("window")); });
document.getElementById("welcomehide").addEventListener("click", function() { hideWindow(document.getElementById("window")); });
document.getElementById("welcomefullscreen").addEventListener("click", function() { toggleFullscreen(document.getElementById("window")); });

document.getElementById("welcomeopen").addEventListener("click", function() {
  openWindow(document.getElementById("window"));
});


//Opening window setup
var selectedIcon = undefined;

function selectIcon(element) {
  if (selectedIcon && selectedIcon !== element) {
    deselectIcon(selectedIcon);
  }
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    var windowId = element.dataset.app;
    var windowToOpen = document.getElementById(windowId);
    if (windowToOpen) {
      openWindow(windowToOpen);
    }
  } else {
    selectIcon(element);
  }
}


//Barca app window setup
dragElement(document.getElementById("window-barca"));

document.getElementById("barcaclose").addEventListener("click", function() { killWindow(document.getElementById("window-barca")); });
document.getElementById("barcahide").addEventListener("click", function() { hideWindow(document.getElementById("window-barca")); });
document.getElementById("barcafullscreen").addEventListener("click", function() { toggleFullscreen(document.getElementById("window-barca")); });  

var appIcon = document.getElementById("app");
appIcon.addEventListener("click", function() {
  handleIconTap(appIcon);
});


fetch("./barca_content.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("barca_content_place").innerHTML = html;
  });


//Music app window setup
dragElement(document.getElementById("window-music"));


var musicIcon = document.getElementById("music-app");
musicIcon.addEventListener("click", function() {
  handleIconTap(musicIcon);
});

  const songs = [
  { title: "We Are One (Ole Ola)",   author: "Pitbull, Jennifer Lopez, Claudia Leitte",   cover: "./resonant/covers/we_are_one.png", audio: "./resonant/audios/we_are_one.mp3" },
  { title: "Azizam", author: "Ed Sheeran", cover: "./resonant/covers/Azizam_Cover.jpg", audio: "./resonant/audios/Azizam_Single_Track_SpotiDost.mp3" },
  { title: "Baby Doll", author: "Dominic Fike", cover: "./resonant/covers/Babydoll_Cover.jpg", audio: "./resonant/audios/Babydoll_Single_Track_SpotiDost.mp3" },
  { title: "Bolide Noir", author: "Central Cee, JRK 19", cover: "./resonant/covers/Bolide_Noir_Cover.jpg", audio: "./resonant/audios/Bolide_Noir_Single_Track_SpotiDost.mp3" },
  { title: "On The Floor", author: "Jennifer Lopez, Pitbull", cover: "./resonant/covers/On_The_Floor_Cover.jpg", audio: "./resonant/audios/On_The_Floor_Single_Track_SpotiDost.mp3" },
  { title: "Phantom", author: "EsDeeKid, Rico Ace", cover: "./resonant/covers/Phantom_Cover.jpg", audio: "./resonant/audios/Phantom_Single_Track_SpotiDost.mp3" },
  { title: "Rain Dance", author: "Dave, Tems", cover: "./resonant/covers/Raindance_feat._Tems_Cover.jpg", audio: "./resonant/audios/Raindance_feat._Tems_Single_Track_SpotiDost.mp3" },
  { title: "They Don't Care About Us", author: "Michael Jackson", cover: "./resonant/covers/They_Dont_Care_About_Us_Cover.jpg", audio: "./resonant/audios/They_Dont_Care_About_Us_Single_Track_SpotiDost.mp3" },
  { title: "WAGWAN", author: "Central Cee", cover: "./resonant/covers/WAGWAN_Cover.jpg", audio: "./resonant/audios/WAGWAN_Single_Track_SpotiDost.mp3" },
  { title: "Welcome To The Black Parade", author: "My Chemical Romance", cover: "./resonant/covers/Welcome_to_the_Black_Parade_Cover.jpg", audio: "./resonant/audios/Welcome_to_the_Black_Parade_Single_Track_SpotiDost.mp3" },
  { title: "Godzilla", author: "Eminem, Juice WRLD", cover: "./resonant/covers/Godzilla_feat._Juice_WRLD_Cover.jpg", audio: "./resonant/audios/Godzilla_feat._Juice_WRLD_Single_Track_SpotiDost.mp3" },
  { title: "Malcom In The Middle", author: "Malcom Todd", cover: "./resonant/covers/Malcolm_In_The_Middle_Cover.jpg", audio: "./resonant/audios/Malcolm_In_The_Middle_Single_Track_SpotiDost.mp3" },
  { title: "Let It Happen", author: "Tame Impala", cover: "./resonant/covers/Let_It_Happen_Cover.jpg", audio: "./resonant/audios/Let_It_Happen_Single_Track_SpotiDost.mp3" },
  { title: "FE!N",   author: "Travis Scott, Playboi Carti",   cover: "./resonant/covers/FEIN_Cover.jpg", audio: "./resonant/audios/FEN_feat._Playboi_Carti_Single_Track_SpotiDost.mp3" },
];

fetch("./music.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("music_content_place").innerHTML = html;

    const list        = document.getElementById("songlist");
    const infoButton  = document.getElementById("info");
    const panel       = document.getElementById("song-panel");
    const audio       = document.getElementById("audio-player");
    const cover       = document.getElementById("now-playing-cover");
    const npTitle     = document.getElementById("now-playing-title");
    const npAuthor    = document.getElementById("now-playing-author");
    const playIcon    = document.getElementById("play-icon");
    const playButton  = document.getElementById("stop_button");
    const skipButton  = document.getElementById("skip_button");
    const returnButton = document.getElementById("return_button");
    const progressBar  = document.getElementById("progress-bar");
    const currentTime  = document.getElementById("current-time");
    const totalTime    = document.getElementById("total-time");
    
    let currentIndex = 0;

    function applyDominantColor(imageSrc) {
      const image = new Image();
      image.crossOrigin = "anonymous";   
      image.onload = function() {        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          r += pixels[i];
          g += pixels[i + 1];
          b += pixels[i + 2];
          count++;
        }
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const bgColor = `rgba(${r}, ${g}, ${b}, 0.35)`;
          const buttonColor = `rgb(${r}, ${g}, ${b})`;
          document.querySelector(".music-container").style.background = bgColor;
          document.getElementById("stop_button").style.backgroundColor = buttonColor;
      };

      image.src = imageSrc;  
    }

function playSong(index) {
      if (index < 0) index = songs.length - 1;
      if (index >= songs.length) index = 0;
      currentIndex = index;

      const data = songs[index];
      audio.src = data.audio;
      audio.play();

      cover.src = data.cover;
      npTitle.textContent = data.title;
      npAuthor.textContent = data.author;
      playIcon.src = "./icons/pause.png";
      applyDominantColor(data.cover);
    }
    
    let listHTML = "";
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      listHTML += `
        <li class="song" data-index="${i}">
          <img class="song-cover" src="${song.cover}">
          <div class="song-text">
            <span class="title">${song.title}</span>
            <span class="authour">${song.author}</span>
          </div>
        </li>
      `;
    }
    list.innerHTML = listHTML;

   
    infoButton.addEventListener("click", function() {
      panel.style.display = (panel.style.display === "none") ? "block" : "none";
    });

    
    list.addEventListener("click", function(event) {
      const song = event.target.closest(".song");
      if (!song) return;
      const index = Number(song.dataset.index);
      playSong(index);
      panel.style.display = "none";
    });

   
    playButton.addEventListener("click", function() {
      if (!audio.src) {           
        playSong(currentIndex);
        return;
      }
      if (audio.paused) {         
        audio.play();
        playIcon.src = "./icons/pause.png";
      } else {                    
        audio.pause();
        playIcon.src = "./icons/play.png";
      }
    });


    skipButton.addEventListener("click", function()   { playSong(currentIndex + 1); });
    returnButton.addEventListener("click", function() { playSong(currentIndex - 1); });


audio.addEventListener("ended", function() { playSong(currentIndex + 1); });

    const formatTime = function(s) {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return m + ":" + (sec < 10 ? "0" : "") + sec;
    };

    audio.addEventListener("timeupdate", function () {
      if (!audio.duration) return;
      progressBar.value = (audio.currentTime / audio.duration) * 100;
      currentTime.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", function () {
      totalTime.textContent = formatTime(audio.duration);
      progressBar.value = 0;
    });

    progressBar.addEventListener("input", function () {
      audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

  })
  .catch(error => {
    console.log("Error", error);
  });


document.getElementById("musicclose").addEventListener("click", function() {
  var audio = document.getElementById("audio-player");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  killWindow(document.getElementById("window-music"));
});

document.getElementById("musichide").addEventListener("click", function() {
  hideWindow(document.getElementById("window-music"));
});

document.getElementById("musicfullscreen").addEventListener("click", function() {
  toggleFullscreen(document.getElementById("window-music"));
});


  // Vela browser app
dragElement(document.getElementById("window-browser"));

document.getElementById("browserclose").addEventListener("click", function() { killWindow(document.getElementById("window-browser")); });
document.getElementById("browserhide").addEventListener("click", function() { hideWindow(document.getElementById("window-browser")); });
document.getElementById("browserfullscreen").addEventListener("click", function() { toggleFullscreen(document.getElementById("window-browser")); });

var browserIcon = document.getElementById("browser-app");
browserIcon.addEventListener("click", function () {
  handleIconTap(browserIcon);
});

fetch("./browser.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("browser_content_place").innerHTML = html;

    const urlInput = document.getElementById("browser-url-input");
    const goBtn = document.getElementById("browser-go-btn");

function openURL(raw) {
  console.log("CLICK reçu, valeur:", raw);
  var url = raw.trim();
  if (!url) return;
  if (url.startsWith("http://") || url.startsWith("https://") || url.match(/^[\w-]+\.[a-z]{2,}/)) {
    if (!url.startsWith("http")) url = "https://" + url;
    var w = window.open(url, "_blank");
    console.log("window.open retourne:", w);
  } else {
    var w = window.open("https://www.google.com/search?q=" + encodeURIComponent(url), "_blank");
    console.log("window.open retourne:", w);
  }
}

goBtn.addEventListener("click", () => openURL(urlInput.value));
urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") openURL(urlInput.value);
});

document.querySelectorAll(".bookmark").forEach(function(btn) {
  btn.addEventListener("click", () => openURL(btn.dataset.url));
});
  });



  // Notes app
dragElement(document.getElementById("window-notes"));

document.getElementById("notesclose").addEventListener("click", function() { killWindow(document.getElementById("window-notes")); });
document.getElementById("noteshide").addEventListener("click", function() { hideWindow(document.getElementById("window-notes")); });
document.getElementById("notesfullscreen").addEventListener("click", function() { toggleFullscreen(document.getElementById("window-notes")); });

var notesIcon = document.getElementById("notes-app");
notesIcon.addEventListener("click", function () {
  handleIconTap(notesIcon);
});

fetch("./notes.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("notes_content_place").innerHTML = html;

    const titleInput = document.getElementById("note-title-input");
    const noteInput  = document.getElementById("note-input");
    const saveBtn    = document.getElementById("note-save-btn");
    const notesList  = document.getElementById("notes-list");

    let notes = [];
    try {
      notes = JSON.parse(localStorage.getItem("velaNotes")) || [];
    } catch (e) {
      notes = [];
    }

    notes = notes.map(n => typeof n === "string"
      ? { title: "No Title", content: n, date: "" }
      : n);

    function saveNotes() {
      localStorage.setItem("velaNotes", JSON.stringify(notes));
    }

    
    function escapeHTML(str) {
      if (str == null) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    function renderNotes() {
      let listHTML = "";
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        listHTML += `
          <li class="note-item">
            <div class="note-header">
              <span class="note-title">${escapeHTML(note.title)}</span>
              <span class="note-date">${escapeHTML(note.date)}</span>
              <button class="note-delete" data-index="${i}">✕</button>
            </div>
            <span class="note-text">${escapeHTML(note.content)}</span>
          </li>
        `;
      }
      notesList.innerHTML = listHTML;
    }

    saveBtn.addEventListener("click", function () {
      const title   = titleInput.value.trim();
      const content = noteInput.value.trim();
      if (!title && !content) return;

      notes.push({
        title: title || "Sans titre",
        content: content,
        date: new Date().toLocaleString()  
      });

      saveNotes();
      renderNotes();
      titleInput.value = "";
      noteInput.value = "";
    });

    notesList.addEventListener("click", function (event) {
      const btn = event.target.closest(".note-delete");
      if (!btn) return;
      const index = Number(btn.dataset.index);
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    renderNotes();
  });



  // Wallpaper app setup
dragElement(document.getElementById("window-wallpaper"));

document.getElementById("wallpaperclose").addEventListener("click", function() { killWindow(document.getElementById("window-wallpaper")); });
document.getElementById("wallpaperhide").addEventListener("click", function() { hideWindow(document.getElementById("window-wallpaper")); });
document.getElementById("wallpaperfullscreen").addEventListener("click", function() { toggleFullscreen(document.getElementById("window-wallpaper")); });

var wallpaperIcon = document.getElementById("wallpaper-app");
wallpaperIcon.addEventListener("click", function() {
  handleIconTap(wallpaperIcon);
});

var thumbs = document.querySelectorAll(".wallpaperThumb");
thumbs.forEach(function(thumb) {
  thumb.addEventListener("click", function() {
    var newBg = thumb.dataset.bg;
    document.querySelector(".background").src = newBg;
    localStorage.setItem("fallos-wallpaper", newBg);
  });
});
var savedWallpaper = localStorage.getItem("fallos-wallpaper");
if (savedWallpaper) {
  document.querySelector(".background").src = savedWallpaper;
}

document.getElementById("musicclose").addEventListener("click", function() {
  var audio = document.getElementById("audio-player");
  if (audio) { audio.pause(); audio.currentTime = 0; }
  killWindow(document.getElementById("window-music"));
});

document.getElementById("musichide").addEventListener("click", function() {
  hideWindow(document.getElementById("window-music"));
});




// Sidebar wiring

document.getElementById("sidebar-music").addEventListener("click", function() {
  handleIconTap(document.getElementById("music-app"));
});

document.getElementById("sidebar-browser").addEventListener("click", function() {
  handleIconTap(document.getElementById("browser-app"));
});

document.getElementById("sidebar-notes").addEventListener("click", function() {
  handleIconTap(document.getElementById("notes-app"));
});



// Terminal app
dragElement(document.getElementById("window-terminal"));

document.getElementById("terminalclose").addEventListener("click", function() { killWindow(document.getElementById("window-terminal")); });
document.getElementById("terminalhide").addEventListener("click", function() { hideWindow(document.getElementById("window-terminal")); });
document.getElementById("terminalfullscreen").addEventListener("click", function() { toggleFullscreen(document.getElementById("window-terminal")); });

var terminalIcon = document.getElementById("terminal-app");
terminalIcon.addEventListener("click", function() {
  handleIconTap(terminalIcon);
});

fetch("./terminal.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("terminal_content_place").innerHTML = html;

    const output = document.getElementById("terminal-output");
    const input  = document.getElementById("terminal-input");

    const GOAT = `
<span class="terminal-white">
    /\\   /\\
   (  o o  )
   =( Y )=
    )     (
   (_)-(_)-
</span>`;

    const NEOFETCH = `
<span class="terminal-cyan">        .        .        </span>  <span class="terminal-green">user</span><span class="terminal-white">@</span><span class="terminal-green">fallos</span>
<span class="terminal-cyan">      .MMMMM.      </span>  <span class="terminal-white">-----------</span>
<span class="terminal-cyan">    .MMMMMMMMM.    </span>  <span class="terminal-green">OS</span><span class="terminal-white">: FaLL OS v1.0</span>
<span class="terminal-cyan">   .MM.     .MM.   </span>  <span class="terminal-green">Built by</span><span class="terminal-white">: Fares</span>
<span class="terminal-cyan">  .MMMMMMMMMMMMM.  </span>  <span class="terminal-green">Stack</span><span class="terminal-white">: HTML CSS JS</span>
<span class="terminal-cyan">  .MM.       .MM.  </span>  <span class="terminal-green">Apps</span><span class="terminal-white">: 7</span>
<span class="terminal-cyan">   .MMMMMMMMMMM.   </span>  <span class="terminal-green">Context</span><span class="terminal-white">: StarDance</span>
<span class="terminal-cyan">     .MMMMMMM.     </span>  <span class="terminal-green">Shell</span><span class="terminal-white">: FaLL Terminal</span>
`;

    const commands = {
      help: `<span class="terminal-yellow">Available commands:</span>
  <span class="terminal-green">help</span><span class="terminal-white">      — show this list</span>
  <span class="terminal-green">neofetch</span><span class="terminal-white">  — system info</span>
  <span class="terminal-green">about</span><span class="terminal-white">     — about FaLL OS</span>
  <span class="terminal-green">clear</span><span class="terminal-white">     — clear terminal</span>
  <span class="terminal-green">date</span><span class="terminal-white">      — current date and time</span>`,


      neofetch: NEOFETCH,

      about: `<span class="terminal-white">FaLL OS — A browser-based WebOS built in vanilla HTML, CSS and JS.
Created for the StarDance event by Fares.
Features draggable windows, a music player, web launcher,
notes, wallpaper changer, and this terminal.</span>`,

      date: `<span class="terminal-white">${new Date().toLocaleString()}</span>`,

      fares: `<span class="terminal-green">Yes! That's my name!!</span>`,

      barca: `<span style="color:#004D98;font-weight:bold;">Visca Barça</span> <span class="terminal-white">i</span> <span style="color:#FFED00;font-weight:bold;">Visca Catalunya!</span> 🔵🔴`,

      messi: `<span class="terminal-green">🐐 GOAT 🐐</span>${GOAT}`,

      twitter: `<span class="terminal-cyan">@ReFaLLTamaKi</span> — <span class="terminal-white">https://twitter.com/ReFaLLTamaKi</span>`,

      ronaldo: `<span style="color:#ff4444;">statpad fraud</span>`,

      fallos: `<span class="terminal-yellow">Resetting FaLL OS...</span>
<span class="terminal-white">Clearing notes...</span>
<span class="terminal-white">Restoring default wallpaper...</span>
<span class="terminal-green">Done. Refresh the page to complete the reset.</span>`
    };

    function printLine(html) {
      const line = document.createElement("div");
      line.classList.add("terminal-line");
      line.innerHTML = html;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function printPrompt(cmd) {
      printLine(`<span class="terminal-green">fallos@terminal</span><span class="terminal-white">:</span><span class="terminal-cyan">~</span><span class="terminal-white">$ ${cmd}</span>`);
    }

    function runCommand(cmd) {
      cmd = cmd.trim().toLowerCase();
      printPrompt(cmd);

      if (cmd === "") return;

      if (cmd === "clear") {
        output.innerHTML = "";
        return;
      }

      if (cmd === "date") {
        printLine(`<span class="terminal-white">${new Date().toLocaleString()}</span>`);
        return;
      }

      if (cmd === "fallos") {
        localStorage.removeItem("velaNotes");
        localStorage.removeItem("fallos-wallpaper");
        document.querySelector(".background").src = "./backgrounds/background.gif";
        printLine(commands.fallos);
        return;
      }

      if (commands[cmd]) {
        printLine(commands[cmd]);
      } else {
        printLine(`<span style="color:#ff4444;">command not found: ${cmd}</span><span class="terminal-white">   — type </span><span class="terminal-cyan">help</span>`);
      }
    }

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        runCommand(input.value);
        input.value = "";
      }
    });

    // focus input when clicking anywhere in terminal
    document.getElementById("terminal_content_place").addEventListener("click", function() {
      input.focus();
    });
  });




  document.getElementById("sidebar-canvas").addEventListener("click", function() {
  handleIconTap(document.getElementById("wallpaper-app"));
});

document.getElementById("sidebar-terminal").addEventListener("click", function() {
  handleIconTap(document.getElementById("terminal-app"));
});