const skillItems = document.querySelectorAll(".reveal-skill");

function revealSkills() {
  const trigger = window.innerHeight * 0.85;

  skillItems.forEach((item, index) => {
    const top = item.getBoundingClientRect().top;

    if (top < trigger) {
      setTimeout(() => {
        item.classList.add("show-skill");
      }, index * 150); // Stagger animation (150ms per item)
    }
  });
}

window.addEventListener("scroll", revealSkills);
// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    let windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 120) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Scroll reveal
const reveal = document.querySelectorAll('.contact-info-box, .contact-form');

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

reveal.forEach(el => observer.observe(el));

// Optional tilt effect (even smoother)
document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `perspective(900px)
                                rotateX(${-(y - rect.height/2)/25}deg)
                                rotateY(${(x - rect.width/2)/25}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
});
