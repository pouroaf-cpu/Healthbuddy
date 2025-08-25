// Handle Health Form
document.getElementById('healthForm').addEventListener('submit', function(e) {
  e.preventDefault();
  calculateResults();
});

// Handle GP Letter Form
document.getElementById('gpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  generateGpLetter();
});

// Show GP Form button
document.getElementById('gpLetterBtn').addEventListener('click', function() {
  document.getElementById('gp-form-section').classList.remove('hidden');
});

// Calculate Health Results
function calculateResults() {
  const age = parseInt(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const energy = parseInt(document.getElementById('energy').value);
  const libido = parseInt(document.getElementById('libido').value);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let message = `Your BMI is ${bmi}. `;
  if (bmi > 25) {
    message += "You may be overweight, which can affect hormone health. ";
  } else if (bmi < 18.5) {
    message += "You may be underweight, which can also impact hormone balance. ";
  } else {
    message += "Your BMI is in a healthy range. ";
  }

  if (energy <= 4) message += "Your energy levels seem low. ";
  if (libido <= 4) message += "Your libido seems below average. ";

  message += "You may need some help with further information. We can draft a letter to your GP for you.";

  document.getElementById('results').innerText = message;

  document.getElementById('form-section').classList.add('hidden');
  document.getElementById('results-section').classList.remove('hidden');
}

// Generate GP Letter
function generateGpLetter() {
  const patientName = document.getElementById('patientName').value;
  const patientEmail = document.getElementById('patientEmail').value;
  const gpName = document.getElementById('gpName').value;
  const gpPractice = document.getElementById('gpPractice').value;

  const letter = `
    Dear Dr. ${gpName},

    I am writing regarding my patient, ${patientName}, who has used our men's hormone health self-assessment tool.
    The results suggest that there may be areas requiring further clinical evaluation.

    We recommend considering investigations into:
    - Hormone balance (including testosterone and related markers)
    - Metabolic health (BMI, potential obesity-related risks)
    - Energy and libido concerns that may indicate endocrine or lifestyle factors

    Practice: ${gpPractice}  
    Patient contact: ${patientEmail}

    Thank you for your attention to this matter.

    Sincerely,  
    Men's Hormone Health Assessment Service
  `;

  document.getElementById('gpLetter').innerText = letter.trim();
  document.getElementById('gp-form-section').classList.add('hidden');
  document.getElementById('gp-letter-section').classList.remove('hidden');
}
