document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="slider"]');
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    const playPauseButton = document.getElementById("play-pause");
    const progressBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");

    const songs = {
        "item-1": {
            src: "song1.mp3",
            title: "STAY WITH ME",
            artist: "Miki Matsubara",
            duration: "4:05"
        },
        "item-2": {
            src: "song2.mp3",
            title: "SHINUNOGA E-WA",
            artist: "Fujii Kaze",
            duration: "3:05"
        },
        "item-3": {
            src: "song3.mp3",
            title: "EENIE MEENIE",
            artist: "Justin Bieber",
            duration: "2:05"
        }
    };

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            const song = songs[radio.id];
            audioSource.src = song.src;
            audioPlayer.load();
            audioPlayer.play();
            updatePlayPauseIcon();
            updateSongInfo(song);
        });
    });

    playPauseButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        updatePlayPauseIcon();
    });

    audioPlayer.addEventListener("timeupdate", () => {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = `${percentage}%`;
    });

    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = offsetX / rect.width;
        audioPlayer.currentTime = percentage * audioPlayer.duration;
    });

    function updatePlayPauseIcon() {
        const icon = playPauseButton.querySelector("svg path");
        if (audioPlayer.paused) {
            icon.setAttribute("d", "M5 3l14 9-14 9V3z");
        } else {
            icon.setAttribute("d", "M6 4h4v16H6zM14 4h4v16h-4z");
        }
    }

    function updateSongInfo(song) {
        const infoArea = document.getElementById("test");
        const titleElement = infoArea.querySelector(".title");
        const subtitleElement = infoArea.querySelector(".subtitle");
        const timeElement = infoArea.querySelector(".time");

        titleElement.textContent = song.title;
        subtitleElement.textContent = song.artist;
        timeElement.textContent = song.duration;
    }
});
