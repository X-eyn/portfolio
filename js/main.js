// DOM Elements
const cursor = document.querySelector('.cursor');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const allLinks = document.querySelectorAll('a');
const skillBars = document.querySelectorAll('.progress');
const statNumbers = document.querySelectorAll('.stat-number');
const nodesContainer = document.querySelector('.nodes-container');

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom cursor
    initCursor();
    
    // Initialize menu button
    initMenuButton();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Initialize neural network animation
    if (nodesContainer) {
        initNeuralNetwork();
    }
    
    // Initialize form submission
    initContactForm();
    
    // Initialize Neural Network
    const neuralNetwork = new NeuralNetwork();
    
    // Initialize Parallax
    const parallax = new ParallaxEffect();
    
    // Initialize Skill Progress
    const skillProgress = new SkillProgress();
    
    // Initialize Smooth Scroll
    const smoothScroll = new SmoothScroll();
    
    // Initialize Text Scramble for hero title
    const phrases = [
        'Crafting the Future with AI',
        'Building Intelligent Systems',
        'Pushing AI Boundaries',
        'Innovating with Machine Learning'
    ];
    const heroTitle = document.querySelector('.hero h1');
    const fx = new TextScramble(heroTitle);
    let counter = 0;
    
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 3000);
        });
        counter = (counter + 1) % phrases.length;
    };
    
    next();
});

// Custom cursor
function initCursor() {
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Add hover effect to all links
    allLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'transparent';
            cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// Menu button toggle
function initMenuButton() {
    if (!menuBtn) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Add scroll event listener for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Animate skill bars when in viewport
        animateOnScroll();
    });
    
    // Initial check
    animateOnScroll();
}

// Animate elements when they come into viewport
function animateOnScroll() {
    // Animate skill bars
    skillBars.forEach(bar => {
        if (isInViewport(bar)) {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = `${percent}%`;
        }
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Stats counter animation
function initStatsCounter() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        animateCount(stat, 0, target, 2000);
    });
}

function animateCount(element, start, end, duration) {
    if (isInViewport(element)) {
        let current = start;
        const increment = Math.ceil((end - start) / (duration / 50));
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            }
        }, 50);
    } else {
        // If not in viewport, check again when scrolling
        window.addEventListener('scroll', () => {
            if (isInViewport(element) && element.textContent === '0') {
                animateCount(element, 0, end, 2000);
            }
        });
    }
}

// Neural network animation
function initNeuralNetwork() {
    // Create nodes and connections for neural network visualization
    const numNodes = 30;
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        
        // Store position for connections
        nodes.push({ element: node, x, y });
        nodesContainer.appendChild(node);
    }
    
    // Create connections between nodes (not all nodes, just some)
    for (let i = 0; i < numNodes; i++) {
        // Connect to 2-3 random nodes
        const numConnections = Math.floor(Math.random() * 2) + 2;
        
        for (let j = 0; j < numConnections; j++) {
            const targetIndex = Math.floor(Math.random() * numNodes);
            
            if (targetIndex !== i) {
                createConnection(nodes[i], nodes[targetIndex]);
            }
        }
    }
    
    // Animate nodes
    animateNodes(nodes);
}

function createConnection(node1, node2) {
    const connection = document.createElement('div');
    connection.classList.add('connection');
    
    // Calculate distance and angle
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Position and rotate the connection
    connection.style.width = `${distance}%`;
    connection.style.left = `${node1.x}%`;
    connection.style.top = `${node1.y}%`;
    connection.style.transform = `rotate(${angle}deg)`;
    
    nodesContainer.appendChild(connection);
}

function animateNodes(nodes) {
    nodes.forEach(node => {
        // Random gentle movement
        const duration = 5 + Math.random() * 5; // 5-10 seconds
        const xMovement = 3 + Math.random() * 2; // 3-5% movement
        const yMovement = 3 + Math.random() * 2;
        
        // Set animation
        node.element.style.transition = `left ${duration}s ease-in-out, top ${duration}s ease-in-out`;
        
        // Animate continuously
        setInterval(() => {
            // New position that gently moves around original position
            const newX = node.x + (Math.random() * xMovement * 2 - xMovement);
            const newY = node.y + (Math.random() * yMovement * 2 - yMovement);
            
            // Keep within bounds
            const boundedX = Math.max(0, Math.min(100, newX));
            const boundedY = Math.max(0, Math.min(100, newY));
            
            node.element.style.left = `${boundedX}%`;
            node.element.style.top = `${boundedY}%`;
        }, duration * 1000);
    });
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // For demo purposes, just log the values
        console.log('Form submitted!', { name, email, subject, message });
        
        // Show success message (in a real application, you would send this data to a server)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset the form
        contactForm.reset();
    });
}

