// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'שולח...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showMessage('הודעתך התקבלה בהצלחה! נחזור אליך בהקדם.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\-\+]{9,15}$/;

    if (!data.name.trim()) {
        showMessage('אנא הזן שם מלא', 'error');
        return false;
    }

    if (!emailRegex.test(data.email)) {
        showMessage('אנא הזן כתובת דואר אלקטרוני תקינה', 'error');
        return false;
    }

    if (!phoneRegex.test(data.phone)) {
        showMessage('אנא הזן מספר טלפון תקין', 'error');
        return false;
    }

    if (!data.subject) {
        showMessage('אנא בחר נושא הפנייה', 'error');
        return false;
    }

    if (!data.message.trim()) {
        showMessage('אנא הזן הודעה', 'error');
        return false;
    }

    return true;
}

// Message display function
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    const container = document.querySelector('.contact .container');
    container.insertBefore(messageDiv, container.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.expertise-card, .article-card, .about-content, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add hover effect to expertise cards
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 5px 20px var(--shadow-color)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 3px 15px var(--shadow-color)';
    });
});

// Add hover effect to article cards
document.querySelectorAll('.article-card').forEach(article => {
    article.addEventListener('mouseenter', () => {
        article.style.transform = 'translateY(-5px)';
        article.style.boxShadow = '0 5px 20px var(--shadow-color)';
    });

    article.addEventListener('mouseleave', () => {
        article.style.transform = 'translateY(0)';
        article.style.boxShadow = '0 3px 15px var(--shadow-color)';
    });
});

// Add smooth transitions to form inputs
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--accent-color)';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = 'var(--border-color)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.cta-button, .secondary-button, .submit-button').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(2px)';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Expandable Articles
document.querySelectorAll('.article-header').forEach(header => {
    header.addEventListener('click', () => {
        const articleCard = header.parentElement;
        const isActive = articleCard.classList.contains('active');
        
        // Close all other articles
        document.querySelectorAll('.article-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Toggle current article
        if (!isActive) {
            articleCard.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
} 