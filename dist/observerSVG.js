// observer voor de SVG
let svgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry.target.id, entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.setAttribute("svg-visible", "");
            // Voer de functie uit wanneer het zichtbaar is en wordt ingezoomd
            checkIfSVGZoomed(entry.target);
        } else {
            entry.target.removeAttribute("svg-visible");
        }
    });
}, {
    threshold: 1
});

// Observeer het enkele SVG-element met de klasse 'glowing-light' en 'active'
const svgElement = document.querySelector('.glowing-light');
if (svgElement) {
    svgObserver.observe(svgElement);
}

// Voeg een eventlistener toe aan het zoom-event van de panzoom-bibliotheek
zoomer.on("zoom", event => {
    // Controleer of het SVG-element zichtbaar is
    const isIntersecting = svgElement.getAttribute("svg-visible") === "";
    if (isIntersecting) {
        // Voer de functie uit wanneer het zichtbaar is en wordt ingezoomd
        checkIfSVGZoomed(svgElement);
    }
});

// Functie om uit te voeren wanneer het SVG-element zichtbaar en ingezoomd is
function checkIfSVGZoomed(svgElement) {
    let treshold = 0.65;
    let elementSize = svgElement.getBoundingClientRect();

    if (elementSize.width / window.innerWidth > treshold) {
        if (!svgElement.hasAttribute("svg-active")) {
            svgElement.setAttribute("svg-active", "");
            // pause de panzoom-bibliotheek
            zoomer.pause();
            // section moet slideable worden
            const slideableSection = document.querySelector('#InteractiveMotel');
            if (slideableSection.hasAttribute('data-prevent-swipe')) {
                slideableSection.removeAttribute('data-prevent-swipe');
            }
        }
    } else {
        if (svgElement.hasAttribute("svg-active")) {
            svgElement.removeAttribute("svg-active");
        }
    }
}