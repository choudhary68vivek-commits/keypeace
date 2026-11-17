
/* =================================
   KEY PEACE - JAVASCRIPT
================================= */

// Smooth navigation for homepage links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Welcome message in browser console
console.log("Welcome to Key Peace!");
console.log("Practice with purpose. Type with confidence.");
