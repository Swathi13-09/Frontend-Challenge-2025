let time = 25 * 60;
let timerInterval = null;
let totalTime = 25 * 60;
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("timer").textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setTimer(mins) {
  time = mins * 60;
  totalTime = time;
  updateDisplay();
  document.getElementById("motivationMessage").textContent = "";
}

function startTimer() {
  if (timerInterval) return;
  if (!isRunning) {
    isRunning = true;
    document.getElementById("motivationMessage").textContent = "";
  }

  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      showMotivation("completed");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  if (time > 0 && time < totalTime) {
    showMotivation("stopped");
  }
}

function resetTimer() {
  pauseTimer();
  time = totalTime;
  updateDisplay();

  let btn = document.getElementById("resetBtn");
  btn.classList.add("animate-reset");
  setTimeout(() => btn.classList.remove("animate-reset"), 500);

  document.getElementById("motivationMessage").textContent = "";
}

function showMotivation(status) {
  const msg = document.getElementById("motivationMessage");
  const purpose = document.getElementById("purposeInput").value.trim();

  if (status === "completed") {
    msg.textContent = `✅ Great job, Swathi! You stayed consistent${
      purpose ? " while focusing on " + purpose + "." : "!"
    } Keep the momentum going! 💪`;
  } else if (status === "stopped") {
    msg.textContent = `💭 It's okay to pause${
      purpose ? " your " + purpose : ""
    }. Remember — every small effort matters! Try again stronger 💫`;
  }
}

function changeTheme(theme) {
  const body = document.body;
  body.className = ""; // clear old theme
  if (theme === "black") body.classList.add("black-theme");
  else if (theme === "green") body.classList.add("green-theme");
  else if (theme === "purple") body.classList.add("purple-theme");
}

// Settings toggle
const settingsBtn = document.getElementById("settingsBtn");
const themeMenu = document.getElementById("themeMenu");

settingsBtn.addEventListener("click", () => {
  themeMenu.style.display =
    themeMenu.style.display === "block" ? "none" : "block";
});

updateDisplay();
