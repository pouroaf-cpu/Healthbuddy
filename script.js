const form = document.getElementById("multiStepForm");
const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const result = document.getElementById("result");

let formStepIndex = 0;

function updateFormSteps() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === formStepIndex);
  });
  progress.style.width = ((formStepIndex + 1) / formSteps.length) * 100 + "%";
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

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Send to Google Sheets
  fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    if (res.ok) {
      form.style.display = "none";
      result.classList.remove("hidden");
    } else {
      alert("Error submitting form");
    }
  })
  .catch(err => console.error(err));
});

// Initialize
updateFormSteps();
