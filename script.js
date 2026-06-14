document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DARK MODE LOGICA ---
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const body = document.body;

    // Check bij laden: wat is de voorkeur?
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Sla keuze op en wissel icoon
            if (isDark) {
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // --- 3. MOBIEL MENU ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon?.classList.toggle('fa-bars');
            icon?.classList.toggle('fa-times');
        });
    }

    // --- 4. TYPING EFFECT (Optioneel) ---
    const heroTitleName = document.querySelector('.hero-title-name');
    if (heroTitleName) {
        const text = heroTitleName.textContent;
        heroTitleName.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitleName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 800);
    }
});

// --- PROJECT FILTERS LOGICA ---
const filterBtns = document.querySelectorAll('.filter-btn');
const yearFilter = document.getElementById('yearFilter');
const cards = document.querySelectorAll('.project-card');

function applyFilters() {
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    const activeYear = yearFilter.value;

    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardYear = card.dataset.year;

        const categoryMatch = (activeCategory === 'all' || cardCategory === activeCategory);
        const yearMatch = (activeYear === 'all' || cardYear === activeYear);

        if (categoryMatch && yearMatch) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
    });
});

if (yearFilter) {
    yearFilter.addEventListener('change', applyFilters);
}

    const favicon = document.getElementById('favicon');
    let angle = 0;
    let direction = 1;
    let waveCount = 0;
    const maxWaves = 6; // Hoeveel keer hij heen en weer gaat (3 volledige zwaaien)

    function animateFavicon() {
    // Verander de hoek (angle) voor een vloeiend effect
    angle += (2 * direction);

    // Maak de SVG met de huidige hoek
    const svg = `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 transform=%22rotate(${angle} 50 80)%22>👋</text></svg>`;
    favicon.href = `data:image/svg+xml,${svg}`;

    // Keer de richting om bij de uiterste punten
    if (angle >= 15 || angle <= -15) {
    direction *= -1;
    waveCount++;
}

    // Stop na een aantal zwaaien en wacht even
    if (waveCount >= maxWaves) {
    waveCount = 0;
    angle = 0; // Terug naar het midden
    // Zet het handje recht
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>`;

    setTimeout(startWaving, 4000); // Wacht 4 seconden voor de volgende zwaai
} else {
    requestAnimationFrame(animateFavicon);
}
}

    function startWaving() {
    requestAnimationFrame(animateFavicon);
}

    // Start de eerste keer
    startWaving();

// --- 5. CONTACT FORMULIER MET CONFETTI ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // We voorkomen even het herladen van de pagina om de confetti te zien
        // In een echte situatie stuur je hier je data naar een backend
        e.preventDefault();

        // Confetti afschieten!
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2563eb', '#06b6d4', '#ffffff'] // Blauw en cyaan uit jouw palet
        });

        // Toon een simpel bedankje (je kunt dit later vervangen door een mooie modal)
        setTimeout(() => {
            alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op. 👋');
            contactForm.reset(); // Maak het formulier weer leeg
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Leraar Feedback: Maak Wist-je-dat klikbaar i.p.v. hover
    const factBtn = document.querySelector('.fun-fact-btn');
    const factCard = document.querySelector('.fun-fact-card');

    if (factBtn && factCard) {
        factBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            factCard.classList.toggle('visible');
        });

        // Sluit de kaart als je ergens anders klikt
        document.addEventListener('click', () => {
            factCard.classList.remove('visible');
        });
    }
});

// Sluit de kaart als je ergens anders klikt (al aanwezig in je eerdere script)
document.addEventListener('click', (e) => {
    if (funFactCard && !funFactCard.contains(e.target) && !funFactBtn.contains(e.target)) {
        funFactCard.classList.remove('visible');
    }
});
// ==========================================
// 1. NEDERLANDSE DATASETS (modalDataNL)
// ==========================================
const modalDataNL = {
    'modal-app': `
        <h1 class="footer-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Campus Karting App</h1>
        <div class="project-category" style="margin-bottom: 2rem;">App Development • Event Technology</div>
        
        <h2><i class="fas fa-info-circle"></i> Beschrijving van de case</h2>
        <p>
            Vanuit Karting Genk kregen wij de uitdagende vraag om een concept te ontwikkelen dat een jongere doelgroep en studenten naar het circuit trekt. Het resultaat is de "Campus Karting Student League": een exclusief race-event waar de strijd tussen onderwijsinstellingen centraal staat. Studenten van Hogeschool PXL, UCLL en UHasselt nemen het tegen elkaar op in een bloedstollend raceweekend op het iconische circuit van Genk. 
        </p>
        <p>
            Waar de website fungeert als het online uithangbord voorafgaand aan het event, is de Campus Karting App specifiek ontworpen als de onmisbare digitale partner tijdens de racedagen zelf. De app is volledig afgestemd op de behoeften van de bezoekers en coureurs op en rondom de baan. De core functionaliteiten bestaan uit een live ranking-systeem waarmee de realtime rondetijden en klassementen van de scholen direct te volgen zijn, een interactieve plattegrond van het circuitcomplex, en een geïntegreerde ticket-wallet. Via deze wallet kunnen gebruikers digitale consumptiebonnen aanschaffen en laten scannen om eten of drinken te halen. Dit totaalconcept tilt de fysieke beleving op de racedag zelf naar een professioneel en modern niveau.
        </p>

        <h2><i class="fas fa-user-check"></i> Mijn aandeel hierin</h2>
        <p>
            Binnen ons multidisciplinaire team, bestaande van 4 designers, 1 web codeur en 3 programmeurs, heb ik de rol van Digital Designer op me genomen. Mijn verantwoordelijkheid lag bij het visuele en functionaliteits-traject van de mobiele applicatie. Ik heb de sportieve en dynamische visuele identiteit van de Student League doorvertaald naar een interface die aansluit bij de adrenaline van de kartsport en de belevingswereld van studenten.
        </p>
        <p>
            Concreet ben ik van begin tot eind bezig geweest met de User Interface (UI) in Figma. Hierbij hield ik scherp toezicht op de User Experience (UX) door middel van het opzetten van interactieve prototypes en uitgebreide user flows. Ik was verantwoordelijk voor de contentcreatie, waaronder het selecteren en bewerken van de visuals en foto's, en het schrijven van alle functionele microcopy in de app. Daarnaast heb ik er handmatig voor gezorgd dat alle designs responsief waren op verschillende schermformaten. Als designer was ik bovendien de cruciale schakel naar onze drie programmeurs; door mijn designs technisch goed te documenteren en over te dragen, konden zij het feilloze wallet- en rankingsysteem bouwen conform het UX-ontwerp.
        </p>

        <h2><i class="fas fa-lightbulb"></i> Wat ik eruit geleerd heb</h2>
        <p>
            Dit project heeft mijn professionele vaardigheden een enorme boost gegeven. Op organisatorisch vlak heb ik geleerd hoe het is om in een groter team te opereren onder de Scrum-methodiek. Door dagelijkse stand-ups te houden en de rol van Scrum Master te vervullen, heb ik mijn leiderschapskwaliteiten en communicatieve vaardigheden sterk ontwikkeld. Ik weet nu hoe ik de neuzen van zowel creatievelingen als programmeurs dezelfde kant op krijg.
        </p>
        <p>
            Op technisch vlak heb ik mijzelf flink uitgedaagd in Figma, specifiek op het gebied van advanced prototyping, constraints en component-libraries. Ook heb ik waardevolle kennis opgedaan over versiebeheer via GitHub en het gestructureerd bijhouden van een projectbacklog in Confluence. De belangrijkste les was echter het ontwikkelen van een kritische blik op mijn eigen ontwerpen; door feedbacksessies heb ik geleerd om keuzes te maken die niet alleen visueel aantrekkelijk zijn, maar echt functioneel bijdragen aan de doelen van Karting Genk.
        </p>

        <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="https://www.figma.com/proto/8naGKoPp9s6wzw9ctjrkT6/Campus-karting-App---portfolio?node-id=1-863&viewport=198%2C214%2C0.26&t=KV0E3e67MBYP3A11-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A863&page-id=0%3A1" target="_blank" class="btn btn-primary">Bekijk Figma Prototype <i class="fas fa-external-link-alt"></i></a>
            <a href="https://confdigi.pxl.be/spaces/2526WPL2T07/overview" target="_blank" class="btn btn-secondary">Confluence Documentatie <i class="fas fa-book"></i></a>
        </div>
    `,
    'modal-web': `
        <h1 class="footer-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Campus Karting Website</h1>
        <div class="project-category" style="margin-bottom: 2rem;">Web Development • UI/UX Design</div>
        
        <h2><i class="fas fa-info-circle"></i> Beschrijving van de case</h2>
        <p>
            In opdracht van Karting Genk kregen wij de taak om de "Campus Karting Student League" digitaal op de kaart te zetten. Dit evenement daagt studenten van de Hogeschool PXL, UCLL en de Universiteit Hasselt uit om tijdens een intens raceweekend te strijden om de eer van hun onderwijsinstelling. Om dit evenement te realiseren was er een centraal online platform nodig.
        </p>
        <p>
            Het primaire doel van het webplatform is werving en uitgebreide informatievoorziening. De website is ontworpen om studenten te enthousiasmeren, teams te mobiliseren en hogescholen aan te trekken. Het platform biedt een helder overzicht van de evenementenplanning, het wedstrijdreglement, ticketprijzen en de actuele bezetting van het circuit. Dankzij een intuïtief dashboard kunnen studenten direct zien welke scholen zich al hebben aangemeld en hoe de voorbereidingen verlopen. De focus lag op het creëren van een snelle, sportieve en moderne online ervaring die direct de sfeer van het circuit overbrengt op de bezoeker, wat resulteert in een hoge conversie van websitebezoeker naar geregistreerde deelnemer.
        </p>

        <h2><i class="fas fa-user-check"></i> Mijn aandeel hierin</h2>
        <p>
            Als Digital Designer binnen ons team (bestaande uit 4 designers, 1 web codeur en 3 programmeurs) was ik verantwoordelijk voor de volledige visuele stijl en de structuur van het webplatform. Ik heb de interface vanaf de grond opgebouwd in Figma, waarbij ik gebruik heb gemaakt van een strakke, sportieve esthetiek met een duidelijke hiërarchie en intuïtieve navigatiepaden. 
        </p>
        <p>
            Tijdens het ontwerpproces heb ik de UX uitgebreid getest via interactieve wireframes og prototypes. Ik heb alle wervende teksten geschreven, passend beeldmateriaal geselecteerd en de fotografie geoptimaliseerd voor het web. Een belangrijk onderdeel van mijn aandeel was het ontwerpen van een volledig responsieve layout, zodat de website op zowel desktop, tablet als smartphone een vlekkeloze en professionele indruk achterlaat. Tevens heb ik nauw samengewerkt met de web codeur om te garanderen dat de HTML/CSS-transities en de visuele details exact overeenkwamen met de ontworpen Figma-schermen.
        </p>

        <h2><i class="fas fa-lightbulb"></i> Wat ik eruit geleerd heb</h2>
        <p>
            Het ontwerpen van een grootschalig webplatform voor een reële, prominente opdrachtgever als Karting Genk heeft mijn blik als ontwerper verbreed. Ik heb geleerd hoe ik complexe data – zoals reglementen en variabele planningen – kan structureren tot een overzichtelijk ... aantrekkelijk geheel voor een jonge doelgroep. Het werken in een Scrum-omgeving heeft mijn planningsvaardigheden verbeterd en me lanten inzien hoe belangrijk goede documentatie is.
        </p>
        <p>
            Daarnaast heb ik geleerd om strategisch te ontwerpen; een design moet niet alleen esthetisch mooi zijn, maar ook commercieel en wervend werken om de doelstellingen van de klant te behalen. Het overleggen met programmeurs en codeurs heeft mijn begrip van web-beperkingen en -mogelijkheden vergroot, waardoor ik in de toekomst nóg efficiëntere designs kan opleveren die direct bouwbaar zijn.
        </p>

        <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="https://www.figma.com/proto/uVIVMtHAuVKpu4QCEdKCjQ/WPL2--Karting-Genk?node-id=2157-5604&viewport=-2233%2C155%2C0.11&t=IGvo1Y5aUlt6CcJ2-1&scaling=min-zoom&content-scaling=fixed&page-id=2157%3A5503" target="_blank" class="btn btn-primary">Bekijk Figma Prototype <i class="fas fa-external-link-alt"></i></a>
            <a href="https://confdigi.pxl.be/spaces/2526WPL2T07/overview" target="_blank" class="btn btn-secondary">Confluence Documentatie <i class="fas fa-book"></i></a>
        </div>
    `
};

// ==========================================
// 2. ENGELSE DATASETS (modalDataEN)
// ==========================================
const modalDataEN = {
    'modal-app': `
        <h1 class="footer-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Campus Karting App</h1>
        <div class="project-category" style="margin-bottom: 2rem;">App Development • Event Technology</div>
        
        <h2><i class="fas fa-info-circle"></i> Project Description</h2>
        <p>
            Karting Genk challenged us to develop a concept aimed at attracting a younger demographic and students to the track. The result is the "Campus Karting Student League": an exclusive racing event centered around the competition between educational institutions. Students from Hogeschool PXL, UCLL, and UHasselt go head-to-head during an adrenaline-fueled racing weekend at the iconic Genk circuit.
        </p>
        <p>
            While the website acts as the online storefront prior to the event, the Campus Karting App was specifically designed to be the indispensable digital partner during the race days themselves. The app is fully tailored to meet the needs of visitors and drivers on and around the track. Its core features include a live ranking system to track real-time lap times and school standings, an interactive map of the circuit complex, and an integrated ticket wallet. Through this wallet, users can purchase and scan digital tokens to get food and drinks. This total concept elevates the physical experience on the race day to a professional, modern standard.
        </p>

        <h2><i class="fas fa-user-check"></i> My Contribution</h2>
        <p>
            Within our multidisciplinary team consisting of 4 designers, 1 web developer, and 3 programmers, I took on the role of Digital Designer. My main responsibility was managing the visual and functional trajectory of the mobile application. I translated the sporty and dynamic visual identity of the Student League into a mobile user interface that matches the high energy of kart racing and connects with the student demographic.
        </p>
        <p>
            Concertedly, I was involved from start to finish with the User Interface (UI) design in Figma. I closely managed the User Experience (UX) by building interactive prototypes and detailed user flows. I was responsible for content creation, which included selecting and editing visuals and photos, alongside writing all functional microcopy within the app. Furthermore, I ensured all layouts were fully responsive across various device screen sizes. As a designer, I acted as the crucial bridge to our three programmers; by thoroughly documenting and handing over my designs, they were able to build the flawless wallet and ranking system exactly as intended in the UX layout.
        </p>

        <h2><i class="fas fa-lightbulb"></i> Key Learnings</h2>
        <p>
            This project significantly accelerated my professional growth. Operationally, I learned how to effectively collaborate within a larger team utilizing Scrum methodologies. By organizing daily stand-ups and taking on the role of Scrum Master, I strengthened my leadership and communication skills, learning how to effectively align the goals of both creatives and developers.
        </p>
        <p>
            On a technical level, I sharply refined my Figma skills, particularly in advanced prototyping, constraints, and component libraries. I also gained valuable knowledge regarding version control via GitHub and structured backlog management in Confluence. However, the most important lesson was developing a highly critical eye for my own designs; through intensive feedback sessions, I learned to make choices that are not just visually appealing, but functionally beneficial to Karting Genk's goals.
        </p>

        <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="https://www.figma.com/proto/8naGKoPp9s6wzw9ctjrkT6/Campus-karting-App---portfolio?node-id=1-863&viewport=198%2C214%2C0.26&t=KV0E3e67MBYP3A11-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A863&page-id=0%3A1" target="_blank" class="btn btn-primary">View Figma Prototype <i class="fas fa-external-link-alt"></i></a>
            <a href="https://confdigi.pxl.be/spaces/2526WPL2T07/overview" target="_blank" class="btn btn-secondary">Confluence Documentation <i class="fas fa-book"></i></a>
        </div>
    `,
    'modal-web': `
        <h1 class="footer-title" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Campus Karting Website</h1>
        <div class="project-category" style="margin-bottom: 2rem;">Web Development • UI/UX Design</div>
        
        <h2><i class="fas fa-info-circle"></i> Project Description</h2>
        <p>
            Commissioned by Karting Genk, our team was tasked with putting the "Campus Karting Student League" on the digital map. This event challenges students from Hogeschool PXL, UCLL, and Hasselt University to battle for the pride of their respective institutions during an intense racing weekend. To bring this event to life, a centralized online platform was essential.
        </p>
        <p>
            The primary goal of the web platform is recruitment and comprehensive information sharing. The website is engineered to generate excitement among students, mobilize racing teams, and attract universities. The platform offers a clear overview of event schedules, tournament regulations, ticket pricing, and real-time track occupancy. Thanks to an intuitive dashboard, students can instantly see which schools have registered and track ongoing preparations. The focus was on creating a fast, sporty, and modern online experience that immediately channels the racetrack atmosphere to the visitor, resulting in high conversion rates from casual visitor to registered participant.
        </p>

        <h2><i class="fas fa-user-check"></i> My Contribution</h2>
        <p>
            As the Digital Designer within our team (comprising 4 designers, 1 web developer, and 3 programmers), I was responsible for the entire visual style and structural layout of the web platform. I built the interface from scratch in Figma, implementing a clean, sporty aesthetic with a sharp visual hierarchy and intuitive user navigation paths.
        </p>
        <p>
            Throughout the design process, I rigorously tested the UX using interactive wireframes and high-fidelity prototypes. I authored all promotional copywriting, selected appropriate visual assets, and optimized photography for web delivery. A critical component of my role was designing a fully responsive layout, ensuring the website delivers a flawless and professional impression across desktop, tablet, and smartphone screens. I also worked closely with the web developer to guarantee that the HTML/CSS transitions and visual details matched the designed Figma mockups perfectly.
        </p>

        <h2><i class="fas fa-lightbulb"></i> Key Learnings</h2>
        <p>
            Designing a large-scale web platform for a prominent, real-world client like Karting Genk expanded my horizons as a digital designer. I mastered how to structure complex data—such as dense regulations and variable time schedules—into an accessible and engaging interface for a younger audience. Operating within a Scrum environment refined my planning workflows and highlighted the immense value of sound project documentation.
        </p>
        <p>
            Furthermore, I learned how to design strategically; a digital interface must not only look aesthetically premium but must function commercially to convert users and fulfill the client's business metrics. Interacting directly with developers broadened my understanding of web constraints and browser capabilities, which will allow me to deliver even more efficient, build-ready designs in future projects.
        </p>

        <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="https://www.figma.com/proto/uVIVMtHAuVKpu4QCEdKCjQ/WPL2--Karting-Genk?node-id=2157-5604&viewport=-2233%2C155%2C0.11&t=IGvo1Y5aUlt6CcJ2-1&scaling=min-zoom&content-scaling=fixed&page-id=2157%3A5503" target="_blank" class="btn btn-primary">View Figma Prototype <i class="fas fa-external-link-alt"></i></a>
            <a href="https://confdigi.pxl.be/spaces/2526WPL2T07/overview" target="_blank" class="btn btn-secondary">Confluence Documentation <i class="fas fa-book"></i></a>
        </div>
    `
};

// ==========================================
// 3. LOGICA EN FUNCTIES (Taal-detectie toegevoegd)
// ==========================================
function openModal(id) {
    // Check de 'lang' property van je html pagina (<html lang="nl"> of lang="en")
    const currentLang = document.documentElement.lang || 'nl';

    // Selecteer de juiste dataset op basis van de taal
    let selectedText = "";
    if (currentLang === 'en') {
        selectedText = modalDataEN[id];
    } else {
        selectedText = modalDataNL[id];
    }

    // Vul en toon de modal
    document.getElementById('modalContent').innerHTML = selectedText;
    document.getElementById('projectModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Voorkom scrollen achter modal
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Herstel scrollen
}

// Sluit modal bij klik buiten de container
window.onclick = function(event) {
    let modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}
// ==========================================
// VIDEO MODAL LOGICA VOOR MOTION PROJECTEN
// ==========================================

function openVideoModal(videoSrc, title, description) {
    const modalContent = document.getElementById('modalContent');

    // Bouw de HTML op voor de video player in jouw huisstijl
    modalContent.innerHTML = `
        <div class="modal-video-wrapper">
            <video src="${videoSrc}" controls autoplay playsinline></video>
        </div>
        <div class="modal-text-content">
            <div class="project-category" style="margin-bottom: 1rem;">Motion Design • 2025</div>
            <h2 style="color: var(--blue-600); margin-top: 0; margin-bottom: 1rem; font-size: 1.8rem;">${title}</h2>
            <p style="line-height: 1.8; margin-bottom: 0;">${description}</p>
        </div>
    `;

    // Toon de modal en stop achtergrond scrollen
    document.getElementById('projectModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// UPDATE VAN JOUW BESTAANDE closeModal FUNCTIE:
function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Herstel scrollen
    // BELANGRIJK: Maak de content leeg zodat de video stopt met afspelen op de achtergrond!
    document.getElementById('modalContent').innerHTML = '';
}

// Sluit modal bij klik buiten de container
window.onclick = function(event) {
    let modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}