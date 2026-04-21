const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const progressBar = document.getElementById("progressBar");
const toTop = document.getElementById("toTop");
const toast = document.getElementById("toast");
const typingLead = document.getElementById("typingLead");
const copyResult = document.getElementById("copyResult");
const checkSecurityLevel = document.getElementById("checkSecurityLevel");
const securityScore = document.getElementById("securityScore");
const securityChecks = document.querySelectorAll(".security-check");
const particlesCanvas = document.getElementById("particlesCanvas");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1700);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const savedTheme = localStorage.getItem("crypto-theme");
if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === "light" ? "🌞" : "🌙";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("crypto-theme", next);
    themeToggle.textContent = next === "light" ? "🌞" : "🌙";
    showToast(`Тема: ${next === "light" ? "светлая" : "темная"}`);
  });
}

if (typingLead) {
  const fullLeadText = typingLead.textContent;
  typingLead.textContent = "";
  let leadIndex = 0;
  const typeLead = () => {
    if (leadIndex >= fullLeadText.length) return;
    typingLead.textContent += fullLeadText[leadIndex];
    leadIndex += 1;
    setTimeout(typeLead, 18);
  };
  typeLead();
}

function caesarCipher(text, shift, decrypt = false) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const normalizedShift = ((decrypt ? -shift : shift) % 26 + 26) % 26;
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const idx = alphabet.indexOf(char);
      if (idx === -1) return char;
      return alphabet[(idx + normalizedShift) % 26];
    })
    .join("");
}

const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const inputText = document.getElementById("inputText");
const shiftInput = document.getElementById("shift");
const result = document.getElementById("result");

function runCipher(decrypt = false) {
  if (!inputText || !shiftInput || !result) return;
  const text = inputText.value.trim();
  const shift = Number(shiftInput.value);

  if (!text) {
    result.textContent = "Введите текст для обработки.";
    return;
  }
  if (!Number.isInteger(shift) || shift < 1 || shift > 25) {
    result.textContent = "Сдвиг должен быть числом от 1 до 25.";
    return;
  }

  const output = caesarCipher(text, shift, decrypt);
  result.textContent = decrypt ? `Расшифровка: ${output}` : `Шифротекст: ${output}`;
  showToast(decrypt ? "Текст расшифрован" : "Текст зашифрован");
}

if (encryptBtn) encryptBtn.addEventListener("click", () => runCipher(false));
if (decryptBtn) decryptBtn.addEventListener("click", () => runCipher(true));

if (copyResult) {
  copyResult.addEventListener("click", async () => {
    if (!result) return;
    const text = result.textContent.trim();
    if (!text || text === "Результат появится здесь.") {
      showToast("Сначала получите результат");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast("Результат скопирован");
    } catch (error) {
      showToast("Не удалось скопировать");
    }
  });
}

if (checkSecurityLevel && securityScore && securityChecks.length) {
  checkSecurityLevel.addEventListener("click", () => {
    const checkedCount = Array.from(securityChecks).filter((item) => item.checked).length;
    const total = securityChecks.length;
    const percent = Math.round((checkedCount / total) * 100);

    if (percent < 40) {
      securityScore.textContent = `Уровень защиты: ${percent}% (низкий). Срочно включите 2FA и обновите пароли.`;
    } else if (percent < 80) {
      securityScore.textContent = `Уровень защиты: ${percent}% (средний). Вы на хорошем пути, добавьте оставшиеся шаги.`;
    } else {
      securityScore.textContent = `Уровень защиты: ${percent}% (высокий). Отличная цифровая гигиена!`;
    }
    showToast("Оценка безопасности обновлена");
  });
}

const checkQuiz = document.getElementById("checkQuiz");
const quizResult = document.getElementById("quizResult");

if (checkQuiz && quizResult) {
  checkQuiz.addEventListener("click", () => {
    const answer = document.querySelector('input[name="q1"]:checked');
    if (!answer) {
      quizResult.textContent = "Сначала выберите вариант ответа.";
      return;
    }
    quizResult.textContent =
      answer.value === "b"
        ? "Верно! HTTPS использует комбинацию асимметричного и симметричного шифрования."
        : "Пока неверно. Подумайте о том, как происходит обмен ключами и шифрование трафика.";
  });
}

if (particlesCanvas) {
  const ctx = particlesCanvas.getContext("2d");
  let particles = [];
  const particleCount = 70;

  const resizeCanvas = () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  };

  const createParticles = () => {
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.8
    }));
  };

  const drawParticles = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > particlesCanvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > particlesCanvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(148, 193, 255, 0.45)";
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && ctx) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(109, 124, 255, ${0.22 - dist / 600})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  };

  resizeCanvas();
  createParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

function updateScrollFeatures() {
  const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = totalScrollable > 0 ? (window.scrollY / totalScrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  if (toTop) toTop.classList.toggle("show", window.scrollY > 350);
}

window.addEventListener("scroll", updateScrollFeatures);
updateScrollFeatures();

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let current = "landing";
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });
  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const revealBlocks = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.18 }
  );
  revealBlocks.forEach((block) => revealObserver.observe(block));
} else {
  revealBlocks.forEach((block) => block.classList.add("visible"));
}