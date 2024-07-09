function validateForm() {
    // Clear previous error messages
    resetErrors();

    // Fetch input values
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();

    let isValid = true;

    // Validation rules

    if (password === '') {
        document.getElementById('validationMessages').textContent = "Password cannot be empty";
        isValid = false;
    } else if (password.length < 5) {
        document.getElementById('validationMessages').textContent ="Password must be at least 5 characters long";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('validationMessages').textContent = "Passwords do not match";
        isValid = false;
    }

    if (email === '') {
        document.getElementById('validationMessages').textContent = "Email cannot be empty";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('validationMessages').textContent = "Invalid email format";
        isValid = false;
    }

   // If all validations pass, redirect to another page
   if (isValid) {
    window.open('https://zealous-timer.netlify.app', '_blank'); 
   } else {
    event.preventDefault(); // Prevents form submission if validation fails
   }

    return isValid;
}

function resetErrors() {
    document.getElementById('validationMessages').textContent = '';
}