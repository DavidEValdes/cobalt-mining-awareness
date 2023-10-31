document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('dark-mode-toggle').addEventListener('click', function(event) {
      event.preventDefault(); 
      document.body.classList.toggle('dark-mode');
  });
});

// Initialize the count
let count = 3; // Start with the initial signatures

// Function to add a new signature
const addSignature = (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name').value;
  const hometownInput = document.getElementById('hometown').value;

  // Create a new paragraph element for the signature
  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${nameInput} from ${hometownInput} supports this.`;

  // Append the new signature to the signatures section
  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.appendChild(newSignature);

  // Increment the count and update the counter
  count++;
  updateSignatureCount();
};

// Function to update the signature count
const updateSignatureCount = () => {
  const counter = document.getElementById('signature-counter');
  counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
};

// Update the initial signature count
updateSignatureCount();

const validateForm = (event) => {
  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;

  for (let i = 0; i < petitionInputs.length; i++) {
    // Skip button elements or any other specific types if needed
    if (petitionInputs[i].type === 'button' || petitionInputs[i].type === 'submit') {
      continue;
    }

    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  // Specific validation for email address to check for .com, .org, or .edu
  const email = document.getElementById('email');
  if (!email.value.includes('.com') && !email.value.includes('.org') && !email.value.includes('.edu')) {
      containsErrors = true;
      email.classList.add('error');
  } else {
      email.classList.remove('error');
  }


  
  // If there are no errors
  if (!containsErrors) {
    addSignature(event); // Add the signature

    // Clear the form
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
  event.preventDefault();
};

const signPetitionForm = document.getElementById('sign-petition');
signPetitionForm.addEventListener('submit', validateForm);