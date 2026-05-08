
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        //Element is now on screen--show it
        entry.target.classList.add("visible");
        //Stop watching it, it only animates once
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12, //trigger when 12% of element is visible
  },
);

//Watch ALL elements that have class reveal
document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", function (event) {
    if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu on ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}
