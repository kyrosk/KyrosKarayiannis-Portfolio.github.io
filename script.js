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
    const navDotsContainer = document.querySelector('.nav-dots');
    
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
    
    // Function to update navigation dots based on total pages
    function updateNavDots() {
        // Clear existing dots
        navDotsContainer.innerHTML = '';
        
        // Create new dots based on total pages
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'nav-dot';
            if (i === currentPage) {
                dot.classList.add('active');
            }
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentPage = i;
                showProjects();
            });
            navDotsContainer.appendChild(dot);
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
        const navDots = document.querySelectorAll('.nav-dot');
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
    
    // Initialize navigation dots and projects display
    updateNavDots();
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
            updateNavDots();
            showProjects();
        }
    });
    
    // Interactive contact section animations
    const contactMethodItems = document.querySelectorAll('.contact-method-item');
    
    // Add hover effects to contact method items
    if (contactMethodItems) {
        contactMethodItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Add a subtle pulse animation
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                
                // Make the arrow move
                const arrow = this.querySelector('.method-arrow i');
                if (arrow) {
                    arrow.style.transform = 'translateX(5px)';
                    arrow.style.color = 'var(--accent-color)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                const arrow = this.querySelector('.method-arrow i');
                if (arrow) {
                    arrow.style.transform = '';
                    arrow.style.color = '';
                }
            });
            
            // Add click effect
            item.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
    
    // 3D Earth Globe
    const earthCanvas = document.getElementById('earth-globe');
    if (earthCanvas) {
        // Barcelona coordinates
        const barcelonaLat = 41.3851;
        const barcelonaLng = 2.1734;
        
        // Convert latitude and longitude to 3D coordinates
        function latLngToVector3(lat, lng, radius) {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);
            
            const x = -radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            
            return new THREE.Vector3(x, y, z);
        }
        
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, earthCanvas.clientWidth / earthCanvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: earthCanvas, antialias: true, alpha: true });
        renderer.setSize(earthCanvas.clientWidth, earthCanvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Create Earth
        const earthRadius = 5;
        const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
        
        // Load Earth texture
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
        const earthBumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
        const earthSpecMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');
        
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthTexture,
            bumpMap: earthBumpMap,
            bumpScale: 0.05,
            specularMap: earthSpecMap,
            specular: new THREE.Color('grey'),
            shininess: 5
        });
        
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);
        
        // Add clouds
        const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');
        const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.4
        });
        
        const clouds = new THREE.Mesh(
            new THREE.SphereGeometry(earthRadius + 0.1, 64, 64),
            cloudMaterial
        );
        scene.add(clouds);
        
        // Add atmosphere glow
        const atmosphereGeometry = new THREE.SphereGeometry(earthRadius + 0.2, 64, 64);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        scene.add(atmosphere);
        
        // Add Barcelona marker
        const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        
        // Position marker at Barcelona
        const markerPosition = latLngToVector3(barcelonaLat, barcelonaLng, earthRadius + 0.1);
        marker.position.set(markerPosition.x, markerPosition.y, markerPosition.z);
        scene.add(marker);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);
        
        // Set camera position
        camera.position.z = 10;
        
        // Variables for rotation and zoom
        let isHovering = false;
        let targetRotation = { x: 0, y: 0 };
        let currentRotation = { x: 0, y: 0 };
        let targetZoom = 10;
        let currentZoom = 10;
        let rotationSpeed = 0.005;
        
        // Add hover event listeners
        earthCanvas.addEventListener('mouseenter', () => {
            isHovering = true;
            
            // Calculate rotation needed to show Barcelona
            const barcelonaPosition = latLngToVector3(barcelonaLat, barcelonaLng, earthRadius);
            const vector = barcelonaPosition.clone().normalize();
            
            targetRotation.y = Math.atan2(vector.x, vector.z);
            targetRotation.x = Math.atan2(vector.y, Math.sqrt(vector.x * vector.x + vector.z * vector.z));
            
            // Zoom in
            targetZoom = 7;
        });
        
        earthCanvas.addEventListener('mouseleave', () => {
            isHovering = false;
            targetRotation = { x: 0, y: 0 };
            targetZoom = 10;
        });
        
        // Click to open Google Maps
        earthCanvas.addEventListener('click', () => {
            window.open('https://www.google.com/maps/place/Barcelona,+Spain', '_blank');
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Smooth rotation
            if (!isHovering) {
                // Auto-rotate when not hovering
                earth.rotation.y += rotationSpeed;
                clouds.rotation.y += rotationSpeed * 1.1;
            } else {
                // Smooth transition to target rotation
                currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
                currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
                
                earth.rotation.x = currentRotation.x;
                earth.rotation.y = currentRotation.y;
                
                clouds.rotation.x = currentRotation.x;
                clouds.rotation.y = currentRotation.y;
            }
            
            // Smooth zoom
            currentZoom += (targetZoom - currentZoom) * 0.05;
            camera.position.z = currentZoom;
            
            // Pulse animation for marker
            const time = Date.now() * 0.001;
            marker.scale.set(
                1 + Math.sin(time * 2) * 0.1,
                1 + Math.sin(time * 2) * 0.1,
                1 + Math.sin(time * 2) * 0.1
            );
            
            renderer.render(scene, camera);
        }
        
        // Handle window resize
        function onWindowResize() {
            camera.aspect = earthCanvas.clientWidth / earthCanvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(earthCanvas.clientWidth, earthCanvas.clientHeight);
        }
        
        window.addEventListener('resize', onWindowResize);
        
        // Start animation
        animate();
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
