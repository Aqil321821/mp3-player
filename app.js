const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


//song titles
const songs = ['hey', 'summer', 'ukulele'];

//track index of song
let songIndex = 2;

//initial loading of song on DOM

loadSong(songs[songIndex]);


//update song details on dom

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}



//play song function
function playSong() {
    musicContainer.classList.add('play');
    //remove play button
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    //now play the audio with default method play()
    audio.play();
}

//pause song function
function pauseSong() {
    musicContainer.classList.remove('play');
    //remove play button
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    //now play the audio with default method play()
    audio.pause();
}

//prev song

function prevSong() {
    songIndex--;


    //check if its first song currently playing and we click on prev btn then play the last song
    if (songIndex < 0) {
        songIndex = songs.length - 1;

    }

   loadSong(songs[songIndex]);
   playSong();

}

function nextSong() {
    songIndex++;


    //check if its first song currently playing and we click on prev btn then play the last song
    if (songIndex > songs.length-1) {
        songIndex =0;

    }

   loadSong(songs[songIndex]);
   playSong();

}

// update progress bar
function updateProgress(e){
    /* 
    we can get current time and duration of the song from source element property of 'e'

    */
  
    const {duration,currentTime}=e.srcElement;
    // console.log(duration,currentTime);
    // now create % from these two , how much of % song has played 

    const progressPercent= (currentTime/duration)*100;

    // now set progress width to this variable

    progress.style.width=`${progressPercent}%`;



}

//set progress bar on click

function setProgress(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;

    audio.currentTime= (clickX/width)*duration;


}


















//event listener 
//listen for click and play song
playBtn.addEventListener('click', () => {

    //check if its already playing
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();

    } else {
        playSong();

    }



});

//chnage songs

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//time/song update 
audio.addEventListener('timeupdate',updateProgress);



//click on the prgress bar to play from there
progressContainer.addEventListener('click' ,setProgress);


//songs end
audio.addEventListener('ended',nextSong);
