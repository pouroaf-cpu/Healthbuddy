document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100; // m
  const libido = parseInt(document.getElementById("libido").value);
  const mood = parseInt(document.getElementById("mood").value);
  const energy = parseInt(document.getElementById("energy").value);
  const erections = parseInt(document.getElementById("erections").value);

  const bmi = (weight / (height * height)).toFixed(1);

  let advice = `<p><strong>Age:</strong> ${age} <br>
                <strong>BMI:</strong> ${bmi} <br>
                <strong>Libido:</strong> ${libido}/5 <br>
                <strong>Mood:</strong> ${mood}/5 <br>
                <strong>Energy:</strong> ${energy}/5 <br>
                <strong>Morning Erections:</strong> ${erections}/week</p>`;

  // Rule-based checks
  if (bmi > 27) {
    advice += "<p><b>Note:</b> Elevated BMI. Consider risks like low testosterone, insulin resistance, cardiovascular strain.</p>";
  }
  if (libido <= 2) {
    advice += "<p><b>Note:</b> Low libido can be linked to low testosterone, stress, or other hormonal imbalance.</p>";
  }
  if (energy <= 2) {
    advice += "<p><b>Note:</b> Low energy levels may suggest thyroid, testosterone, or sleep-related issues.</p>";
  }
  if (erections < 3) {
    advice += "<p><b>Note:</b> Low frequency of morning erections may indicate reduced testosterone function.</p>";
  }

  document.getElementById("adviceBox").innerHTML = advice;
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("healthForm").classList.add("hidden");

  // Store GP letter content
  window.gpLetter = generateLetter(age, bmi, libido, mood, energy, erections);
});

function generateLetter(age, bmi, libido, mood, energy, erections) {
  let letter = `Dear GP,\n\n`;
  letter += `This letter is generated as part of a Men's Hormone Health self-assessment.\n\n`;
  letter += `Patient Information:\n`;
  letter += `Age: ${age}\nBMI: ${bmi}\nLibido: ${libido}/5\nMood: ${mood}/5\nEnergy: ${energy}/5\nMorning Erections: ${erections}/week\n\n`;

  letter += `Potential areas to review:\n`;
  if (bmi > 27) letter += `- Elevated BMI: check for metabolic and cardiovascular risks.\n`;
  if (libido <= 2) letter += `- Low libido: assess testosterone and related hormones.\n`;
  if (energy <= 2) letter += `- Low energy: consider thyroid and testosterone levels.\n`;
  if (erections < 3) letter += `- Low frequency of morning erections: possible hypogonadism.\n`;

  letter += `\nSincerely,\nHealthBuddy Assessment Tool`;
  return letter;
}

// PDF download
document.getElementById("downloadLetter").addEventListener("click", function() {
  if (!window.gpLetter) return;

  const blob = new Blob([window.gpLetter], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "GP_Letter.pdf";
  a.click();
  URL.revokeObjectURL(url);
});

