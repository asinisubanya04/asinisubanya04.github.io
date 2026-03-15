const text = `ᯓ★. ── ⚠︎ 𓇼 ⟡ ✦︎ ꕤ ── .✦
Asini Subanya
Undergraduate Computer Engineer
Born in Sri Lanka, living in UAE
Raised by the 2000s`;
let i = 0;
let result = "";

function typeWriter() {
    if (i < text.length) {
        result += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        document.getElementById("typewriter").innerHTML = result;
        i++;
        setTimeout(typeWriter, 50);
    }
}

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('fullscreenMenu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
    // Accessibility
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Optional: close menu when clicking a link
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "1000";
canvas.style.pointerEvents = "none";

let particles = [];
let animationActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawSquare(x, y, size, alpha, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#a855f7"; // purple color
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.restore();
  ctx.globalAlpha = 1;
}

function animateParticles() {
  if (!animationActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = Date.now();
  particles = particles.filter(p => {
    const age = now - p.created;
    if (age > 1000) return false;

    p.x += p.vx;
    p.y += p.vy;
    p.alpha = 1 - age / 1000;
    p.angle += 0.1;

    drawSquare(p.x, p.y, p.size, p.alpha, p.angle);
    return true;
  });

  requestAnimationFrame(animateParticles);
}

document.querySelector(".corner-btn").addEventListener("click", () => {
  animationActive = !animationActive;
  if (animationActive) {
    canvas.style.display = "block";
    document.addEventListener("mousemove", onMouseMove);
    animateParticles();
  } else {
    canvas.style.display = "none";
    document.removeEventListener("mousemove", onMouseMove);
  }
});

function onMouseMove(e) {
  for (let i = 0; i < 3; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 12 + Math.random() * 10,
      alpha: 1,
      angle: Math.random() * Math.PI * 2,
      created: Date.now()
    });
  }
}



window.onload = function () {
    typeWriter();

    // Set up Intersection Observer to detect when elements enter viewport
    const observerOptions = {
        root: null, // use viewport as root
        rootMargin: '0px',
        threshold: 0.25 // trigger when 25% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get any delay attribute if present
                const delay = entry.target.dataset.delay ? parseFloat(entry.target.dataset.delay) : 0;
                
                // Add visible class with appropriate delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-element class
    document.querySelectorAll('.fade-in-element').forEach(element => {
        observer.observe(element);
    });
};


const workexpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWorkExp();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Open modal on event click
document.querySelectorAll('.timeline-event').forEach(event => {
    event.addEventListener('click', function (e) {
        // Prevent event bubbling if close button is clicked
        if (e.target.classList.contains('modal-close')) return;
        const modalId = this.getAttribute('data-modal');
        if (modalId) {
            this.querySelector(`#${modalId}`).classList.add('active');
        }
    });
});

// Close modal on close button click
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        this.closest('.modal').classList.remove('active');
    });
});

// Close modal on clicking outside the notepad box
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});


// Open modal with correct info
document.querySelectorAll('.timeline-event').forEach(event => {
    event.addEventListener('click', function () {
        document.getElementById('modal-title').textContent = this.getAttribute('data-title');
        document.getElementById('modal-description').textContent = this.getAttribute('data-description');
        document.getElementById('universal-modal').classList.add('active');
    });
});

// Close modal on close button click
document.querySelector('.modal-close').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('universal-modal').classList.remove('active');
});

// Close modal on clicking outside the notepad box
document.getElementById('universal-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});


// Open modal with correct info
document.querySelectorAll('.timeline-event').forEach(event => {
    event.addEventListener('click', function () {
        document.getElementById('modal-title').textContent = this.getAttribute('data-title');
        document.getElementById('modal-description').textContent = this.getAttribute('data-description');
        document.getElementById('universal-modal').classList.add('active');
    });
});


// Shake images when they scroll into view (once)
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.group-shake');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('shake-on-scroll');
                // Remove the class after animation so it can trigger again if needed
                setTimeout(() => entry.target.classList.remove('shake-on-scroll'), 600);
            }
        });
    }, { threshold: 0.7 });

    images.forEach(img => observer.observe(img));
});
