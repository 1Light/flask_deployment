let errorContainer = document.getElementById("content");

function validateForm() {
    // Clear previous error messages
    resetErrors();

    // Fetch input values
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();

    let isValid = true;

    // Validation rules
    if (name === '' || /\d/.test(name)) {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Name cannot be empty and must not contain numbers";
        isValid = false;
    }

    if (password === '') {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Password cannot be empty";
        isValid = false;
    } else if (password.length < 5) {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Password must be at least 5 characters long";
        isValid = false;
    }

    if (password !== confirmPassword) {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Passwords do not match";
        isValid = false;
    }

    if (email === '') {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Email cannot be empty";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Invalid email format";
        isValid = false;
    }

    if (username === '') {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Username cannot be empty";
        isValid = false;
    } else if (!/^[a-zA-Z]+[a-zA-Z0-9]*$/.test(username)) {
        errorContainer.classList.remove('hide');
        errorContainer.classList.add('show');
        document.getElementById('validationMessages').textContent = "Username must contain letters and may include numbers";
        isValid = false;
    }

    // If all validations pass, redirect to specified URL
    if (isValid) {
        window.location.href = "http://zealous-timer.netlify.app";
        return true; // Allow form submission
    } else {  
        return false; // Prevent form submission
    }
}

function resetErrors() {
    document.getElementById('validationMessages').textContent = '';
}
