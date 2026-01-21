/**
 * Banipark Dharmarth Sansthan - Contact Form Validation JavaScript
 * Handles contact form validation and submission
 */

// Company Details Object (will be populated from JSON)
let companyDetails = {
    email: 'mrdcinfojpr@gmail.com' // Fallback value
};

// Load Company Details from JSON
function loadCompanyDetails() {
    const cacheBuster = '?v=' + new Date().getTime();
    return fetch('data/company/company.json' + cacheBuster, {
        cache: 'no-cache'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load company details');
            }
            return response.json();
        })
        .then(data => {
            companyDetails = data;
            return data;
        })
        .catch(error => {
            console.error('Error loading company details:', error);
            // Use fallback values if JSON fails to load
            companyDetails = {
                phone: "9509226208",
                whatsapp: "9509226208",
                email: "mrdcinfojpr@gmail.com",
                address: "B-5, Shiv Circle, Shiv Marg, Banipark, Jaipur-302016",
                addressLink: "https://maps.app.goo.gl/bLNoNQhFmHxTa8Eb9"
            };
        });
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Load company details first
    loadCompanyDetails();
    
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // ==========================================
    // FORM ELEMENTS
    // ==========================================
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const successMessage = document.getElementById('successMessage');
    const errorMessageBox = document.getElementById('errorMessageBox');
    
    
    // ==========================================
    // VALIDATION FUNCTIONS
    // ==========================================
    
    // Validate name
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    // Validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    // Validate phone
    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone);
    }
    
    // Validate subject
    function validateSubject(subject) {
        return subject.trim().length >= 3;
    }
    
    // Validate message
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    
    // ==========================================
    // SHOW/HIDE ERROR MESSAGES
    // ==========================================
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function showConsentError(checkbox, message) {
        const consentCheckbox = checkbox.closest('.consent-checkbox');
        if (!consentCheckbox) return;
        
        consentCheckbox.classList.add('error');
        const errorElement = consentCheckbox.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function hideConsentError(checkbox) {
        const consentCheckbox = checkbox.closest('.consent-checkbox');
        if (!consentCheckbox) return;
        
        consentCheckbox.classList.remove('error');
        const errorElement = consentCheckbox.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    
    // ==========================================
    // REAL-TIME VALIDATION
    // ==========================================
    
    // Name validation
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (nameInput.value.trim()) {
                if (!validateName(nameInput.value)) {
                    showError(nameInput, 'Please enter a valid name (2-50 characters, letters only)');
                } else {
                    hideError(nameInput);
                }
            }
        });
        
        nameInput.addEventListener('input', function() {
            if (nameInput.value.trim() && validateName(nameInput.value)) {
                hideError(nameInput);
            }
        });
    }
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (emailInput.value.trim()) {
                if (!validateEmail(emailInput.value)) {
                    showError(emailInput, 'Please enter a valid email address');
                } else {
                    hideError(emailInput);
                }
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() && validateEmail(emailInput.value)) {
                hideError(emailInput);
            }
        });
    }
    
    // Phone validation
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (phoneInput.value.trim()) {
                if (!validatePhone(phoneInput.value)) {
                    showError(phoneInput, 'Please enter a valid 10-digit phone number');
                } else {
                    hideError(phoneInput);
                }
            }
        });
        
        phoneInput.addEventListener('input', function() {
            // Auto-format phone number (remove non-digits)
            phoneInput.value = phoneInput.value.replace(/[^\d]/g, '');
            
            if (phoneInput.value.trim() && validatePhone(phoneInput.value)) {
                hideError(phoneInput);
            }
        });
    }
    
    // Subject validation
    if (subjectInput) {
        subjectInput.addEventListener('blur', function() {
            if (subjectInput.value.trim()) {
                if (!validateSubject(subjectInput.value)) {
                    showError(subjectInput, 'Subject must be at least 3 characters long');
                } else {
                    hideError(subjectInput);
                }
            }
        });
        
        subjectInput.addEventListener('input', function() {
            if (subjectInput.value.trim() && validateSubject(subjectInput.value)) {
                hideError(subjectInput);
            }
        });
    }
    
    // Message validation
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (messageInput.value.trim()) {
                if (!validateMessage(messageInput.value)) {
                    showError(messageInput, 'Message must be at least 10 characters long');
                } else {
                    hideError(messageInput);
                }
            }
        });
        
        messageInput.addEventListener('input', function() {
            if (messageInput.value.trim() && validateMessage(messageInput.value)) {
                hideError(messageInput);
            }
        });
    }
    
    
    // ==========================================
    // FORM SUBMISSION
    // ==========================================
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        if (successMessage) {
            successMessage.style.display = 'none';
            successMessage.classList.remove('show');
        }
        if (errorMessageBox) {
            errorMessageBox.style.display = 'none';
            errorMessageBox.classList.remove('show');
        }
        
        // Validate all fields
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name');
            isValid = false;
        } else {
            hideError(nameInput);
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput);
        }
        
        // Validate phone
        if (!phoneInput.value.trim()) {
            showError(phoneInput, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            hideError(phoneInput);
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Subject is required');
            isValid = false;
        } else if (!validateSubject(subjectInput.value)) {
            showError(subjectInput, 'Subject must be at least 3 characters long');
            isValid = false;
        } else {
            hideError(subjectInput);
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            hideError(messageInput);
        }
        
        // Validate consent checkboxes
        const consentPromotional = document.getElementById('consent-promotional');
        const consentTerms = document.getElementById('consent-terms');
        
        if (consentPromotional && !consentPromotional.checked) {
            showConsentError(consentPromotional, 'Please agree to receive promotional communications');
            isValid = false;
        } else if (consentPromotional) {
            hideConsentError(consentPromotional);
        }
        
        if (consentTerms && !consentTerms.checked) {
            showConsentError(consentTerms, 'Please agree to all terms & conditions');
            isValid = false;
        } else if (consentTerms) {
            hideConsentError(consentTerms);
        }
        
        // If validation fails, scroll to first error
        if (!isValid) {
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';
        if (submitBtn) submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Log form data
        console.log('Form Data:', formData);
        
        // Open Gmail with form data
        openGmail(formData);
        
        // Hide loading state
        if (btnText) btnText.style.display = 'inline-block';
        if (btnLoader) btnLoader.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
        
        // Show success message
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.classList.add('show');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Reset form
        contactForm.reset();
        
        // Remove all error states
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
        // Remove consent checkbox error states
        const consentCheckboxes = contactForm.querySelectorAll('.consent-checkbox');
        consentCheckboxes.forEach(checkbox => {
            checkbox.classList.remove('error');
            const errorElement = checkbox.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300);
            }
        }, 5000);
    });
    
    
    // ==========================================
    // GMAIL INTEGRATION
    // ==========================================
    
    function openGmail(data) {
        const subject = encodeURIComponent(data.subject || `Contact Inquiry from ${data.name}`);
        const body = encodeURIComponent(`Hello Banipark Dharmarth Sansthan,

I would like to get in touch with you regarding your healthcare services.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Subject: ${data.subject || 'General Inquiry'}

Message:
${data.message}

Thank you!`);
        
        // Get email from company details
        const companyEmail = companyDetails.email || 'mrdcinfojpr@gmail.com';
        
        // Check if mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // For mobile: Use mailto: which opens Gmail app if installed, otherwise default mail app
            const mailtoLink = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            // For desktop: Open Gmail in browser
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(companyEmail)}&su=${subject}&body=${body}`;
            window.open(gmailUrl, '_blank');
        }
    }
    
    
    // ==========================================
    // PHONE NUMBER FORMATTING
    // ==========================================
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Allow only numbers
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            e.target.value = value;
        });
    }
    
    
    // ==========================================
    // PREVENT FORM RESUBMISSION ON PAGE RELOAD
    // ==========================================
    
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
});


// ==========================================
// SERVICE ENQUIRY FORM HANDLING
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Load company details first
    loadCompanyDetails();
    
    const serviceEnquiryForm = document.getElementById('serviceEnquiryForm');
    
    if (!serviceEnquiryForm) return;
    
    // ==========================================
    // FORM ELEMENTS
    // ==========================================
    
    const nameInput = document.getElementById('enquiry-name');
    const emailInput = document.getElementById('enquiry-email');
    const phoneInput = document.getElementById('enquiry-phone');
    const serviceInput = document.getElementById('enquiry-service');
    const messageInput = document.getElementById('enquiry-message');
    const submitBtn = serviceEnquiryForm.querySelector('.btn-submit');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
    const successMessage = document.getElementById('enquirySuccessMessage');
    const errorMessageBox = document.getElementById('enquiryErrorMessageBox');
    
    
    // ==========================================
    // VALIDATION FUNCTIONS (Reuse from contact form)
    // ==========================================
    
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.trim());
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    
    // ==========================================
    // SHOW/HIDE ERROR MESSAGES
    // ==========================================
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.setAttribute('aria-invalid', 'true');
    }
    
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.setAttribute('aria-invalid', 'false');
    }
    
    function showConsentError(checkbox, message) {
        const consentCheckbox = checkbox.closest('.consent-checkbox');
        if (!consentCheckbox) return;
        
        consentCheckbox.classList.add('error');
        const errorElement = consentCheckbox.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function hideConsentError(checkbox) {
        const consentCheckbox = checkbox.closest('.consent-checkbox');
        if (!consentCheckbox) return;
        
        consentCheckbox.classList.remove('error');
        const errorElement = consentCheckbox.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    
    // ==========================================
    // REAL-TIME VALIDATION
    // ==========================================
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
            } else if (!validateName(nameInput.value)) {
                showError(nameInput, 'Please enter a valid name');
            } else {
                hideError(nameInput);
            }
        });
        
        nameInput.addEventListener('input', function() {
            if (nameInput.value.trim() && validateName(nameInput.value)) {
                hideError(nameInput);
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                hideError(emailInput);
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() && validateEmail(emailInput.value)) {
                hideError(emailInput);
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (!phoneInput.value.trim()) {
                showError(phoneInput, 'Phone number is required');
            } else if (!validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid 10-digit phone number');
            } else {
                hideError(phoneInput);
            }
        });
        
        phoneInput.addEventListener('input', function(e) {
            // Allow only numbers
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            e.target.value = value;
            
            if (value.trim() && validatePhone(value)) {
                hideError(phoneInput);
            }
        });
    }
    
    if (serviceInput) {
        serviceInput.addEventListener('change', function() {
            if (!serviceInput.value) {
                showError(serviceInput, 'Please select a service');
            } else {
                hideError(serviceInput);
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
            } else if (!validateMessage(messageInput.value)) {
                showError(messageInput, 'Message must be at least 10 characters long');
            } else {
                hideError(messageInput);
            }
        });
        
        messageInput.addEventListener('input', function() {
            if (messageInput.value.trim() && validateMessage(messageInput.value)) {
                hideError(messageInput);
            }
        });
    }
    
    
    // ==========================================
    // FORM SUBMISSION
    // ==========================================
    
    serviceEnquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        if (successMessage) {
            successMessage.style.display = 'none';
            successMessage.classList.remove('show');
        }
        if (errorMessageBox) {
            errorMessageBox.style.display = 'none';
            errorMessageBox.classList.remove('show');
        }
        
        // Validate all fields
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name');
            isValid = false;
        } else {
            hideError(nameInput);
        }
        
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput);
        }
        
        if (!phoneInput.value.trim()) {
            showError(phoneInput, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            hideError(phoneInput);
        }
        
        if (!serviceInput.value) {
            showError(serviceInput, 'Please select a service');
            isValid = false;
        } else {
            hideError(serviceInput);
        }
        
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            hideError(messageInput);
        }
        
        // Validate consent checkboxes
        const consentPromotional = document.getElementById('enquiry-consent-promotional');
        const consentTerms = document.getElementById('enquiry-consent-terms');
        
        if (consentPromotional && !consentPromotional.checked) {
            showConsentError(consentPromotional, 'Please agree to receive promotional communications');
            isValid = false;
        } else if (consentPromotional) {
            hideConsentError(consentPromotional);
        }
        
        if (consentTerms && !consentTerms.checked) {
            showConsentError(consentTerms, 'Please agree to all terms & conditions');
            isValid = false;
        } else if (consentTerms) {
            hideConsentError(consentTerms);
        }
        
        if (!isValid) {
            const firstError = serviceEnquiryForm.querySelector('.form-group.error, .consent-checkbox.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';
        if (submitBtn) submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            service: serviceInput.value,
            serviceText: serviceInput.options[serviceInput.selectedIndex].text,
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Log form data
        console.log('Service Enquiry Data:', formData);
        
        // Open Gmail with form data
        const subject = encodeURIComponent(`Service Enquiry: ${formData.serviceText}`);
        const body = encodeURIComponent(`Hello Banipark Dharmarth Sansthan,

I would like to enquire about your services.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Service Interested In: ${formData.serviceText}

Message:
${formData.message}

Thank you!`);
        
        // Get email from company details
        const companyEmail = companyDetails.email || 'mrdcinfojpr@gmail.com';
        
        // Check if mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            const mailtoLink = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(companyEmail)}&su=${subject}&body=${body}`;
            window.open(gmailUrl, '_blank');
        }
        
        // Hide loading state
        if (btnText) btnText.style.display = 'inline-block';
        if (btnLoader) btnLoader.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
        
        // Show success message
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.classList.add('show');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Reset form
        serviceEnquiryForm.reset();
        
        // Remove all error states
        const formGroups = serviceEnquiryForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
        // Remove consent checkbox error states
        const consentCheckboxes = serviceEnquiryForm.querySelectorAll('.consent-checkbox');
        consentCheckboxes.forEach(checkbox => {
            checkbox.classList.remove('error');
            const errorElement = checkbox.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300);
            }
        }, 5000);
    });
    
});

