document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        const username = registerForm.elements.username.value;
        const email = registerForm.elements.email.value;
        const password = registerForm.elements.password.value;
        const confirmPassword = registerForm.elements.confirmPassword.value;

        // Username validation
        if (username.length < 3) {
            displayError('usernameError', 'Username must be at least 3 characters.');
            isValid = false;
        }

        // Email validation
        if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
            displayError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        // Password validation
        if (password.length < 8) {
            displayError('passwordError', 'Password must be at least 8 characters.');
            isValid = false;
        }
        if (password !== confirmPassword) {
            displayError('confirmPasswordError', 'Passwords do not match.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Stop form submission if validation fails
        }
    });

    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});