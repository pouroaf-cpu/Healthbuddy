// ===== Config =====
const APPS_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyZjNe3fdWAeZ5HyOv6rNPlOctWNppPZC53toOmqqAvVU9g8bODonO-KightPXxg2SV/exec'; // <- put your URL here

// ===== Elements =====
const form = document.getElementById("evaluationForm");
const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const resultPanel = document.getElementById("resultPanel");
const resultSummary = document.getElementById("resultSummary");
const resultDetails = document.getElementById("resultDetails");
const restartBtn = document.getElementById("restartBtn");

let formStepIndex = 0;

// ===== Step navigation + progress =====
function updateFormSteps() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === formStepIndex);
  });

  // progress from 0% on first step to 100% on final step
  const pct = (formStepIndex / (formSteps.length - 1)) * 100;
  progress.style.width = pct + "%";
}

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (formStepIndex < formSteps.length - 1) {
      formStepIndex++;
      updateFormSteps();
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (formStepIndex > 0) {
      formStepIndex--;
      updateFormSteps();
    }
  });
});

// ===== Evaluation logic =====
function evaluate(data) {
  let score = 0;
  const flags = [];

  const protein = Number(data.protein || 0);
  const caffeine = Number(data.caffeine || 0);
  const sleepHours = Number(data.sleepHours || 0);
  const meds = (data.medications || "").trim();

  // Lifestyle
  if (data.smoking === "yes") { score += 2; flags.push("Smoking can negatively impact hormones."); }
  if (data.alcohol === "yes") { score += 1; flags.push("Alcohol may reduce testosterone and impair sleep quality."); }
  if (protein && protein < 100) { score += 1; flags.push("Protein intake below ~100g may hinder muscle maintenance for many adults."); }
  if (caffeine > 3) { score += 1; flags.push("High caffeine (>3/day) can disrupt sleep & stress hormones."); }

  // Sleep & recovery
  if (sleepHours && sleepHours < 7) { score += 2; flags.push("Sleeping <7 hours commonly reduces testosterone and recovery."); }
  if (data.rested === "no") { score += 1; flags.push("Not waking rested suggests poor recovery and hormone balance."); }

  // Physical symptoms
  if (data.fatigue === "yes") { score += 2; flags.push("Frequent fatigue reported."); }
  if (data.muscle === "yes") { score += 2; flags.push("Difficulty maintaining/building muscle."); }
  if (data.bodyFat === "yes") { score += 1; flags.push("Higher body fat noted."); }
  if (data.hair === "yes") { score += 1; flags.push("Hair changes reported."); }

  // Mood
  if (data.mood === "low") { score += 1; flags.push("Low mood reported."); }
  if (data.stress === "moderate") { score += 1; flags.push("Moderate stress reported."); }
  if (data.stress === "high") { score += 2; flags.push("High stress reported."); }
  if (data.motivation === "no") { score += 1; flags.push("Low day-to-day motivation."); }

  // Sexual health
  if (data.erectile === "yes") { score += 3; flags.push("Erectile difficulties noted."); }
  if (data.morningErections === "no") { score += 2; flags.push("Lack of morning erections."); }

  // Medical
  if (data.hormonePanel === "yes") {
    flags.push("You reported a recent hormone panel—compare these results to that lab if available.");
  }
  if (meds.length > 0) {
    flags.push("Medications/supplements may influence hormones—review with a clinician.");
  }

  // Banding
  let band;
  if (score <= 3) {
    band = { label: "Low Concern", msg: "Your answers suggest a low likelihood of hormone-related issues." };
  } else if (score <= 8) {
    band = { label: "Moderate Concern", msg: "Some factors suggest possible hormone imbalance. Tighten sleep, protein, and stress routines." };
  } else {
    band = { label: "High Concern", msg: "Multiple indicators present. Consider a medical consult and a comprehensive lab panel." };
  }

  return { score, flags, band };
}

// ===== Webhook submission =====
function submitToSheet(payload) {
  // Fire-and-forget to avoid CORS errors (opaque response is fine)
  try {
    fetch(APPS_SCRIPT_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (_) {
    // Ignore; UI still proceeds
  }
}

// ===== Submit handler: build results view + send to Sheets =====
form.addEventListener("submit", e => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  const { score, flags, band } = evaluate(data);

  // Build payload for Sheets
  const payload = {
    ...data,
    score,
    bandLabel: band.label
  };
  submitToSheet(payload); // async, non-blocking

  // Update UI
  resultSummary.textContent = `Overall: ${band.label} (score ${score})`;
  resultDetails.innerHTML = `
    <p>${band.msg}</p>
    ${flags.length ? `<ul>${flags.map(f => `<li>${f}</li>`).join("")}</ul>` : "<p>No notable risk flags detected based on your answers.</p>"}
    <p style="font-size: 0.9em; color:#555;">
      This is an educational screening, not medical advice. If symptoms persist, talk to a qualified clinician.
    </p>
  `;

  resultPanel.classList.remove("hidden");
  form.classList.add("hidden");
});

// ===== Restart: return to step 1 and reset progress =====
restartBtn.addEventListener("click", () => {
  resultPanel.classList.add("hidden");
  form.classList.remove("hidden");
  form.reset();
  formStepIndex = 0;
  updateFormSteps();
});

// ===== Init =====
updateFormSteps();
