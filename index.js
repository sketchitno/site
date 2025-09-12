
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Portfolio filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Testimonial slider
        const testimonials = [
            {
                text: " The website designed by Sketchno Technologies for Zeina Mehandi exceeded my expectations. It’s elegant, user-friendly, and responsive on all devices. I loved the attention to detail and the professional approach. I would definitely recommend them to anyone looking for a high-quality website. ",
                name: "Famitha Saina",
                position: "CEO, Zeina Mehandi",
            },
            {
                text: " The product label designs created by Sketchno Technologies for Uniclean Chemicals exceeded my expectations. They delivered designs that were clean, modern, and perfectly aligned with our brand identity. The team’s creativity, attention to detail, and professional approach truly stood out. I would highly recommend Sketchno Technologies to anyone looking for top-quality design services. ",
                name: "Faris",
                position: "Founder, Uniclean Chemicals",
            },
            {
                text: " The travel video edited by Sketchno Technologies went beyond my expectations. The final look is absolutely beautiful, with smooth transitions and a professional touch. I truly loved the creativity and attention to detail they put into it. I would definitely recommend Sketchno Technologies to anyone looking for high-quality video editing. ",
                name: "uvais",
                position: "student",
            }
        ];
        
        let currentTestimonial = 0;
        const testimonialElement = document.querySelector('.testimonial');
        const sliderDots = document.querySelectorAll('.slider-dot');
        
        function showTestimonial(index) {
            const testimonial = testimonials[index];
            testimonialElement.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            `;
            
            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        

        // Add animation on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

window.addEventListener("load", () => {
  document.getElementById("preloader").classList.add("hidden");
});

// Force remove after 3 seconds (fallback)
setTimeout(() => {
  document.getElementById("preloader").classList.add("hidden");
}, 5000);

const btn = document.querySelector('.client-login-btn');
btn.addEventListener('click', () => {
    window.location.href = 'login.html';
});
