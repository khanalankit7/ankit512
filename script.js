/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================
   PROFILE MOUSE MOVEMENT
========================= */

const profile = document.querySelector(".profile-wrapper");

if (profile) {

    document.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const x = (event.clientX / window.innerWidth - 0.5);
        const y = (event.clientY / window.innerHeight - 0.5);

        profile.style.transform = `
            translate(
                ${x * 12}px,
                ${y * 12}px
            )
        `;

    });

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const activeObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navigationLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },

    {
        threshold: 0.35
    }

);


sections.forEach(section => {
    activeObserver.observe(section);
});


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   SMALL PARALLAX EFFECT
========================= */

const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {

            heroTitle.style.transform =
                `translateY(${scrollY * 0.08}px)`;

        }

    });

}

