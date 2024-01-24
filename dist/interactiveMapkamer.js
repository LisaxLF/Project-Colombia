const ringing = new Audio('/dist/sounds/ringing.wav');
const knocking = new Audio('/dist/sounds/knocking.wav');

const hipsDontLie = new Audio('/dist/songs/careless_whispers.mp3');
const carelessWhispers = new Audio('/dist/songs/hips_dont_lie.mp3');
const backgroundMusic = new Audio('/dist/sounds/achtergrondGeluid.wav');

let currentSongIndex = 0;

// Array of songs
const radioSongs = [hipsDontLie, carelessWhispers];

var zoomer = panzoom(document.querySelector("#containerRoom"), {
    maxZoom: 3,
    minZoom: 0,
    zoomSpeed: 0.2,
});

zoomer.on("zoom", () => document.querySelectorAll('.markerRoom[data-visible]').forEach(checkIfZoomedRoom));

function checkIfZoomedRoom(marker) {
    let treshold = 0.2;
    let markerSize = marker.getBoundingClientRect();

    if (markerSize.width / window.innerWidth > treshold) {
        if (!marker.hasAttribute("data-active")) {
            marker.setAttribute("data-active", "");

            // Als het entry.target de ID 'telefoon' heeft, pas de opacity aan
            // if (marker.id === 'telefoon') {
            //     let telefoonMarker = document.querySelector('.telefoon');

            //     // Voeg de klasse 'active' toe
            //     telefoonMarker.classList.add('active');

            //     // play sounds loop
            //     ringing.loop = true;
            //     ringing.play();
            // }

            // Check of alle markers nu actief zijn
            if (areAllMarkersActive()) {
                // TO-DO: er wordt op de deur geklopt
                setTimeout
                    (() => {
                        const geklop = document.querySelector('.klop')
                        // Stop het achtergrondgeluid (indien nodig)
                        backgroundMusic.pause();
                        backgroundMusic.currentTime = 0;

                        // of de radio
                        radioSongs.forEach(song => {
                            song.pause();
                            song.currentTime = 0;
                        });

                        // Speel het klop gif af
                        geklop.style.zIndex = 10;
                        // Speel het klopgeluid af
                        knocking.play();
                    }, 2000);

                // TO-DO: om eind scene te triggeren op deur gif klikken
                const deur = document.querySelector('.klop');
                deur.addEventListener('touchstart', () => {
                    // Vind het 'InteractiveMotel'-element
                    const end = document.querySelector('.end-trigger');
                    const SectionEnd = document.querySelector('#InteractiveRoom');
                    end.classList.add('active');
                    SectionEnd.removeAttribute('data-prevent-swipe');
                    zoomer.pause();
                    // Stop het klopgeluid
                    knocking.pause();
                    knocking.currentTime = 0;
                    // Stop het achtergrondgeluid
                    backgroundMusic.pause();
                    backgroundMusic.currentTime = 0;
                    // of de radio
                    radioSongs.forEach(song => {
                        song.pause();
                        song.currentTime = 0;
                    });
                });
            }
        } else {
            if (marker.hasAttribute("data-active")) {
                marker.setAttribute("data-active", "");

                // Als het entry.target de ID 'telefoon' heeft, verwijder de klasse 'active'
                if (marker.id === 'telefoon') {
                    let telefoonMarker = document.querySelector('.telefoon');
                    telefoonMarker.classList.remove('active');
                    ringing.pause();
                }
                // TO-DO: Trigger een functie wanneer een marker niet meer actief is
            }
        }
    }
}

// Check of alle markers actief zijn
function areAllMarkersActive() {
    const markers = document.querySelectorAll('.markerRoom');
    return Array.from(markers).every(marker => marker.hasAttribute('data-active'));
}

let observerRoom = new IntersectionObserver(entries => {
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

document.querySelectorAll(".markerRoom").forEach(element => observerRoom.observe(element));


// connect song to audio element and click event
const radio = document.querySelector('.radio');

radio.addEventListener('click', () => {
    console.log('clicked');
    // Stop het achtergrondgeluid
    backgroundMusic.pause();

    // get current song
    const currentSong = radioSongs[currentSongIndex];

    // stop het huidige nummer
    radioSongs.forEach(song => {
        song.pause();
        song.currentTime = 0;
    });

    // speel het geselecteerde nummer af
    currentSong.play().catch(error => {
        console.error("Failed to play the song:", error);
    });

    // incrementeer de index voor het volgende nummer
    currentSongIndex++;

    // als het einde van de array is bereikt, ga terug naar het begin
    if (currentSongIndex > radioSongs.length - 1) {
        currentSongIndex = 0;
    }
});

radio.addEventListener('touchstart', () => {
    console.log('clicked');
    // Stop het achtergrondgeluid
    backgroundMusic.pause();

    // get current song
    const currentSong = radioSongs[currentSongIndex];

    // stop het huidige nummer
    radioSongs.forEach(song => {
        song.pause();
        song.currentTime = 0;
    });

    // speel het geselecteerde nummer af
    currentSong.play().catch(error => {
        console.error("Failed to play the song:", error);
    });

    // incrementeer de index voor het volgende nummer
    currentSongIndex++;

    // als het einde van de array is bereikt, ga terug naar het begin
    if (currentSongIndex > radioSongs.length - 1) {
        currentSongIndex = 0;
    }
});

// touch move
document.querySelector('#InteractiveRoom').addEventListener('touchmove', () => {
    // begin het achtergrond geluid 
    backgroundMusic.play().catch(error => {
        console.error("Failed to play the background music:", error);
    });
});

// touch move
document.querySelector('#InteractiveRoom').addEventListener('click', () => {
    // begin het achtergrond geluid 
    backgroundMusic.play().catch(error => {
        console.error("Failed to play the background music:", error);
    });
});