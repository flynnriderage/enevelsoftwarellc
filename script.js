// Dark mode only - no theme toggle needed
const html = document.documentElement;
html.setAttribute("data-theme", "dark");

// Infinite Logo Marquee
const marqueeContent = document.querySelector(".logo_marquee-content");
if (marqueeContent) {
  // Clone all logo items and append them to the same container
  const logoItems = marqueeContent.querySelectorAll(".logo_item");
  logoItems.forEach((item) => {
    const clone = item.cloneNode(true);
    marqueeContent.appendChild(clone);
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar_component");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Mobile Menu Toggle
const menuButton = document.querySelector(".navbar_menu-button");
const menu = document.querySelector(".navbar_menu");
const menuIcon = document.querySelector(".menu-icon");
const body = document.body;

if (menuButton) {
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
    menuIcon.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (menu.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".navbar_link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuIcon.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar_component")) {
      menu.classList.remove("active");
      menuIcon.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuIcon.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 991 && menu.classList.contains("active")) {
        menu.classList.remove("active");
        menuIcon.classList.remove("active");
        body.style.overflow = "";
      }
    }, 250);
  });
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".home_about_item, .home_work_item, .home_services_accordion"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Hero Heading Animation
window.addEventListener("load", () => {
  const heroHeading = document.querySelector(".hero_heading h1");
  const heroDescription = document.querySelector(".hero_description");
  const heroBadge = document.querySelector(".hero_rotating-badge");

  if (heroHeading) {
    heroHeading.style.opacity = "1";
    heroHeading.style.transform = "translateY(0)";
  }

  if (heroDescription) {
    setTimeout(() => {
      heroDescription.style.opacity = "1";
      heroDescription.style.transform = "translateY(0)";
    }, 300);
  }

  if (heroBadge) {
    setTimeout(() => {
      heroBadge.style.opacity = "1";
      heroBadge.style.transform = "translateY(0)";
    }, 500);
  }
});

// Rotating Badge Animation
const rotateBadge = document.querySelector(
  ".hero_rotating-badge img:first-child"
);
if (rotateBadge) {
  let rotation = 0;
  setInterval(() => {
    rotation += 0.5;
    rotateBadge.style.transform = `rotate(${rotation}deg)`;
  }, 30);
}

// Parallax Effect for Abstract Images
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const abstractImage = document.querySelector(".hero_abstruct-image");

  if (abstractImage) {
    abstractImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Work Items Hover Effect
document.querySelectorAll(".home_work_item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.querySelector(".home_work_icon-wrapper").style.backgroundColor =
      "#0066ff";
    this.querySelector(".home_work_icon-wrapper").style.transform =
      "scale(1.1)";
  });

  item.addEventListener("mouseleave", function () {
    this.querySelector(".home_work_icon-wrapper").style.backgroundColor = "";
    this.querySelector(".home_work_icon-wrapper").style.transform = "scale(1)";
  });
});

// Services Accordion
document.querySelectorAll(".home_services_item-label").forEach((label) => {
  label.addEventListener("mouseenter", function () {
    this.style.paddingLeft = "20px";
  });

  label.addEventListener("mouseleave", function () {
    this.style.paddingLeft = "0";
  });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  // Store the original text to preserve special formats like "24/7"
  const originalText = element.textContent;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    const suffix = originalText.includes("+") ? "+" : "";
    const prefix = originalText.includes("%") ? "" : "";
    const postfix = originalText.includes("%") ? "%" : "";

    // Handle 24/7 format - preserve everything after the slash
    const slashSuffix = originalText.includes("/")
      ? originalText.substring(originalText.indexOf("/"))
      : "";

    if (target >= 100) {
      element.textContent =
        Math.floor(current) + postfix + suffix + slashSuffix;
    } else {
      element.textContent =
        prefix + Math.floor(current) + postfix + suffix + slashSuffix;
    }
  }, 16);
}

// Function to animate formats like "24/7" where both numbers animate
function animateDualCounter(element, target1, target2, duration = 2000) {
  const start = 0;
  const increment1 = target1 / (duration / 16);
  const increment2 = target2 / (duration / 16);
  let current1 = start;
  let current2 = start;

  const timer = setInterval(() => {
    current1 += increment1;
    current2 += increment2;

    if (current1 >= target1 && current2 >= target2) {
      current1 = target1;
      current2 = target2;
      clearInterval(timer);
    }

    element.textContent = Math.floor(current1) + "/" + Math.floor(current2);
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statsElements = entry.target.querySelectorAll(
          ".home_about_title h3"
        );
        statsElements.forEach((stat) => {
          const text = stat.textContent;

          // Check if it's a dual number format like "24/7"
          if (text.includes("/")) {
            const parts = text.split("/");
            const num1 = parseInt(parts[0]);
            const num2 = parseInt(parts[1]);
            if (num1 && num2) {
              animateDualCounter(stat, num1, num2);
              return;
            }
          }

          // Extract only the first number (before any special characters like /)
          const firstNumber = text.match(/^\d+/);
          const number = firstNumber
            ? parseInt(firstNumber[0])
            : parseInt(text.replace(/\D/g, ""));
          if (number) {
            animateCounter(stat, number);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const aboutSection = document.querySelector(".home_about_details");
if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// Form Submission
const newsletterForm = document.querySelector(".footer_link_form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    if (email) {
      // Simulate form submission
      alert("Thank you for subscribing!");
      newsletterForm.reset();
    }
  });
}

// Logo Hover Effect
document.querySelectorAll(".logo_image").forEach((logo) => {
  logo.addEventListener("mouseenter", function () {
    this.style.filter = "grayscale(0%)";
    this.style.opacity = "1";
    this.style.transform = "scale(1.1)";
  });

  logo.addEventListener("mouseleave", function () {
    this.style.filter = "grayscale(100%)";
    this.style.opacity = "0.6";
    this.style.transform = "scale(1)";
  });
});

// CTA Button Hover Effects
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".button-icon");
    if (icon) {
      icon.style.transform = "translateX(5px)";
    }
  });

  button.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".button-icon");
    if (icon) {
      icon.style.transform = "translateX(0)";
    }
  });
});

// Footer CTA Animation
const footerCta = document.querySelector(".footer_cta");
if (footerCta) {
  footerCta.addEventListener("mouseenter", function () {
    this.style.paddingLeft = "40px";
    this.querySelector(".footer_cta-icon").style.backgroundColor = "#0066ff";
  });

  footerCta.addEventListener("mouseleave", function () {
    this.style.paddingLeft = "0";
    this.querySelector(".footer_cta-icon").style.backgroundColor = "";
  });
}

// Active Navigation Link
function setActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar_link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

setActiveNavLink();

// Page Load Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Lazy Load Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// Testimonial Slider (Simple Auto-rotate)
const testimonialSlides = document.querySelectorAll(
  ".home_testimony_slide-item"
);
let currentSlide = 0;

function showSlide(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    slide.style.opacity = i === index ? "1" : "0";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonialSlides.length;
  showSlide(currentSlide);
}

if (testimonialSlides.length > 0) {
  showSlide(0);
  setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Prevent FOUC (Flash of Unstyled Content)
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.visibility = "visible";
});

// Easter Egg: Konami Code
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Easter egg activated
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => {
        document.body.style.filter = "";
      }, 3000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

console.log("🚀 Kinetiq - Creative Agency Website Loaded Successfully!");
console.log("💡 Made with ❤️ by FlowSamurai");
