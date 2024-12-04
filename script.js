console.log("Welcome To Spotify");

//Initialize the variables
let songIndex = 0;
let masterSongName = document.getElementById('masterSongName');
let audioElement = new Audio('songs/6.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
const nextButton = document.getElementById('ForwardPlaylist');
const songItemContainer = document.querySelector(".songItemContainer");


// 
let songs = [
  {songName: "Warriyo - Mortals (feat. Laura Brehm)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
  {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
  {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
  {songName: "Different Heaven & EHIDE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
  {songName: "Janji-Heros-Tonight-feat-Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
  {songName: "Ransom - Lil Tecca ft. Juice Wrld", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
  {songName: "Bol Do Na Zara - Azhar", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
  {songName: "Dil Diyan Gallan - Atif Aslam", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
  {songName: "I Wanna Be Yours - Arctic Monkeys", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
  {songName: "Jo Tum Meray Ho - Anuv Jain", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

let SecondSongs = [
  {songName: "Big Dawgs - HanumanKind", filePath: "songs-2/11.mp3", coverPath: "covers/11.jpg"},
  {songName: "Rude - Magic", filePath: "songs-2/12.mp3", coverPath: "covers/12.jpg"},
  {songName: "Perfect - Ed Sheeran", filePath: "songs-2/13.mp3", coverPath: "covers/13.jpg"},
  {songName: "I Want It - Juice Wrld", filePath: "songs-2/14.mp3", coverPath: "covers/14.jpg"},
  {songName: "Die With A Smile - Bruno Mars & Lady Gaga", filePath: "songs-2/15.mp3", coverPath: "covers/15.jpg"}
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


// Handle play/pause click

masterPlay.addEventListener('click', () => {
  if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
})

//Listen to Events

audioElement.addEventListener('timeupdate', () => {
  //Update Seekbar

  progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
  myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});

document.getElementById('Next').addEventListener('click', () => {
  if(songIndex >= 9){
    songIndex = 0
  } else{
    songIndex += 1
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterSongName.innerText = songs[songIndex].songName;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('Previous').addEventListener('click', () => {
  if(songIndex <= 0){
    songIndex = 9
  } else{
    songIndex -= 1
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterSongName.innerText = songs[songIndex].songName;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});

function NextPlaylist(){ 
document.getElementById('ForwardPlaylist').innerText = 'Next Playlist ➡️';
}

ForwardPlaylist.addEventListener('mouseover', NextPlaylist);
ForwardPlaylist.addEventListener('mouseout', () => {
ForwardPlaylist.innerText = 'Next';
});



function generateNewPlaylist(){

  // Clear Current Playlist
  songItemContainer.innerHTML ="";

  // New playlist

  SecondSongs.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.classList.add("songItem");

    songItem.innerHTML = `
      <img src="${SecondSongs[index].coverPath}" alt="${index + 1}">
      <span class = "songName">${SecondSongs[index].songName}</span>
      <span class = "songlistplay">
        <span class = "timestamp"> <i id ="${index}" class = "fas songItemPlay fa-play-circle"></i></span>
        </span>
    `;
    
    songItemContainer.appendChild(songItem);
  });
  //Re-attach play button functionality for the new playlist
  
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
     
      // Stop any currently playing song
      makeAllPlays();
      
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      masterSongName.innerText = SecondSongs[songIndex].songName;
      audioElement.src = SecondSongs[songIndex].filePath; // Ensure to set the correct file path
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
    });
  });
}

nextButton.addEventListener('click', generateNewPlaylist);