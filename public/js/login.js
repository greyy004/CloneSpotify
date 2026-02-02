document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {

        event.preventDefault(); // Always prevent default, then decide to fetch
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        const email = loginForm.elements.email.value;
        const password = loginForm.elements.password.value;

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
        if (isValid) {
            try {
                const response = await fetch('/auth/login',{
                        method :'POST',
                        body :JSON.stringify({ email, password }),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    if(response.redirected)
                    {
                        window.location.href=response.url;
                    }
            }catch(error)
            {
                console.error('network or fetch error:', error);
                alert('an unexpected error occured.');
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
