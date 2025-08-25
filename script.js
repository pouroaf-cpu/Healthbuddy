document.getElementById('healthForm').addEventListener('submit', function(e) {
  e.preventDefault();
  calculateResults();
});

document.getElementById('gpLetterBtn').addEventListener('click', function() {
  document.getElementById('gpForm').classList.remove('hidden');
});

document.getElementById('gpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  generateLetter();
});

function calculateResults() {
  const age = parseInt(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const energy = parseInt(document.getElementById('energy').value);
  const libido = parseInt(document.getElementById('libido').value);
  const sleep = parseInt(document.getElementById('sleep').value);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let feedback = `Your BMI is ${bmi}. `;

  if (bmi > 25) {
    feedback += "You may be overweight. Consider discussing metabolic health with your GP. ";
  } else if (bmi < 18.5) {
    feedback += "You may be underweight, which can also impact hormone balance. ";
  } else {
    feedback += "Your weight appears in a healthy range. ";
  }

  if (energy <= 4) feedback += "Low energy levels may indicate low testosterone or other hormonal issues. ";
  if (libido <= 4) feedback += "Low libido is a common symptom of hormone imbalance. ";
  if (sleep <= 4) feedback += "Poor sleep can directly affect testosterone and recovery. ";

  if (energy > 4 && libido > 4 && sleep > 4 && bmi >= 18.5 && bmi <= 25) {
    feedback += "Overall, your answers look within a healthy range.";
  } else {
    feedback += "You may need some help — we can draft a letter to your GP for follow-up testing.";
  }

  document.getElementById('healthForm').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('resultsText').innerText = feedback;
}

function generateLetter() {
  const patientName = document.getElementById('patientName').value;
  const patientEmail = document.getElementById('patientEmail').value;
  const gpName = document.getElementById('gpName').value;
  const gpPractice = document.getElementById('gpPractice').value;
  const patientConcerns = document.getElementById('patientConcerns').value;

  const letterContent = `
  To: Dr. ${gpName}, ${gpPractice}
  
  Subject: Patient Hormone Health Review
  
  Dear Dr. ${gpName},
  
  I am writing regarding your patient, ${patientName}.
  
  Based on their self-reported responses, there are some concerns regarding possible hormone imbalance:
  - Possible issues with energy, libido, sleep, or weight balance.
  - It may be appropriate to evaluate testosterone, thyroid, and metabolic health.
  
  ${patientConcerns ? "Additional notes from the patient: " + patientConcerns : ""}
  
  Please consider arranging appropriate blood work and further evaluation.
  
  Regards,
  Men's Hormone Health Checker
  Contact: ${patientEmail}
  `;

  const blob = new Blob([letterContent], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "GP_Letter.pdf";
  link.click();
}
