document.getElementById("energy").addEventListener("input", function() {
  document.getElementById("energyVal").textContent = this.value;
});

document.getElementById("libido").addEventListener("input", function() {
  document.getElementById("libidoVal").textContent = this.value;
});

document.getElementById("health-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = document.getElementById("age").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const energy = document.getElementById("energy").value;
  const libido = document.getElementById("libido").value;
  const sleep = document.getElementById("sleep").value;
  const exercise = document.getElementById("exercise").value;

  let resultText = `Based on your inputs: Age ${age}, Weight ${weight}kg, Height ${height}cm, 
  Energy ${energy}/10, Libido ${libido}/10, Sleep ${sleep}, Exercise ${exercise}.`;

  if (energy < 4 || libido < 4) {
    resultText += " ⚠️ You may need some help with hormone health. We can draft a letter for your GP.";
  } else {
    resultText += " ✅ Things look generally balanced, but you may still consider discussing with your GP.";
  }

  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("result-text").textContent = resultText;
});

document.getElementById("gp-letter-btn").addEventListener("click", function() {
  document.getElementById("results").classList.add("hidden");
  document.getElementById("gp-form-section").classList.remove("hidden");
});

document.getElementById("gp-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("📄 GP Letter would be generated as PDF (this is placeholder).");
});
