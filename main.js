/* ============================================================
   Scrye — site interactions
   No dependencies. Progressive enhancement: the page is fully
   readable and navigable with JS disabled.
   ============================================================ */
(function () {
  "use strict";

  /* ---- nav: solid background once scrolled ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu toggle ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  }
  toggle.addEventListener("click", function () {
    setMenu(menu.hidden);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
  });

  /* ---- scroll reveal ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- contact form ----
     No backend by design. On submit we compose a mailto: so the message
     opens in the visitor's mail client. To wire a real endpoint instead
     (Formspree, your API, etc.), replace the body of handleSubmit().     */
  var CONTACT_EMAIL = "contact@scrye.example"; // <- replace with real inbox
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  function handleSubmit(e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var org = form.org.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    if (!name || !email) {
      note.textContent = "Please add your name and email.";
      note.classList.remove("is-ok");
      return;
    }

    var subject = "Briefing request — " + name + (org ? " (" + org + ")" : "");
    var body =
      "Name: " + name + "\n" +
      "Organization: " + (org || "—") + "\n" +
      "Email: " + email + "\n\n" +
      (message || "(no message)");

    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    note.textContent = "Opening your mail client…";
    note.classList.add("is-ok");
    form.reset();
  }

  if (form) form.addEventListener("submit", handleSubmit);
})();
