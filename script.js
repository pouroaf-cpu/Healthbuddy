const steps = document.querySelectorAll('.form-step'); // all step divs
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

// Next buttons
document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

// Back buttons
document.querySelectorAll('.prev-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

// Initialize
showStep(currentStep);
const steps = document.querySelectorAll('.form-step');
const progressBar = document.getElementById('progress-bar');
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentStep + 1) / steps.length) * 100;
  progressBar.style.width = progress + "%";
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
document.getElementById("health-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Send to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbwImTvfVoX_1kC_ODP_eD74wzimAn3l2kHJraky_UKK2rXUftemxMcwUqInr8sd54kt/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    // Show results or next step
    document.getElementById("form-container").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
  })
  .catch(err => console.error(err));
});
