const musicContainer = document.querySelector('.music-container'); 
const playBtn = document.querySelector('#play'); 
const prevBtn = document.querySelector('#prev'); 
const nextBtn = document.querySelector('#next'); 
const audio = document.querySelector('#audio'); 
const progress = document.querySelector('.progress'); 
const progressContainer = document.querySelector('.progress-container'); 
const title = document.querySelector('#title');
const musicCover = document.querySelector('#cover');

// song titles
const songs = [
    "Interesting_life",
    "Creative_music",
    "Country_music",
    "Deploy_music"
]

// kep of saongs
let songIndex = 0;

// Initially load song info dom

loadSong(songs[songIndex]);
// updated song details
function loadSong(song){
    title.innerText = song;
    audio.src = `../music/${song}.mp3`;
    musicCover.src = `../img/${song}.png`
}

function playSong(){
    musicContainer.classList.add("play");
    playBtn.querySelector('i.fas').classList.remove("fa-play");
    playBtn.querySelector('i.fas').classList.add("fa-pause");

    audio.play();
}

function pausedSong(){
    musicContainer.classList.remove("play");
    playBtn.querySelector('i.fas').classList.add("fa-play");
    playBtn.querySelector('i.fas').classList.remove("fa-pause");

    audio.pause();
}
// EventListeners
playBtn.addEventListener('click', function(){
    const isPlaying = musicContainer.classList.contains("play");

    if(isPlaying){
        pausedSong();
    }
    else{
        playSong();
    }
});

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log(clickX);
    const duratrion = audio.duration;
    audio.currentTime = (clickX / width) * duratrion
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;

    const progressPercent = (currentTime / duration ) * 100;

    progress.style.width = `${progressPercent}%`
}

function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    
    loadSong(songs[songIndex]);

    playSong();
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex]);

    playSong();
}


// change song events 
prevBtn.addEventListener('click', prevSong); 
nextBtn.addEventListener('click', nextSong); 
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const box = document.querySelector('.box');
const home = document.querySelector('.home');
const upload_item = document.querySelector('.upload-item');
yesBtn.addEventListener('click', function(){
    box.classList.remove("none");
    home.classList.add("none");
});

noBtn.addEventListener('click', function(){
    upload_item.classList.remove('none');
    home.classList.add("none");
});

function addMusic(input){
    const file = this.files[0];
    const fileReader = new FileReader();
    if(file){
        fileReader.onload = function(event){
            const result = fileReader.result;
            audio.src = result;
            musicCover.src = `../img/Interesting_life.png`;
        }
        fileReader.readAsDataURL(file);
    }
}


const addBtn = document.querySelector("#btn");
const input = document.querySelector("#fmusic");

input.addEventListener('change', addMusic);

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    upload_item.classList.add('none');
    box.classList.remove('none');
});