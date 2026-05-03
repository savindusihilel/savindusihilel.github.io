document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
            mobileMenu.setAttribute('aria-expanded', !expanded);
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('nav-active');
            if (mobileMenu) mobileMenu.setAttribute('aria-expanded', 'false');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.email-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                if (formStatus) {
                    formStatus.style.display = 'block';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            }, 1500);
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('site-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            document.querySelectorAll('section').forEach(section => {
                const title = section.querySelector('.section-title, h1');
                const titleMatch = title && title.innerText.toLowerCase().includes(term);

                const searchableElements = section.querySelectorAll('.glass-card:not(.contact-container), .timeline-item, .tool-item');
                
                let hasVisibleElement = false;

                if (searchableElements.length > 0) {
                    searchableElements.forEach(el => {
                        const text = el.innerText.toLowerCase();
                        if (titleMatch || text.includes(term)) {
                            el.style.display = '';
                            hasVisibleElement = true;
                        } else {
                            el.style.display = 'none';
                        }
                    });
                }

                // If no specific searchable elements or if none matched but section text matches
                if (searchableElements.length === 0 || (!hasVisibleElement && section.innerText.toLowerCase().includes(term))) {
                    if (titleMatch || section.innerText.toLowerCase().includes(term)) {
                        hasVisibleElement = true;
                        // If we are showing the section because its general text matched, show all its searchable elements too
                        searchableElements.forEach(el => el.style.display = '');
                    }
                }

                section.style.display = hasVisibleElement ? '' : 'none';
            });
            
            // Handle doc groups to hide empty ones
            document.querySelectorAll('.doc-group').forEach(group => {
                const docs = group.querySelectorAll('.doc-card');
                if (docs.length > 0) {
                    const hasVisible = Array.from(docs).some(doc => doc.style.display !== 'none');
                    group.style.display = hasVisible ? '' : 'none';
                }
            });
        });
    }
});
