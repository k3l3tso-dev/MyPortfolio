// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector("#preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// Menu toggle functionality
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("active");
  });
});

// Typing animation with cycling
const typingLine2 = document.querySelector("#typing-line2");
const titles = [
  "Software Engineer",
  "Aspiring Full Stack Developer",
  "Web Dev&Designer",
  "Desktop Support Technician",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentTitle = titles[titleIndex];
  if (isDeleting) {
    typingLine2.textContent = currentTitle.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, 500);
      return;
    }
  } else {
    typingLine2.textContent = currentTitle.substring(0, charIndex++);
    if (charIndex > currentTitle.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}

document.addEventListener("DOMContentLoaded", type);

// Animate skill bars and percentages when they come into view
const skillLevels = document.querySelectorAll(".skill-level");
const skillPercents = document.querySelectorAll(".skill-percent");

function animateSkills() {
  skillLevels.forEach((skill, index) => {
    setTimeout(() => {
      const level = skill.getAttribute("data-level");
      skill.style.width = level;
    }, index * 200);
  });

  skillPercents.forEach((percent, index) => {
    setTimeout(() => {
      const target = parseInt(percent.getAttribute("data-percent"));
      animateCounter(percent, 0, target, 1500);
    }, index * 200);
  });
}

// Animate counter
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent =
      value + (element.classList.contains("skill-percent") ? "%" : "");
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

// Intersection Observer for skills
const skillsSection = document.querySelector("#skills");
const observerOptions = {
  root: null,
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkills();
      observer.unobserve(skillsSection);
    }
  });
}, observerOptions);

observer.observe(skillsSection);

// Animate education stats
const counters = document.querySelectorAll(".counter");
function animateEducationStats() {
  counters.forEach((counter, index) => {
    setTimeout(() => {
      const target = parseInt(counter.getAttribute("data-target"));
      animateCounter(counter, 0, target, 2000);
    }, index * 300);
  });
}

const educationSection = document.querySelector("#education");
const educationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateEducationStats();
      educationObserver.unobserve(educationSection);
    }
  });
}, observerOptions);

educationObserver.observe(educationSection);

// Scroll progress
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".scroll-progress").style.width = scrollPercent + "%";
});

// Dark mode toggle
const themeSwitch = document.querySelector("#checkbox");
themeSwitch.addEventListener("change", () => {
  document.documentElement.setAttribute(
    "data-theme",
    themeSwitch.checked ? "light" : "dark"
  );
});

// Set initial theme to dark
document.documentElement.setAttribute("data-theme", "dark");

// Contact form
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector(".form-message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    console.log("Form submitted:", { name, email, message });

    formMessage.textContent = "Message sent successfully!";
    formMessage.classList.add("success");
    formMessage.style.display = "block";
    contactForm.reset();

    setTimeout(() => {
      formMessage.style.display = "none";
      formMessage.classList.remove("success");
    }, 3000);
  } catch (error) {
    formMessage.textContent = "Error sending message. Please try again.";
    formMessage.classList.add("error");
    formMessage.style.display = "block";

    setTimeout(() => {
      formMessage.style.display = "none";
      formMessage.classList.remove("error");
    }, 3000);
  }
});

// Scroll-triggered animations
const animateElements = document.querySelectorAll(".animate-on-scroll");

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const delay = target.getAttribute("data-delay") || 0;
      setTimeout(() => {
        target.classList.add("visible");
      }, delay);
      scrollObserver.unobserve(target);
    }
  });
}, observerOptions);

animateElements.forEach((el) => scrollObserver.observe(el));

// 3D Tilt for project cards
const tiltCards = document.querySelectorAll("[data-tilt]");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Social links placeholder functionality
const placeholderLinks = document.querySelectorAll('.social-item[href="#"]');
placeholderLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const platform = this.querySelector("h3").textContent;
    alert(`${platform} link will be added soon!`);
  });
});

// View My Work button color change
const viewWorkBtn = document.querySelector('a[href="#projects"]');
viewWorkBtn.style.color = "#ff5722";

// Address link animation
const addressLink = document.querySelector(".address-link");
addressLink.addEventListener("mouseover", () => {
  addressLink.innerHTML = '<i class="fas fa-map-marker-alt"></i> Find Me!';
});

addressLink.addEventListener("mouseout", () => {
  addressLink.innerHTML = '<i class="fas fa-map-marker-alt"></i> My Address';
});
