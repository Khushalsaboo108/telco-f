document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Element is in view:", entry.target);
          if (!entry.target.classList.contains("animate-fadeInSlideUp")) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("animate-fadeInSlideUp");
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll('[data-animate="false"]');
  console.log("Elements being observed:", elements); // Log elements to confirm they are selected
  elements.forEach((el) => {
    observer.observe(el);
  });
});
