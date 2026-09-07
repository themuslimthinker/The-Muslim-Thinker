document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (btn && menu) btn.addEventListener("click", () => menu.classList.toggle("open"));

  const yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  const form = document.querySelector("#submissionForm");
  if (form) {
    form.addEventListener("submit", () => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
      }
      const msg = document.querySelector("#submitMessage");
      if (msg) msg.textContent = "Your article is being submitted. Please keep this page open for a moment.";
    });
  }
});
