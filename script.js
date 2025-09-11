document.addEventListener("DOMContentLoaded", () => {
    const songs = [
        {
            id: 0,
            title: "Afreen Afreen",
            artist: "Rahat Fateh Ali Khan",
            filePath: "song1.mp3", 
            coverPath: "card1img.jpeg" 
        },
        {
            id: 1,
            title: "Mahiye Jinna Sohna",
            artist: "Darshan Raval",
            filePath: "song2.mp3",
            coverPath: "card2img.jpeg"
        },
        {
            id: 2,
            title: "Pehle Bhi Main",
            artist: "Vishal Mishra",
            filePath: "song3.mp3",
            coverPath: "card3img.jpeg"
        },
        {
            id: 3,
            title: "The Last Great American Dynasty",
            artist: "Taylor Swift",
            filePath: "song4.mp3",
            coverPath: "card9img.jpeg"
        },
        {
            id: 4,
            title: "Personal",
            artist: "HRVY",
            filePath: "song5.mp3",
            coverPath: "card10img.jpeg"
        },
        {
            id: 5,
            title: "Shree Hanuman Chalisa",
            artist: "Hariharan",
            filePath: "song6.mp3",
            coverPath: "card11img.jpeg"
        },

    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();

    const playPauseBtn = document.querySelector('img[src="player_icon3.png"]');
    const nextBtn = document.querySelector('img[src="player_icon4.png"]');
    const prevBtn = document.querySelector('img[src="player_icon2.png"]');
    
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.curr-time');
    const totalTimeEl = document.querySelector('.tot-time');
    
    const volumeBar = document.querySelector('.volume-bar');
    const volumeIcon = document.querySelector('.volume i');

    const albumImgPlayer = document.querySelector('.album-img');
    const albumTitlePlayer = document.querySelector('.album-title');
    const artistNamePlayer = document.querySelector('.artist');

    const songCards = document.querySelectorAll('.card');

    
    function loadSong(song) {
        albumTitlePlayer.textContent = song.title;
        artistNamePlayer.textContent = song.artist;
        audio.src = song.filePath;
        
        
        albumImgPlayer.style.backgroundImage = `url(${song.coverPath})`;
        albumImgPlayer.style.backgroundSize = 'cover';
        albumImgPlayer.style.backgroundPosition = 'center';
    }
    function updateSliderProgress(slider) {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    const trackColor = slider.classList.contains('volume-bar') ? '#ffffff' : '#ddd';
    slider.style.background = `linear-gradient(to right, #1bd760 ${value}%, ${trackColor} ${value}%)`;
}

    function playSong() {
        isPlaying = true;
        playPauseBtn.src = "pause_icon.png"; 
        audio.play();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseBtn.src = "player_icon3.png"; 
        audio.pause();
    }
    
    
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }
    function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    updateSliderProgress(progressBar); 

    totalTimeEl.textContent = formatTime(duration);
    currentTimeEl.textContent = formatTime(currentTime);
}
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setVolume() {
        audio.volume = volumeBar.value / 100;
        

        if (audio.volume === 0) {
            volumeIcon.className = 'fa-solid fa-volume-xmark';
        } else if (audio.volume < 0.5) {
            volumeIcon.className = 'fa-solid fa-volume-low';
        } else {
            volumeIcon.className = 'fa-solid fa-volume-high';
        }
    }


    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    audio.addEventListener('timeupdate', updateProgress);
    
    audio.addEventListener('ended', nextSong);

   progressBar.addEventListener('input', (e) => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;

    updateSliderProgress(progressBar);
});

    volumeBar.addEventListener('input', setVolume);
    updateSliderProgress(volumeBar);

    songCards.forEach((card, index) => {
    
        if(songs[index]) {
            card.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(songs[currentSongIndex]);
                playSong();
            });
        }
    });

    loadSong(songs[currentSongIndex]);
    updateSliderProgress(progressBar);
    volumeBar.value = 75; 
    setVolume();
    updateSliderProgress(volumeBar);
});