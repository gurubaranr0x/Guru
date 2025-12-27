import './style.css'

import Lenis from 'lenis'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis smooth scrolling
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle')
const body = document.body

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark'
body.setAttribute('data-theme', savedTheme)

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

  body.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
})

// Nav Scroll Logic
const nav = document.querySelector('nav')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal')

revealElements.forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power4.out'
  })
})

// Editorial Skills Animation
const skillRows = document.querySelectorAll('.editorial-row')

skillRows.forEach((row) => {
  gsap.fromTo(row.querySelectorAll('.skill-word'),
    { opacity: 0, y: 20 },
    {
      scrollTrigger: {
        trigger: row,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0.5,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.out'
    }
  )
})

// Spotlight Effect Logic
const spotlightCards = document.querySelectorAll('.spotlight-card')

spotlightCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  })
})

// Entrance Animation for Spotlight Cards
gsap.fromTo('.spotlight-card',
  { opacity: 0, y: 30 },
  {
    scrollTrigger: {
      trigger: '.spotlight-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  }
)

// Hero Animation
const heroTl = gsap.timeline()

heroTl.to('.status-badge', {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power4.out',
  delay: 0.5
})

heroTl.to('.hero-intro', {
  opacity: 0.6,
  y: 0,
  duration: 1,
  ease: 'power4.out'
}, '-=0.6')

heroTl.to('.hero-name', {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: 'expo.out'
}, '-=0.8')

heroTl.to('.hero-description, .hero-actions', {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.1,
  ease: 'power4.out'
}, '-=0.8')

heroTl.to('.hero-visual', {
  opacity: 1,
  x: 0,
  duration: 1.5,
  ease: 'power4.out'
}, '-=1.2')

heroTl.to('.hero-scroll-indicator', {
  opacity: 1,
  duration: 1,
  ease: 'power4.out'
}, '-=0.5')

// Hero Mouse Interaction
window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e
  const x = (clientX / window.innerWidth) * 100
  const y = (clientY / window.innerHeight) * 100

  gsap.to('.hero-luxury', {
    '--mouse-x': `${x}%`,
    '--mouse-y': `${y}%`,
    duration: 1,
    ease: 'power2.out'
  })
})

// Timeline Animation
gsap.to('.timeline-progress', {
  scrollTrigger: {
    trigger: '.projects-timeline',
    start: 'top center',
    end: 'bottom center',
    scrub: true
  },
  height: '100%',
  ease: 'none'
})

// Timeline Item Dots Animation
const timelineItems = document.querySelectorAll('.timeline-item')
timelineItems.forEach(item => {
  const dot = item.querySelector('.timeline-dot')
  gsap.to(dot, {
    scrollTrigger: {
      trigger: item,
      start: 'top center',
      toggleActions: 'play none none reverse'
    },
    scale: 1.5,
    backgroundColor: 'var(--text-color)',
    duration: 0.4
  })
})

