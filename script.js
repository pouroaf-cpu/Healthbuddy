document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const height = parseInt(document.getElementById("height").value) / 100; // m
  const weight = parseInt(document.getElementById("weight").value);
  const waist = parseInt(document.getElementById("waist").value);
  const sleep = parseInt(document.getElementById("sleep").value);
  const energy = parseInt(document.getElementById("energy").value);
  const libido = parseInt(document.getElementById("libido").value);
  const stress = parseInt(document.getElementById("stress").value);

  // Calculations
  const bmi = weight / (height * height);
  const waistRatio = waist / (height * 100);

  let score = 0;
  let suggestions = [];

  // BMI + waist
  if (bmi > 30 || waistRatio > 0.55) {
    score += 2;
    suggestions.push("Consider reducing body fat through diet and exercise.");
  }

  // Sleep
  if (sleep < 7) {
    score += 1;
    suggestions.push("Aim for 7–9 hours of sleep per night.");
  }

  // Energy + libido
  if (energy <= 2) {
    score += 1;
    suggestions.push("Low energy can be linked to lifestyle or hormone issues.");
  }
  if (libido <= 2) {
    score += 1;
    suggestions.push("Low libido may indicate hormone imbalance or stress.");
  }

  // Stress
  if (stress >= 4) {
    score += 1;
    suggestions.push("Manage stress with exercise, meditation, or breathing techniques.");
  }

  // Risk category
  let riskCategory = "Low Risk";
  if (score >= 4) riskCategory = "High Risk";
  else if (score >= 2) riskCategory = "Moderate Risk";

  document.getElementById("riskScore").innerText = `Hormone Health Risk Score: ${riskCategory}`;
  document.getElementById("suggestions").innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
  document.getElementById("results").style.display = "block";
});
