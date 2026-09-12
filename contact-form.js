/**
 * Contact Form Handler
 * Maneja la validación y envío del formulario de contacto
 */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree maneja el envío automáticamente
            // Solo agregamos feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Reset form after successful submission (Formspree redirect)
            // Para desarrollo local, mostrar mensaje de éxito simulado
            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ ¡Mensaje enviado exitosamente! Te responderé pronto.';
                }
                
                // Opcional: resetear el formulario después de 3 segundos
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 3000);
            }, 500);
        });

        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input[type="email"]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    this.style.borderColor = 'var(--error)';
                } else {
                    this.style.borderColor = 'var(--border)';
                }
            });
        });
    }
});

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
