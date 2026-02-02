document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Always prevent default, then decide to fetch
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

        if (isValid) {
            try {
                const response = await fetch('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ username, email, password, confirmPassword }), // Send confirmPassword for server-side
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.redirected) {
                    // If the server sent a redirect, follow it
                    window.location.href = response.url;
                } else if (response.ok) {
                    // If it's a successful non-redirect response (e.g., if you later send JSON on success)
                    const data = await response.json();
                    console.log('Registration successful (non-redirect):', data);
                    // You might still want to redirect here if needed, or update UI
                    alert('Registration successful!');
                } else {
                    // Handle server-side errors (e.g., validation errors caught by middleware)
                    const errorText = await response.text(); 
                    console.error('Registration failed:', errorText);
                    alert('Registration failed: ' + errorText);
                }
            } catch (error) {
                console.error('Network or fetch error:', error);
                alert('An unexpected error occurred.');
            }
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