/* =========================
   REDUCED MOTION
========================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    const setMenuState = open => {

        navLinks.classList.toggle("active", open);

        menuButton.setAttribute("aria-expanded", open ? "true" : "false");
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    };


    menuButton.addEventListener("click", () => {

        setMenuState(!navLinks.classList.contains("active"));

    });


    /* Close menu after clicking a link */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            setMenuState(false);
        });

    });


    /* Escape closes the menu and hands focus back to the toggle */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (!navLinks.classList.contains("active")) return;

        setMenuState(false);
        menuButton.focus();

    });


    /* A click anywhere outside the open menu dismisses it */

    document.addEventListener("click", event => {

        if (!navLinks.classList.contains("active")) return;

        if (navLinks.contains(event.target)) return;
        if (menuButton.contains(event.target)) return;

        setMenuState(false);

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {

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


    /*
        Signals the inline script in the document head that the reveal
        handling is live, so it keeps the .js flag that enables the
        animations. If this never runs, the flag is dropped and the
        content stays visible instead of being stuck at opacity 0.
    */

    document.documentElement.setAttribute("data-reveal-ready", "");

}


/* =========================
   PROFILE MOUSE MOVEMENT
========================= */

const profile = document.querySelector(".profile-wrapper");

if (profile && !prefersReducedMotion.matches) {

    let pointerX = 0;
    let pointerY = 0;
    let pointerFrame = null;

    document.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        pointerX = (event.clientX / window.innerWidth - 0.5);
        pointerY = (event.clientY / window.innerHeight - 0.5);

        /* Coalesce bursts of pointer events into one write per frame */

        if (pointerFrame) return;

        pointerFrame = window.requestAnimationFrame(() => {

            profile.style.transform = `
                translate(
                    ${pointerX * 12}px,
                    ${pointerY * 12}px
                )
            `;

            pointerFrame = null;

        });

    }, { passive: true });

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

if (heroTitle && !prefersReducedMotion.matches) {

    let scrollFrame = null;

    const updateHeroParallax = () => {

        /* Clamped so the title can never keep drifting once the
           hero has scrolled out of view. */

        const offset = Math.min(window.scrollY, window.innerHeight);

        heroTitle.style.transform = `translateY(${offset * 0.08}px)`;

        scrollFrame = null;

    };

    window.addEventListener("scroll", () => {

        if (scrollFrame) return;

        scrollFrame = window.requestAnimationFrame(updateHeroParallax);

    }, { passive: true });

}
