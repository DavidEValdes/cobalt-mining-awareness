document.addEventListener('DOMContentLoaded', function () {

  // Close modal button
  const closeModalButton = document.getElementById('close-modal');
  if (closeModalButton) {
      closeModalButton.addEventListener('click', function() {
          document.getElementById('thanks-modal').style.display = 'none';
      });
  }
  
    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', function(event) {
        event.preventDefault(); 
        document.body.classList.toggle('dark-mode');
    });

    // Initialize the count
    let count = 3; // Start with the initial signatures

    // Function to add a new signature
    const addSignature = (person) => {
        // Create a new paragraph element for the signature
        const newSignature = document.createElement('p');
        newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

        // Append the new signature to the signatures section
        const signaturesSection = document.querySelector('.signatures');
        signaturesSection.appendChild(newSignature);

        // Increment the count and update the counter
        count++;
        updateSignatureCount();

        // Toggle modal
        toggleModal(person);
    };

    // Function to update the signature count
    const updateSignatureCount = () => {
        const counter = document.getElementById('signature-counter');
        counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
    };

    // Update the initial signature count
    updateSignatureCount();

    // Function to validate form and create person object
    const validateForm = (event) => {
        event.preventDefault();
        let containsErrors = false;

        let petitionInputs = document.getElementById("sign-petition").elements;
        let person = {
            name: '',
            hometown: '',
            email: ''
        };

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
                if (petitionInputs[i].name === 'name') person.name = petitionInputs[i].value;
                if (petitionInputs[i].name === 'hometown') person.hometown = petitionInputs[i].value;
                if (petitionInputs[i].name === 'email') person.email = petitionInputs[i].value;
            }
        }

        // Specific validation for email
        const email = document.getElementById('email');
        if (!email.value.includes('.com') && !email.value.includes('.org') && !email.value.includes('.edu')) {
            containsErrors = true;
            email.classList.add('error');
        } else {
            email.classList.remove('error');
        }

        // If there are no errors
        if (!containsErrors) {
            addSignature(person); // Add the signature

            // Clear the form
            for (let i = 0; i < petitionInputs.length; i++) {
                petitionInputs[i].value = "";
            }
        }
    };

    // Function to toggle the modal
    function toggleModal(person) {
        let modal = document.getElementById('thanks-modal');
        let modalContent = document.getElementById('thanks-modal-content');
        modal.style.display = 'flex';
        modalContent.textContent = `Thank you so much, ${person.name} from ${person.hometown}!`;

        // SetTimeout to hide the modal
        setTimeout(function() {
            modal.style.display = 'none';
        }, 4000); // Adjust time as needed
    }

    const signPetitionForm = document.getElementById('sign-petition');
    signPetitionForm.addEventListener('submit', validateForm);

    // Scroll animation logic
    let revealableElements = document.querySelectorAll('.revealable');

    function reveal() {
        for (let i = 0; i < revealableElements.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = revealableElements[i].getBoundingClientRect().top;
            let elementVisible = 150; 

            if (elementTop < windowHeight - elementVisible) {
                revealableElements[i].classList.add('active');
            } else {
                revealableElements[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
});
