// Telugu songs data
const songs = [
    {
        title: "Rendu Kallu",
        artist: "Armaan Malik",
        duration: "3:21",
        src: "https://mp3teluguwap.net/mp3/2017/Mahanubavudu%20-%20(2017)/Mahanubavudu%20(2017)%20-%20HQ/Rendu%20Kallu%20-%20SenSongsMp3.Co.mp3", // Placeholder URL
        cover: "https://www.behindwoods.com/telugu-movies/mahanubhavudu/stills-photos-pictures/thumbnails/mahanubhavudu-stills-photos-pictures-10.jpg"
    },
    {
        title: "Vachinde",
        artist: "Madhu Priya, Ramki",
        duration: "4:43",
        src: "https://sentunes.online/mp32/mp3/Fidaa%20(2017)%20-%20HQ/Vachinde-SenSongsMp3.Co.mp3", // Placeholder URL
        cover: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201707/647_072517100532_0.jpg"
    },
    {
        title: "Samajavaragamana",
        artist: "Sid Sriram",
        duration: "4:30",
        src: "https://mp3teluguwap.net/mp3/2020/Ala%20Vaikunthapurramuloo%20(2020)/Ala%20Vaikunthapurramuloo%20(2020)/Samajavaragamana%20-%20SenSongsMp3.Co.mp3", // Placeholder URL
        cover: "https://www.telugubulletin.com/wp-content/uploads/2020/01/Ala-Vaikunthapurramuloo-8.jpg"
    },
    {
        title: "Hungry Cheetah",
        artist: "S S Thaman",
        duration: "3:15",
        src: "https://mp3teluguwap.net/mp3/2023/OG/Hungry%20Cheetah.mp3", 
        cover: "https://assets-in.bmscdn.com/discovery-catalog/events/et00369074-nahbfahnzd-landscape.jpg"
    },
    {
        title: "Ragile Ragile",
        artist: "Anirudh Ravichander and Siddharth Basrur",
        duration: "5:30",
        src: "https://mp3teluguwap.net/mp3/2025/Kingdom/Ragile%20Ragile.mp3", 
        cover: "https://cdn.123telugu.com/content/wp-content/uploads/2025/07/Kingdom-17.jpg"
    },
];

// DOM elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');
const albumArtImg = albumArt.querySelector('img');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const playlist = document.getElementById('playlist');
const autoplayToggle = document.getElementById('autoplayToggle');
const notification = document.getElementById('notification');

// Player state
let currentSongIndex = 0;
let isPlaying = false;
let autoplay = true;

// Initialize player
function initPlayer() {
    loadSong(currentSongIndex);
    renderPlaylist();
    
    // Set initial volume
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Set autoplay toggle
    if (autoplay) {
        autoplayToggle.classList.add('active');
    }
}

// Load song
function loadSong(index) {
    const song = songs[index];
    
    // Since we can't use actual audio files, we'll simulate them
    // In a real implementation, you would set the src to the actual audio file
    // audioPlayer.src = song.src;
    
    // Update UI
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArtImg.src = song.cover;
    
    // Update playlist active state
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Reset progress
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = song.duration;
    
    // Simulate song duration for demo purposes
    const [minutes, seconds] = song.duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    
    // In a real implementation, you would wait for the 'loadedmetadata' event
    // For demo purposes, we'll simulate it
    simulateAudioProgress(totalSeconds);
}

// Simulate audio progress for demo purposes
let progressInterval;
let currentSeconds = 0;

function simulateAudioProgress(totalSeconds) {
    clearInterval(progressInterval);
    currentSeconds = 0;
    
    if (isPlaying) {
        progressInterval = setInterval(() => {
            currentSeconds++;
            updateProgress(currentSeconds, totalSeconds);
            
            if (currentSeconds >= totalSeconds) {
                clearInterval(progressInterval);
                if (autoplay) {
                    nextSong();
                } else {
                    pauseSong();
                }
            }
        }, 1000);
    }
}

// Update progress
function updateProgress(current, total) {
    const progressPercent = (current / total) * 100;
    progress.style.width = `${progressPercent}%`;
    
    const currentMinutes = Math.floor(current / 60);
    const currentSeconds = Math.floor(current % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}

// Play song
function playSong() {
    isPlaying = true;
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
    
    // In a real implementation, you would play the audio
    // audioPlayer.play();
    
    // For demo purposes, we'll simulate playing
    const song = songs[currentSongIndex];
    const [minutes, seconds] = song.duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    simulateAudioProgress(totalSeconds);
    
    showNotification(`Now playing: ${song.title}`);
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
    
    // In a real implementation, you would pause the audio
    // audioPlayer.pause();
    
    // For demo purposes, we'll stop the progress simulation
    clearInterval(progressInterval);
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    
    if (isPlaying) {
        playSong();
    }
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    
    if (isPlaying) {
        playSong();
    }
}

// Render playlist
function renderPlaylist() {
    playlist.innerHTML = '';
    
    songs.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        if (index === currentSongIndex) {
            playlistItem.classList.add('active');
        }
        
        playlistItem.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration">${song.duration}</div>
        `;
        
        playlistItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        
        playlist.appendChild(playlistItem);
    });
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Event listeners
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

progressContainer.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const width = progressContainer.offsetWidth;
    const clickPercent = (clickX / width) * 100;
    
    // In a real implementation, you would set the currentTime
    // audioPlayer.currentTime = (clickPercent / 100) * audioPlayer.duration;
    
    // For demo purposes, we'll simulate it
    const song = songs[currentSongIndex];
    const [minutes, seconds] = song.duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const newCurrentSeconds = Math.floor((clickPercent / 100) * totalSeconds);
    
    currentSeconds = newCurrentSeconds;
    updateProgress(currentSeconds, totalSeconds);
});

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    volumeValue.textContent = `${volume}%`;
    
    // In a real implementation, you would set the volume
    // audioPlayer.volume = volume / 100;
});

autoplayToggle.addEventListener('click', () => {
    autoplay = !autoplay;
    autoplayToggle.classList.toggle('active');
    
    showNotification(autoplay ? 'Autoplay enabled' : 'Autoplay disabled');
});

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', initPlayer);