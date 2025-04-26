document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('.reveal');
    const skillsGraphContainer = document.querySelector('.skills-graph');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const heroContent = document.querySelector('.hero-content');

    // --- Initial Hero Content Fade-In ---
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 100); // Small delay to ensure the class is applied after rendering
    }

    // --- Header Reveal/Hide on Scroll ---
    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            header.style.transform = 'translateY(-' + headerHeight + 'px)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;

        // --- Close Hamburger Menu on Scroll ---
        if (navMenu.classList.contains('active') && scrollTop > 0) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // --- Section Reveal on Scroll ---
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, { threshold: 0.15 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Animated Language Graph (Responsive) ---
    const languages = [
        { name: 'Java', percentage: 45, color: '#ffeb3b' },
        { name: 'Python', percentage: 25, color: '#ffc107' },
        { name: 'C#', percentage: 15, color: '#ff9800' },
        { name: 'HTML, CSS, & JS', percentage: 10, color: '#f57c00' },
        { name: 'Other', percentage: 5, color: '#000000' }
    ];

    if (skillsGraphContainer) {
        skillsGraphContainer.innerHTML = '';

        let svgWidth = 600;
        const svgHeight = 312.5; //62.5ish per bar
        const barHeight = 25;
        const barSpacing = 30;
        let labelWidth = 150;

        if (window.innerWidth < 768) {
            svgWidth = 350;
            labelWidth = 120;
        }

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);

        languages.forEach((lang, index) => {
            const barMaxWidth = svgWidth - labelWidth - 20;
            const barWidth = (lang.percentage / 100) * barMaxWidth;
            const y = index * (barHeight + barSpacing) + 40;
            const barX = labelWidth;
            const labelX = labelWidth - 10;
            const percentageX = barX + barWidth + 10;

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('x', barX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', 0);
            rect.setAttribute('height', barHeight);
            rect.setAttribute('fill', lang.color);
            rect.style.transition = 'width 0.8s ease-out ' + (0.3 * index) + 's';

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute('x', labelX);
            label.setAttribute('y', y + barHeight / 2 + 5);
            label.setAttribute('font-size', '1em');
            label.setAttribute('fill', '#333');
            label.setAttribute('text-anchor', 'end');
            label.textContent = lang.name;

            const percentageText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            percentageText.setAttribute('x', percentageX);
            percentageText.setAttribute('y', y + barHeight / 2 + 5);
            percentageText.setAttribute('font-size', '0.9em');
            percentageText.setAttribute('fill', '#555');
            percentageText.setAttribute('text-anchor', 'start');
            percentageText.style.opacity = 0;
            percentageText.style.transition = 'opacity 0.5s ease-in-out ' + (0.5 + 0.3 * index) + 's';
            percentageText.textContent = lang.percentage + '%';

            svg.appendChild(rect);
            svg.appendChild(label);
            svg.appendChild(percentageText);

            setTimeout(() => {
                rect.setAttribute('width', barWidth);
                percentageText.style.opacity = 1;
            }, 100);
        });

        skillsGraphContainer.appendChild(svg);
    }

    // --- Hamburger Menu Functionality ---
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Optional: Close the menu when a link is clicked (for in-page navigation)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
