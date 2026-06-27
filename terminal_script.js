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
      help: `<span class="terminal-cyan">Available commands:</span>
  <span class="terminal-green">help</span>      — show this list
  <span class="terminal-green">neofetch</span>  — system info
  <span class="terminal-green">about</span>     — about FaLL OS
  <span class="terminal-green">clear</span>     — clear terminal
  <span class="terminal-green">date</span>      — current date and time`,

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
        printLine(`<span style="color:#ff4444;">command not found: ${cmd}</span> — type <span class="terminal-cyan">help</span>`);
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
