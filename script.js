document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#0bff7e'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#0bff7e',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Initialize Typed.js for typing animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const typed = new Typed(typingElement, {
            strings: [
                'Software Engineer',
                'Problem Solver',
                'Tech Enthusiast',
                'Creative Thinker'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 1000,
            loop: true
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Animate menu bars
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project modal functionality
    const projectModal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const closeModal = document.querySelector('.close-modal');
    const projectButtons = document.querySelectorAll('.project-details-btn');

    // Project data
    const projectData = [
        {
            title: 'Hear and Avoid - Smart Gadget',
            description: 'Sensor prototype design to help people with hearing problems avoiding loud sounds from surroundings. Using 3 light and sound sensors, raspberry Pi, grove Pi and a representation of a human head, the project with the usage of python programming language, successfully presented a prototype that can be deployed in the real world.',
            tech: ['Python', 'Raspberry Pi', 'IoT', 'Sensors']
        },
        {
            title: 'Smart Home Device Security',
            description: 'As part of my dissertation for the successful completion of my Masters degree, I created an interactive prototype using Figma to provide smart homes privacy and security as well as the ability to manipulate, secure and control the data of their smart home devices. Alongside with data safety, the dissertation examined ways to support users\'s security through different frameworks applied in the prototype.',
            tech: ['Figma', 'UI/UX', 'Smart Home', 'Security']
        },
        {
            title: 'Opportunistic Routing Protocols',
            description: 'Using ONE simulator, I evaluated the performance of opportunistic routing protocols (epidemic and spray and wait) through an emergency scenario. This project aimed to find out if and how such protocols can be developed and used in real-life situations where mobile networks are not available due to high-traffic zones and transfer emergency messages to local authorities.',
            tech: ['ONE Simulator', 'Networking', 'Research', 'Emergency Systems']
        },
        {
            title: 'CHATTY: Modern Chatbot',
            description: 'Created a chatbot using NLP and python containing: identity manager, salute function and small talk, information retrieval, question answering and intent matching.',
            tech: ['Python', 'NLP', 'AI', 'Machine Learning']
        },
        {
            title: 'Understanding Credit Web',
            description: 'As a module for the 2nd year of my University degree I and 4 other people created and developed a website for the Experian company, located in the UK. The aim of the website was to create a simulator for Credit scores.',
            tech: ['Web Development', 'Finance', 'Team Project', 'Simulation']
        },
        {
            title: 'Nottingham Forest - From Then to Now',
            description: 'Created a locative experience using various tools as people could walk through the city of Nottingham, triggering locations and hearing different stories associated with the history of Nottingham Forest F.C and Nottingham city.',
            tech: ['Location-based', 'Interactive', 'Storytelling', 'History']
        }
    ];

    // Open modal with project details
    projectButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const project = projectData[index];
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            // Clear and populate tech tags
            modalTech.innerHTML = '';
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalTech.appendChild(span);
            });
            
            // Show modal with animation
            projectModal.style.display = 'flex';
            setTimeout(() => {
                projectModal.style.opacity = '1';
            }, 10);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            projectModal.style.opacity = '0';
            setTimeout(() => {
                projectModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    }

    // Close modal when clicking outside content
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal.click();
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Reset form and show success message
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
});