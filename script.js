const addBtn = document.getElementById("addBtn");
const subjectInput = document.getElementById("subjectInput");
const dashboard = document.getElementById("dashboard");
const quote = document.getElementById("quote");

let studyData = JSON.parse(localStorage.getItem("studyData")) || [];

const quotes = [
  "Discipline is stronger than motivation.",
  "Small progress is still progress.",
  "Consistency beats intensity.",
  "Focus today, succeed tomorrow.",
  "Your future depends on what you do now."
];

// Load existing data
window.onload = () => {
  renderSubjects();
  changeQuote();
};

// Add subject
addBtn.addEventListener("click", () => {
  const subject = subjectInput.value.trim();
  if (subject === "") {
    alert("Please enter a subject name");
    return;
  }

  studyData.push({ name: subject, progress: 0 });
  localStorage.setItem("studyData", JSON.stringify(studyData));
  subjectInput.value = "";
  renderSubjects();
});

// Render subjects
function renderSubjects() {
  dashboard.innerHTML = "";

  studyData.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "study-item";

    div.innerHTML = `
      <span>${item.name} – ${item.progress}%</span>
      <div class="progress-bar">
        <div class="progress" style="width:${item.progress}%"></div>
      </div>
      <button onclick="increaseProgress(${index})">+10%</button>
    `;

    dashboard.appendChild(div);
  });
}

// Increase progress
function increaseProgress(index) {
  if (studyData[index].progress < 100) {
    studyData[index].progress += 10;
    if (studyData[index].progress > 100) {
      studyData[index].progress = 100;
    }
    localStorage.setItem("studyData", JSON.stringify(studyData));
    renderSubjects();
  } else {
    alert("Goal already completed! 🎉");
  }
}

// Motivation quote
function changeQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quote.textContent = quotes[random];
  setTimeout(changeQuote, 7000);
}