// Hero Scroll Parallax
gsap.to('.hero-luxury-grid', {
  scrollTrigger: {
    trigger: '.hero-luxury',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 100,
  opacity: 0,
  ease: 'none'
})

// Three.js Hero Animation
import * as THREE from 'three'

const initHeroThree = () => {
  const canvas = document.querySelector('#hero-canvas')
  if (!canvas) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Shared Noise Function for Shaders
  const noiseGLSL = `
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }
  `

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying float vNoise;

    ${noiseGLSL}

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Organic vertex displacement
      float noise = snoise(vec3(normal * 1.5 + uTime * 0.3));
      vNoise = noise;
      
      vec3 newPosition = position + normal * noise * 0.15;
      
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying float vNoise;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);

      // Color Palette (Deep Space Iridescence)
      vec3 color1 = vec3(0.05, 0.1, 0.5); // Deep Blue
      vec3 color2 = vec3(0.4, 0.0, 0.8); // Electric Purple
      vec3 color3 = vec3(0.8, 0.2, 0.6); // Hot Pink
      vec3 color4 = vec3(0.9, 0.9, 1.0); // Pure White Highlight

      // Mix colors based on vertex noise and fresnel
      vec3 finalColor = mix(color1, color2, vNoise * 0.5 + 0.5);
      finalColor = mix(finalColor, color3, clamp(fresnel * 1.2, 0.0, 1.0));
      
      // Add glowing highlights
      float highlight = pow(vNoise * 0.5 + 0.5, 8.0);
      finalColor += color4 * highlight * 0.4;

      // Fresnel rim light
      finalColor += color4 * pow(fresnel, 5.0) * 0.6;
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `

  const geometry = new THREE.IcosahedronGeometry(1.4, 128)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader,
    fragmentShader,
    transparent: true
  })

  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  // Mouse Interaction
  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100
    mouseY = (e.clientY - window.innerHeight / 2) / 100
  })

  const clock = new THREE.Clock()

  const animate = () => {
    const elapsedTime = clock.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime

    sphere.rotation.y = elapsedTime * 0.1
    targetX = mouseX * 0.15
    targetY = mouseY * 0.15
    scene.rotation.y += (targetX - scene.rotation.y) * 0.05
    scene.rotation.x += (targetY - scene.rotation.x) * 0.05

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  })
}

initHeroThree()

// Contact Form Handling
const contactForm = document.getElementById('contact-form')
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const submitBtn = contactForm.querySelector('.submit-btn')
    const originalBtnContent = submitBtn.innerHTML

    // 1. Show Loading State
    submitBtn.innerHTML = '<span>Sending...</span>'
    submitBtn.disabled = true
    submitBtn.style.opacity = '0.7'
    submitBtn.style.cursor = 'not-allowed'

    const formData = new FormData(contactForm)

    // IMPORTANT: Replace 'YOUR_FORM_ID' with your actual Form ID from https://formspree.io/
    // Example: https://formspree.io/f/xzyqrbpw
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrbnnvdr";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // 2. Success State
        submitBtn.innerHTML = '<span>Message Sent!</span>'
        submitBtn.style.background = '#22c55e'
        submitBtn.style.borderColor = '#22c55e'
        submitBtn.style.color = '#ffffff'
        contactForm.reset()

        setTimeout(() => {
          submitBtn.innerHTML = originalBtnContent
          submitBtn.style.background = ''
          submitBtn.style.borderColor = ''
          submitBtn.style.color = ''
          submitBtn.style.opacity = '1'
          submitBtn.style.cursor = 'pointer'
          submitBtn.disabled = false
        }, 5000)
      } else {
        // 3. Error State
        const data = await response.json();
        console.error('Form error:', data)

        submitBtn.innerHTML = '<span>Error! Try Again</span>'
        submitBtn.style.background = '#ef4444'
        submitBtn.style.borderColor = '#ef4444'
        submitBtn.style.color = '#ffffff'

        setTimeout(() => {
          submitBtn.innerHTML = originalBtnContent
          submitBtn.style.background = ''
          submitBtn.style.borderColor = ''
          submitBtn.style.color = ''
          submitBtn.style.opacity = '1'
          submitBtn.style.cursor = 'pointer'
          submitBtn.disabled = false
        }, 3000)
      }
    } catch (error) {
      // 4. Network Error State
      console.error('Network error:', error)
      submitBtn.innerHTML = '<span>Network Error</span>'
      submitBtn.style.background = '#ef4444'
      submitBtn.style.borderColor = '#ef4444'
      submitBtn.style.color = '#ffffff'

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnContent
        submitBtn.style.background = ''
        submitBtn.style.borderColor = ''
        submitBtn.style.color = ''
        submitBtn.style.opacity = '1'
        submitBtn.style.cursor = 'pointer'
        submitBtn.disabled = false
      }, 3000)
    }
  })
}
// Project Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn')
const projectCards = document.querySelectorAll('.archive-card')

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      const filter = btn.getAttribute('data-filter')

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category')

        if (filter === 'all' || category === filter) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            display: 'flex',
            duration: 0.4,
            ease: 'power2.out'
          })
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.9,
            display: 'none',
            duration: 0.4,
            ease: 'power2.out'
          })
        }
      })
    })
  })
}

// Back to Top Logic
const backToTopBtn = document.getElementById('back-to-top')
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}
