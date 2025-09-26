// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Color selector functionality
    const colorOptions = document.querySelectorAll('.color-option');
    const phoneImage = document.getElementById('phone-image');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Change phone image based on selected color
            const color = this.getAttribute('data-color');
            phoneImage.src = `images/phone-${color}.png`;
        });
    });
    
    // Gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('gallery-main');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image
            mainImage.src = this.src;
        });
    });
    
    // Form validation
    const preOrderForm = document.getElementById('pre-order-form');
    
    preOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const storage = document.getElementById('storage');
        const color = document.getElementById('color');
        
        // Simple validation
        let isValid = true;
        
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else {
            removeError(phone);
        }
        
        if (storage.value === '') {
            showError(storage, 'Please select a storage option');
            isValid = false;
        } else {
            removeError(storage);
        }
        
        if (color.value === '') {
            showError(color, 'Please select a color');
            isValid = false;
        } else {
            removeError(color);
        }
        
        // If form is valid, show success message
        if (isValid) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your pre-order! We will contact you soon.';
            
            // Insert success message after form
            preOrderForm.parentNode.insertBefore(successMessage, preOrderForm.nextSibling);
            
            // Reset form
            preOrderForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
    
    // Helper functions
    function showError(input, message) {
        const formGroup = input.parentNode;
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        formGroup.appendChild(error);
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentNode;
        const error = formGroup.querySelector('.error-message');
        
        if (error) {
            error.remove();
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});