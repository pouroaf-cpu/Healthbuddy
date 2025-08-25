// Sliders live update
document.getElementById("energy").addEventListener("input", function() {
  document.getElementById("energyVal").textContent = this.value;
});
document.getElementById("libido").addEventListener("input", function() {
  document.getElementById("libidoVal").textContent = this.value;
});

// Multi-step form navigation
const steps = document.querySelectorAll('.form-step');
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

document.querySelectorAll('.prev-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

showStep(currentStep); // initialize

// Calculate results on final submit
document.getElementById("health-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // Collect all form data
  const formData = new FormData(this);
  let resultText = "Based on your responses:\n";
  for (let [key, value] of formData.entries()) {
    resultText += `${key}: ${value}, `;
  }

  const energy = parseInt(formData.get("energy"));
  const libido = parseInt(formData.get("libido"));
  if (energy < 4 || libido < 4) {
    resultText += "⚠️ You may need some help with hormone health. We can draft a letter for your GP.";
  } else {
    resultText += "✅ Things look generally balanced, but consider discussing with your GP.";
  }

  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("result-text").textContent = resultText;
});

// Show GP letter form
document.getElementById("gp-letter-btn").addEventListener("click", function() {
  document.getElementById("results").classList.add("hidden");
  document.getElementById("gp-form-section").classList.remove("hidden");
});

// Placeholder GP letter generation
document.getElementById("gp-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("📄 GP Letter would be generated as PDF (placeholder).");
});
