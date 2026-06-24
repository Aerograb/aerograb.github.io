
/* =================================================================
   AeroGrab — project page interactions
   Vanilla JS, no dependencies. Everything degrades gracefully and
   respects prefers-reduced-motion.
   ================================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav: shadow on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close after tapping a link (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- Signature pipeline: draw on first view ---------- */
  var flow = document.getElementById("flow");
  if (flow) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      flow.classList.add("is-drawn");
    } else {
      var flowObs = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-drawn");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      flowObs.observe(flow);
    }
  }

  /* ---------- Active section highlight in nav ---------- */
  var navAnchors = links ? links.querySelectorAll("a[href^='#']") : [];
  var sectionMap = {};
  navAnchors.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var sec = document.getElementById(id);
    if (sec) sectionMap[id] = a;
  });

  if ("IntersectionObserver" in window && Object.keys(sectionMap).length) {
    var current = null;
    var spyObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          if (entry.isIntersecting) {
            if (current && sectionMap[current]) {
              sectionMap[current].classList.remove("is-active");
            }
            current = id;
            if (sectionMap[id]) sectionMap[id].classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    Object.keys(sectionMap).forEach(function (id) {
      spyObs.observe(document.getElementById(id));
    });
  }

  /* ---------- Copy BibTeX ---------- */
  var copyBtn = document.getElementById("bibCopy");
  var bibText = document.getElementById("bibText");
  if (copyBtn && bibText) {
    copyBtn.addEventListener("click", function () {
      var text = bibText.innerText;
      var done = function () {
        copyBtn.textContent = "Copied";
        copyBtn.classList.add("is-copied");
        setTimeout(function () {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("is-copied");
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
