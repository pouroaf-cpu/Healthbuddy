const form = document.getElementById("evaluationForm");
const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");

let formStepIndex = 0;

function updateFormSteps() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === formStepIndex);
  });
  progress.style.width = ((formStepIndex) / (formSteps.length - 1)) * 100 + "%";
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
  alert("Thank you! Your responses have been submitted.");
  form.reset();
  formStepIndex = 0;
  updateFormSteps();
});

// Initialize
updateFormSteps();
