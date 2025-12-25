let startTime;
let totalDistraction = 0;
let sessions = 0;
let timerInterval;

function startDistraction() {
  startTime = Date.now();
  document.getElementById("message").textContent =
    "⏳ Distraction tracking started";

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  let seconds = Math.floor((Date.now() - startTime) / 1000);
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  document.getElementById("timer").textContent =
    `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function stopDistraction() {
  clearInterval(timerInterval);

  let duration = Math.floor((Date.now() - startTime) / 1000);
  totalDistraction += duration;
  sessions++;

  document.getElementById("message").textContent =
    `⚠ You were distracted for ${Math.floor(duration / 60)} minutes`;

  updateSummary();
}

function updateSummary() {
  document.getElementById("summary").textContent =
    `Total distraction: ${Math.floor(totalDistraction / 60)} minutes | Sessions: ${sessions}`;
}
