document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const height = parseInt(document.getElementById("height").value) / 100; // meters
  const weight = parseInt(document.getElementById("weight").value);
  const waist = parseInt(document.getElementById("waist").value);
  const sleep = parseInt(document.getElementById("sleep").value);
  const energy = parseInt(document.getElementById("energy").value);
  const libido = parseInt(document.getElementById("libido").value);
  const stress = parseInt(document.getElementById("stress").value);
  const activity = parseInt(document.getElementById("activity").value);

  // Calculations
  const bmi = weight / (height * height);
  const waistRatio = waist / (height * 100);

  let score = 0;
  let suggestions = [];

  // 1. BMI + Waist Ratio
  if (bmi > 30) { score += 2; suggestions.push("Consider reducing body fat through diet and exercise."); }
  else if (bmi >= 25) { score += 1; suggestions.push("Overweight: Maintaining a healthy weight may help hormone levels."); }
  if (waistRatio > 0.55) { score += 1; suggestions.push("Central obesity detected: waist reduction can support testosterone health."); }

  // 2. Sleep
  if (sleep < 7) { score += 1; suggestions.push("Aim for 7–9 hours of sleep per night."); }

  // 3. Energy Levels
  if (energy <= 2) { score += 1; suggestions.push("Low energy may indicate lifestyle or hormone issues."); }

  // 4. Libido
  if (libido <= 2) { score += 1; suggestions.push("Low libido can be linked to hormone imbalance or stress."); }

  // 5. Stress
  if (stress >= 4) { score += 1; suggestions.push("High stress: consider exercise, meditation, or breathing techniques."); }

  // 6. Age
  if (age > 50) { score += 1; suggestions.push("Age-related hormone decline may occur; consider monitoring and healthy habits."); }

  // 7. Activity
  if (activity <= 1) { score += 1; suggestions.push("Low activity: regular exercise supports hormone health."); }

  // Risk category
  let riskCategory = "Low Risk";
  if (score >= 4) riskCategory = "High Risk";
  else if (score >= 2) riskCategory = "Moderate Risk";

  // Display results
  const resultsDiv = document.getElementById("results");
  document.getElementById("riskScore").innerText = `Hormone Health Risk Score: ${riskCategory}`;
  document.getElementById("suggestions").innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
  resultsDiv.style.display = "block";

  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
});
