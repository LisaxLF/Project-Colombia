// const hipsDontLie = new Audio('/dist/songs/careless_whispers.mp3');
// const carelessWhispers = new Audio('/dist/songs/hips_dont_lie.mp3');
// const backgroundMusic = new Audio('/dist/sounds/achtergrondGeluid.wav');

// let currentSongIndex = 0;

// // Array of songs
// const radioSongs = [hipsDontLie, carelessWhispers];

// // connect song to audio element and click event
// const radio = document.querySelector('.radio');

// radio.addEventListener('click', () => {
//     console.log('clicked');
//     // Stop het achtergrondgeluid
//     backgroundMusic.pause();

//     // get current song
//     const currentSong = radioSongs[currentSongIndex];

//     // stop het huidige nummer
//     radioSongs.forEach(song => {
//         song.pause();
//         song.currentTime = 0;
//     });

//     // speel het geselecteerde nummer af
//     currentSong.play().catch(error => {
//         console.error("Failed to play the song:", error);
//     });

//     // incrementeer de index voor het volgende nummer
//     currentSongIndex++;

//     // als het einde van de array is bereikt, ga terug naar het begin
//     if (currentSongIndex > radioSongs.length - 1) {
//         currentSongIndex = 0;
//     }
// });

// radio.addEventListener('touchstart', () => {
//     console.log('clicked');
//     // Stop het achtergrondgeluid
//     backgroundMusic.pause();

//     // get current song
//     const currentSong = radioSongs[currentSongIndex];

//     // stop het huidige nummer
//     radioSongs.forEach(song => {
//         song.pause();
//         song.currentTime = 0;
//     });

//     // speel het geselecteerde nummer af
//     currentSong.play().catch(error => {
//         console.error("Failed to play the song:", error);
//     });

//     // incrementeer de index voor het volgende nummer
//     currentSongIndex++;

//     // als het einde van de array is bereikt, ga terug naar het begin
//     if (currentSongIndex > radioSongs.length - 1) {
//         currentSongIndex = 0;
//     }
// });

// // touch move
// document.querySelector('body').addEventListener('touchmove', () => {
//     // begin het achtergrond geluid 
//     backgroundMusic.play().catch(error => {
//         console.error("Failed to play the background music:", error);
//     });
// });

// // touch move
// document.querySelector('body').addEventListener('click', () => {
//     // begin het achtergrond geluid 
//     backgroundMusic.play().catch(error => {
//         console.error("Failed to play the background music:", error);
//     });
// });