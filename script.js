document.addEventListener('DOMContentLoaded', function () {
    // Initialize loader
    const loader = document.querySelector('.loader-container');
    
    // Hide loader after page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500); // Show loader for at least 1.5 seconds
    });
    
    // Initialize Three.js background
    initThreeJsBackground();
    
    // Initialize particles
    initParticles();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Projects navigation
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const navDots = document.querySelectorAll('.nav-dot');
    
    let projectsPerPage = getProjectsPerPage();
    let currentPage = 0;
    let totalPages = Math.ceil(projectCards.length / projectsPerPage);
    
    function getProjectsPerPage() {
        if (window.innerWidth < 768) {
            return 1;
        } else if (window.innerWidth < 1024) {
            return 2;
        } else {
            return 3;
        }
    }
    
    function showProjects() {
        projectCards.forEach((card, index) => {
            if (index >= currentPage * projectsPerPage && index < (currentPage + 1) * projectsPerPage) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active dot
        navDots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
        } else {
            currentPage = 0;
        }
        showProjects();
    }
    
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
        } else {
            currentPage = totalPages - 1;
        }
        showProjects();
    }
    
    // Initialize projects display
    showProjects();
    
    // Add event listeners for project navigation
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPage = index;
            showProjects();
        });
    });
    
    // Update projects per page on window resize
    window.addEventListener('resize', () => {
        const newProjectsPerPage = getProjectsPerPage();
        if (newProjectsPerPage !== projectsPerPage) {
            projectsPerPage = newProjectsPerPage;
            totalPages = Math.ceil(projectCards.length / projectsPerPage);
            if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }
            showProjects();
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Reset the form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
});

// Three.js background initialization
function initThreeJsBackground() {
    const canvas = document.getElementById('bg-canvas');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x0ea5e9, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create grid of cubes
    const cubeSize = 0.5;
    const gap = 15;
    const gridSize = 10;
    const cubes = [];
    
    for (let x = -gridSize; x <= gridSize; x += gap) {
        for (let z = -gridSize; z <= gridSize; z += gap) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x0ea5e9,
                transparent: true,
                opacity: 0.5,
                wireframe: true
            });
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, 0, z - 50);
            cube.userData = {
                originalY: 0,
                speed: 0.01 + Math.random() * 0.03,
                amplitude: 0.5 + Math.random() * 1.5
            };
            
            scene.add(cube);
            cubes.push(cube);
        }
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate cubes
        cubes.forEach(cube => {
            const { originalY, speed, amplitude } = cube.userData;
            cube.position.y = originalY + Math.sin(Date.now() * speed) * amplitude;
            cube.rotation.x += 0.003;
            cube.rotation.y += 0.005;
        });
        
        // Rotate camera slightly
        camera.position.x = Math.sin(Date.now() * 0.0001) * 3;
        camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
        camera.lookAt(0, 0, -50);
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Initialize particles.js
function initParticles() {
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
                value: '#0ea5e9'
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
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0ea5e9',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
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
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
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
