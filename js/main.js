const header = document.querySelector("header");
const navLinks = document.querySelectorAll('header nav a[href^="#"]');
const sections = document.querySelectorAll("main section[id], footer[id]");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 10);
}

function updateActiveLink() {
    if (sections.length === 0) {
        return;
    }

    let current = "";
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    if (atBottom) {
        current = sections[sections.length - 1].id;
    } else {
        sections.forEach(section => {
            if (section.offsetTop <= window.scrollY + window.innerHeight / 3) {
                current = section.id;
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
}

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("main section > :not(.stagger), .stagger > *").forEach(item => {
    item.classList.add("reveal");
    revealObserver.observe(item);
});

window.addEventListener("scroll", () => {
    updateHeader();
    updateActiveLink();
});

updateHeader();
updateActiveLink();