// Neural Network Animation
class NeuralNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.querySelector('.neural-network');
        if (!this.container) return;
        
        this.container.appendChild(this.canvas);
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
        this.createConnections();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(dpr, dpr);
    }

    createParticles() {
        const numParticles = Math.min(50, Math.floor((this.width * this.height) / 15000));
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1 + 1,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                originalX: Math.random() * this.width,
                originalY: Math.random() * this.height,
            });
        }
    }

    createConnections() {
        this.connections = [];
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                if (Math.random() < 0.1) {
                    this.connections.push([i, j]);
                }
            }
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
            this.createConnections();
        });

        this.container.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 80) {
                const force = (80 - dist) / 80;
                particle.vx -= dx * force * 0.01;
                particle.vy -= dy * force * 0.01;
            }
            
            const dx2 = particle.originalX - particle.x;
            const dy2 = particle.originalY - particle.y;
            particle.vx += dx2 * 0.005;
            particle.vy += dy2 * 0.005;
            
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(10, 132, 255, 0.8)';
            this.ctx.fill();
        });
        
        // Draw connections
        this.connections.forEach(([i, j]) => {
            const p1 = this.particles[i];
            const p2 = this.particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.strokeStyle = `rgba(10, 132, 255, ${0.2 * (1 - dist / 100)})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.parallax');
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.update());
        window.addEventListener('resize', () => this.update());
    }

    update() {
        this.elements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const rect = element.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView) {
                const yOffset = window.pageYOffset - rect.top;
                const parallax = yOffset * speed;
                element.style.transform = `translate3d(0, ${parallax}px, 0)`;
            }
        });
    }
}

// Skill Progress Animation
class SkillProgress {
    constructor() {
        this.cards = document.querySelectorAll('.skill-card');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-animate');
                }
            });
        }, options);

        this.cards.forEach(card => observer.observe(card));
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// 1. 3D Card Tilt Effect
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.skill-card, .project-card');
        this.setupCards();
    }

    setupCards() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
    }
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 30;
    const angleY = (centerX - x) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s';
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s';
}

// 2. Magnetic Button Effect
class MagneticEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.setupButtons();
    }

    setupButtons() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = x - centerX;
                const deltaY = y - centerY;
                
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = Math.max(rect.width, rect.height);
                
                if (distance < maxDistance) {
                    const angle = Math.atan2(deltaY, deltaX);
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = Math.cos(angle) * force * 10;
                    const moveY = Math.sin(angle) * force * 10;
                    
                    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// 3. Animated Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursorDot);
        
        this.setupCursor();
    }

    setupCursor() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            this.cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Hover effect on interactive elements
        const interactives = document.querySelectorAll('a, button, .skill-card, .project-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorDot.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorDot.classList.remove('cursor-hover');
            });
        });
    }
}

// 4. Text Glitch Effect
class GlitchEffect {
    constructor() {
        this.glitchTexts = document.querySelectorAll('.glitch-text');
        this.setupGlitch();
    }

    setupGlitch() {
        this.glitchTexts.forEach(text => {
            const originalText = text.textContent;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            
            text.addEventListener('mouseenter', () => {
                let iterations = 0;
                const maxIterations = 10;
                
                const interval = setInterval(() => {
                    text.textContent = originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iterations || char === ' ') return char;
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('');
                    
                    iterations += 1/3;
                    
                    if (iterations >= maxIterations) {
                        clearInterval(interval);
                        text.textContent = originalText;
                    }
                }, 30);
            });
        });
    }
}

// 5. Particle Connection Effect
class ParticleConnections {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }

    createParticles() {
        this.particles = [];
        const numParticles = Math.min(50, Math.floor((this.width * this.height) / 20000));
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1 + 0.5,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(10, 132, 255, 0.5)';
            this.ctx.fill();
            
            // Connect particles
            this.particles.forEach(otherParticle => {
                const dx = otherParticle.x - particle.x;
                const dy = otherParticle.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(10, 132, 255, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
            
            // Connect to mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = `rgba(50, 215, 75, ${0.3 * (1 - distance / 150)})`;
                this.ctx.stroke();
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Previous initializations
    const neuralNetwork = new NeuralNetwork();
    const smoothScroll = new SmoothScroll();
    const scrollAnimations = new ScrollAnimations();
    
    // New effects
    const tiltEffect = new TiltEffect();
    const magneticEffect = new MagneticEffect();
    const customCursor = new CustomCursor();
    const glitchEffect = new GlitchEffect();
    const particleConnections = new ParticleConnections();
    
    // Form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully!');
            form.reset();
        });
    }
});
