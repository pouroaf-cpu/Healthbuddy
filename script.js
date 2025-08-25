document.getElementById("health-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const weight = parseInt(document.getElementById("weight").value);
  const height = parseInt(document.getElementById("height").value);
  const energy = parseInt(document.getElementById("energy").value);
  const libido = parseInt(document.getElementById("libido").value);
  const erections = parseInt(document.getElementById("erections").value);
  const mood = parseInt(document.getElementById("mood").value);
  const sleep = parseInt(document.getElementById("sleep").value);
  const surgery = document.getElementById("surgery").value;
  const medications = document.getElementById("medications").value;

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let issues = [];

  if (bmi >= 30) issues.push("High BMI (obesity)");
  else if (bmi >= 25) issues.push("Overweight BMI");
  if (libido <= 4) issues.push("Low sex drive");
  if (erections < 3) issues.push("Low frequency of morning erections");
  if (energy <= 4) issues.push("Low energy");
  if (mood <= 4) issues.push("Low mood stability");
  if (sleep <= 4) issues.push("Poor sleep quality");
  if (surgery === "yes") issues.push("History of testicular surgery/trauma");
  if (medications === "yes") issues.push("On medications (needs review)");

  const results = issues.length > 0
    ? `Potential concerns detected: ${issues.join(", ")}.`
    : "No major concerns detected. Lifestyle support recommended.";

  document.getElementById("results").innerText = results;
  document.getElementById("result-container").classList.remove("hidden");
  document.getElementById("health-form").classList.add("hidden");

  // store for GP letter
  window.userReport = { age, bmi, issues };
});

// GP letter generation
document.getElementById("generate-letter").addEventListener("click", function () {
  const { age, bmi, issues } = window.userReport;
  const { jsPDF } = window.jspdf || {};

  if (!jsPDF) {
    alert("PDF generation not available. Please add jsPDF library.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("times", "normal");
  doc.setFontSize(12);

  doc.text("To the General Practitioner,", 20, 20);
  doc.text(`Patient Age: ${age}`, 20, 30);
  doc.text(`BMI: ${bmi}`, 20, 40);

  if (issues.length > 0) {
    doc.text("The following concerns were flagged:", 20, 55);
    issues.forEach((issue, idx) => {
      doc.text(`- ${issue}`, 25, 65 + idx * 10);
    });
    doc.text("Please consider hormone testing and further evaluation.", 20, 65 + issues.length * 10 + 10);
  } else {
    doc.text("No major issues were flagged. General monitoring recommended.", 20, 55);
  }

  doc.text("Kind regards,", 20, 120);
  doc.text("Men's Hormone Health Checker (automated letter)", 20, 130);

  doc.save("GP_Letter.pdf");
});

