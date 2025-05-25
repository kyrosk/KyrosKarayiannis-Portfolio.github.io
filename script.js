document.addEventListener('DOMContentLoaded', function () {
    // Initialize Barcelona Globe
    initBarcelonaGlobe();
    
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
    
    // Projects carousel functionality
    const projectsContainer = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const navDotsContainer = document.querySelector('.nav-dots');
    
    // Hide all projects initially
    projectCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Determine how many projects to show based on screen size
    function getProjectsPerPage() {
        if (window.innerWidth < 768) {
            return 1; // Show 1 project on mobile
        } else if (window.innerWidth < 1024) {
            return 2; // Show 2 projects on tablet
        } else {
            return 3; // Show 3 projects on desktop
        }
    }
    
    let currentPage = 0;
    let projectsPerPage = getProjectsPerPage();
    let totalPages = Math.ceil(projectCards.length / projectsPerPage);
    
    // Create navigation dots
    function createNavDots() {
        navDotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'nav-dot';
            if (i === currentPage) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentPage = i;
                updateCarousel();
            });
            navDotsContainer.appendChild(dot);
        }
    }
    
    // Show current page of projects
    function updateCarousel() {
        // Hide all projects
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show current page projects
        const startIndex = currentPage * projectsPerPage;
        const endIndex = Math.min(startIndex + projectsPerPage, projectCards.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            projectCards[i].style.display = 'block';
        }
        
        // Update active dot
        const dots = navDotsContainer.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Next page
    function goToNextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
        } else {
            currentPage = 0; // Loop back to first page
        }
        updateCarousel();
    }
    
    // Previous page
    function goToPrevPage() {
        if (currentPage > 0) {
            currentPage--;
        } else {
            currentPage = totalPages - 1; // Loop to last page
        }
        updateCarousel();
    }
    
    // Initialize carousel
    createNavDots();
    updateCarousel();
    
    // Event listeners
    nextBtn.addEventListener('click', goToNextPage);
    prevBtn.addEventListener('click', goToPrevPage);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newProjectsPerPage = getProjectsPerPage();
        if (newProjectsPerPage !== projectsPerPage) {
            projectsPerPage = newProjectsPerPage;
            totalPages = Math.ceil(projectCards.length / projectsPerPage);
            
            // Ensure current page is valid
            if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }
            
            createNavDots();
            updateCarousel();
        }
    });
    
    // Auto-advance carousel
    let carouselInterval = setInterval(goToNextPage, 6000);
    
    // Stop auto-advance on user interaction
    [nextBtn, prevBtn, navDotsContainer].forEach(el => {
        el.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        el.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(goToNextPage, 6000);
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
            updateNavDots();
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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('background').appendChild(renderer.domElement);
    
    // Create cubes
    const cubes = [];
    const cubeCount = 50;
    
    for (let i = 0; i < cubeCount; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x0ea5e9,
            wireframe: true,
            transparent: true,
            opacity: 0.1 + Math.random() * 0.2
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Random position
        cube.position.x = Math.random() * 40 - 20;
        cube.position.y = Math.random() * 40 - 20;
        cube.position.z = Math.random() * 40 - 20;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        // Random size
        const scale = Math.random() * 2 + 0.5;
        cube.scale.set(scale, scale, scale);
        
        // Random rotation speed
        cube.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            }
        };
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    camera.position.z = 15;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate cubes
        cubes.forEach(cube => {
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Barcelona Globe
function initBarcelonaGlobe() {
    // Create a globe using Three.js
    const globeContainer = document.getElementById('barcelona-globe');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Set renderer size to match container
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);
    globeContainer.appendChild(renderer.domElement);
    
    // Create the globe sphere
    const globeRadius = 150;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const bumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
    const specularMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
    
    // Create material with textures
    const globeMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpMap,
        bumpScale: 2,
        specularMap: specularMap,
        specular: new THREE.Color('grey'),
        shininess: 10
    });
    
    // Create the globe mesh
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    
    // Barcelona coordinates (approximate)
    const barcelonaLat = 41.3851;
    const barcelonaLng = 2.1734;

    // Initial rotation to bring Barcelona to the front
    // Theta for latLngToVector3 is (lng + 180) * PI/180. We want effective theta to be PI/2 for front-facing Z.
    const initialGlobeRotationY = Math.PI / 2 - (barcelonaLng + 180) * (Math.PI / 180);
    globe.rotation.y = initialGlobeRotationY;

    // Optional: Apply Earth's axial tilt (e.g., around Z if Y is polar axis and X is right)
    // const earthAxialTilt = 23.5 * (Math.PI / 180);
    // globe.rotation.z = earthAxialTilt;

    scene.add(globe); // Add the rotated globe to the scene
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Convert lat/lng to 3D position on sphere (relative to globe's local space)
    const barcelonaPosition = latLngToVector3(barcelonaLat, barcelonaLng, globeRadius + 2); // marker slightly above surface
    
    // Create a single pulsing UAV-like marker for Barcelona
    const pulseGeometry = new THREE.SphereGeometry(8, 16, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0x9c27b0, // Purple color
        transparent: true,
        opacity: 0.7
    });
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulse.position.copy(barcelonaPosition);
    pulse.userData.isBarcelonaMarker = true; // Flag for raycasting
    globe.add(pulse); // Add pulse as a child of the globe
    
    // Create tooltip for Barcelona marker
    const tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'marker-tooltip';
    tooltipDiv.innerHTML = '<h4>Barcelona, Spain</h4><p>Current Location</p>';
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.display = 'none';
    tooltipDiv.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
    tooltipDiv.style.backdropFilter = 'blur(10px)';
    tooltipDiv.style.padding = '10px 15px';
    tooltipDiv.style.borderRadius = '8px';
    tooltipDiv.style.minWidth = '150px';
    tooltipDiv.style.textAlign = 'center';
    tooltipDiv.style.border = '1px solid #0ea5e9';
    tooltipDiv.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    tooltipDiv.style.zIndex = '1000';
    tooltipDiv.style.pointerEvents = 'none';
    document.body.appendChild(tooltipDiv);
    
    // Create atmospheric glow
    const glowGeometry = new THREE.SphereGeometry(globeRadius + 10, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            'c': { type: 'f', value: 0.2 },
            'p': { type: 'f', value: 5.0 },
            'glowColor': { type: 'c', value: new THREE.Color(0x0ea5e9) },
            'viewVector': { type: 'v3', value: camera.position }
        },
        vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main() {
                vec3 vNormal = normalize(normal);
                vec3 vNormel = normalize(viewVector);
                intensity = pow(c - dot(vNormal, vNormel), p);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4(glow, 1.0);
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
    
    // Position camera
    camera.position.z = 350;
    
    // Add orbit controls for interactivity
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enablePan = false;
    controls.minDistance = 250;
    controls.maxDistance = 450;
    
    // Set up raycaster for marker hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject = null;
    
    // Add mouse move event listener
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    
    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersections with the marker
        const intersects = raycaster.intersectObjects(globe.children, true);
        
        // Check if we're hovering over the Barcelona marker
        if (intersects.length > 0 && intersects[0].object.userData.isBarcelonaMarker) {
            if (!hoveredObject) {
                hoveredObject = intersects[0].object;
                document.body.style.cursor = 'pointer';
                
                // Show tooltip
                const vector = new THREE.Vector3();
                vector.setFromMatrixPosition(hoveredObject.matrixWorld);
                vector.project(camera);
                
                const rect = renderer.domElement.getBoundingClientRect();
                const x = rect.left + (vector.x * 0.5 + 0.5) * rect.width;
                const y = rect.top + (vector.y * -0.5 + 0.5) * rect.height;
                
                tooltipDiv.style.display = 'block';
                tooltipDiv.style.left = `${x - tooltipDiv.offsetWidth/2}px`;
                tooltipDiv.style.top = `${y - tooltipDiv.offsetHeight - 20}px`;
            }
        } else if (hoveredObject) {
            hoveredObject = null;
            document.body.style.cursor = 'auto';
            tooltipDiv.style.display = 'none';
        }
    }
    
    // Add stars in the background
    const stars = [];
    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const radius = 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radius * Math.cos(phi);
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    
    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate globe slowly
        // globe.rotation.y += 0.001; // Removed auto-rotation
        
        // Pulse animation for UAV-like marker
        time += 0.03;
        pulse.scale.set(
            1 + 0.3 * Math.sin(time),
            1 + 0.3 * Math.sin(time),
            1 + 0.3 * Math.sin(time)
        );
        
        // Update controls
        controls.update();
        
        // Update glow shader
        glowMaterial.uniforms.viewVector.value = new THREE.Vector3().subVectors(
            camera.position,
            glowMesh.position
        );
        
        // Update tooltip position if marker is hovered
        if (hoveredObject) {
            const vector = new THREE.Vector3();
            vector.setFromMatrixPosition(hoveredObject.matrixWorld);
            vector.project(camera);
            
            const rect = renderer.domElement.getBoundingClientRect();
            const x = rect.left + (vector.x * 0.5 + 0.5) * rect.width;
            const y = rect.top + (vector.y * -0.5 + 0.5) * rect.height;
            
            tooltipDiv.style.left = `${x - tooltipDiv.offsetWidth/2}px`;
            tooltipDiv.style.top = `${y - tooltipDiv.offsetHeight - 20}px`;
        }
        
        renderer.render(scene, camera);
    }
    
    // Helper function to convert latitude/longitude to 3D vector
    function latLngToVector3(lat, lng, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }
    
    // Handle window resize
    function handleResize() {
        const width = globeContainer.clientWidth;
        const height = globeContainer.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
}

// Initialize particles.js with tech-style animations
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 120,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ['#0ea5e9', '#8b5cf6', '#10b981']
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
                value: 0.6,
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
                color: '#0ea5e9',
                opacity: 0.4,
                width: 1,
                shadow: {
                    enable: true,
                    blur: 5,
                    color: '#0ea5e9'
                }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
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
                    distance: 180,
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
