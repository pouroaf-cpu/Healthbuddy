// Stop form reload and trigger calculation
document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();
  calculateResults();
});

function calculateResults() {
  // Get values
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const energy = parseInt(document.getElementById("energy").value);
  const libido = parseInt(document.getElementById("libido").value);
  const sleep = parseInt(document.getElementById("sleep").value);
  const exercise = parseInt(document.getElementById("exercise").value);
  const mood = document.getElementById("mood").value;
  const history = document.getElementById("history").value;

  // BMI calc
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let insights = [];
  if (bmi > 25) insights.push("BMI suggests overweight, may impact testosterone.");
  if (energy < 5) insights.push("Low energy levels, consider testosterone testing.");
  if (libido < 5) insights.push("Low libido may signal hormone imbalance.");
  if (sleep < 6) insights.push("Poor sleep can reduce testosterone.");
  if (exercise < 2) insights.push("Low physical activity impacts hormone health.");
  if (mood === "yes") insights.push("Mood changes may relate to hormone health.");
  if (history === "yes") insights.push("Family history may increase risk.");

  // Show results
  document.getElementById("healthForm").classList.add("hidden");
  document.getElementById("resultsBox").classList.remove("hidden");

  document.getElementById("results").innerHTML = `
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>BMI:</strong> ${bmi}</p>
    <ul>${insights.map(i => `<li>${i}</li>`).join("")}</ul>
  `;

  // GP Letter
  const letter = `
    Dear GP,<br><br>
    This letter is regarding a male patient, age ${age}.<br><br>
    - BMI: ${bmi}<br>
    ${insights.map(i => "- " + i).join("<br>")}<br><br>
    We recommend checking testosterone levels, thyroid function, and general metabolic health.<br><br>
    Kind regards,<br>
    Men's Hormone Health Checker
  `;

  document.getElementById("downloadLetter").onclick = function() {
    generatePDF(letter);
  };
}

function generatePDF(content) {
  const opt = {
    margin:       1,
    filename:     'GP_Letter.pdf',
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(content).set(opt).save();
}
