// Primary form submission
document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();
  calculateResults();
});

function calculateResults() {
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const energy = parseInt(document.getElementById("energy").value);
  const libido = parseInt(document.getElementById("libido").value);
  const sleep = parseInt(document.getElementById("sleep").value);
  const exercise = parseInt(document.getElementById("exercise").value);
  const mood = document.getElementById("mood").value;
  const history = document.getElementById("history").value;

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let insights = [];
  if (bmi > 25) insights.push("BMI suggests overweight, may impact testosterone.");
  if (energy < 5) insights.push("Low energy levels, consider testosterone testing.");
  if (libido < 5) insights.push("Low libido may signal hormone imbalance.");
  if (sleep < 6) insights.push("Poor sleep can reduce testosterone.");
  if (exercise < 2) insights.push("Low physical activity impacts hormone health.");
  if (mood === "yes") insights.push("Mood changes may relate to hormone health.");
  if (history === "yes") insights.push("Family history may increase risk.");

  document.getElementById("healthForm").classList.add("hidden");
  document.getElementById("resultsBox").classList.remove("hidden");

  const generalMessage = insights.length > 0
    ? "<p><strong>You may need some help with your hormone health. We can draft a letter to your GP for you.</strong></p>"
    : "<p><strong>No major concerns detected. Keep up a healthy lifestyle!</strong></p>";

  document.getElementById("results").innerHTML = `
    ${generalMessage}
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>BMI:</strong> ${bmi}</p>
    ${insights.length > 0 ? `<ul>${insights.map(i => `<li>${i}</li>`).join("")}</ul>` : ""}
  `;

  window.userReport = { age, bmi, insights };
}

// Show GP letter form
document.getElementById("requestLetter").addEventListener("click", function() {
  document.getElementById("gpLetterFormContainer").classList.remove("hidden");
  this.classList.add("hidden");
});

// GP letter form submission
document.getElementById("gpLetterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const patientName = document.getElementById("patientName").value;
  const patientEmail = document.getElementById("patientEmail").value;
  const gpName = document.getElementBy

