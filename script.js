// ── CURSOR (desktop/mouse only) ──
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
const isMouseDevice = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;
if (isMouseDevice) {
  cursor.style.display = "block";
  ring.style.display = "block";
  let mx = -100,
    my = -100,
    rx = -100,
    ry = -100;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  function animCursor() {
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll("a, button, .cloud-tag").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.borderColor = "rgba(0,229,160,0.7)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      ring.style.width = "30px";
      ring.style.height = "30px";
      ring.style.borderColor = "rgba(0,229,160,0.4)";
    });
  });
}

// ── HAMBURGER ──
const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  drawer.classList.toggle("open");
  overlay.classList.toggle("open");
});
overlay.addEventListener("click", closeDrawer);
function closeDrawer() {
  hamburger.classList.remove("open");
  drawer.classList.remove("open");
  overlay.classList.remove("open");
}

// ── PARTICLES ──
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W,
  H,
  pts = [];
const COLORS = ["#00e5a0", "#4d9fff", "#ff6b35", "#ffffff"];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function randPt() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 2.5 + 1,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.15,
  };
}

for (let i = 0; i < 90; i++) pts.push(randPt());

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── EMAILJS ──
emailjs.init("rIdp-xszFQQNSLfn4");

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("from_name").value.trim();
  const email = document.getElementById("from_email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    feedback.style.display = "block";
    feedback.style.color = "#ff6b35";
    feedback.textContent = "⚠ Please fill in all fields.";
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  submitBtn.style.opacity = "0.7";
  feedback.style.display = "none";

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  emailjs
    .send("service_0dd8a6a", "template_ccjobn8", templateParams)
    .then(() => {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      feedback.style.display = "block";
      feedback.style.color = "#00e5a0";
      feedback.textContent = "✓ Message sent! I'll get back to you soon.";
      contactForm.reset();
    })
    .catch((error) => {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      feedback.style.display = "block";
      feedback.style.color = "#ff6b35";
      feedback.textContent = "✗ Something went wrong. Please try again.";
      console.error("EmailJS error:", error);
    });
});
