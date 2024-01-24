var zoomer = panzoom(document.querySelector("#containerMotel"), {
    maxZoom: 3,
    minZoom: 0,
    zoomSpeed: 0.1,
});

zoomer.on("zoom", () => document.querySelectorAll('.markerMotel[data-visible]').forEach(checkIfZoomed));

function checkIfZoomed(marker) {
    let treshold = 0.35;
    let markerSize = marker.getBoundingClientRect();

    if (markerSize.width / window.innerWidth > treshold) {
        if (!marker.hasAttribute("data-active")) {
            marker.setAttribute("data-active", "");
        }

        // Check of alle markers nu actief zijn
        if (checkIfAllMarkersAreActive()) {
            // kijk of alle markers actief zijn
            console.log("Alle markers zijn actief!");
            const Light = document.querySelector('svg');
            Light.classList.add('active');
        } else {
            if (marker.hasAttribute("data-active")) {
                marker.setAttribute("data-active", "");
            }
        }
    }
}

function checkIfAllMarkersAreActive() {
    // kijk of alle markers actief zijn
    const markers = document.querySelectorAll('.markerMotel');
    return Array.from(markers).every(marker => marker.hasAttribute('data-active'));
}

let observerMotel = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry.target.id, entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
        } else {
            entry.target.removeAttribute("data-visible");
        }
    });
}, {
    threshold: .75
});

document.querySelectorAll(".markerMotel").forEach(element => observerMotel.observe(element));