const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // Sounds:
  const sounds = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // Length of the Outline:
  const outlineLength = outline.getTotalLength();

  // Duration:
  let tempDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick Different Sounds:
  sounds.forEach((sound)=>{
      sound.addEventListener("click", function(){
          song.src = this.getAttribute('data-sound');
          video.src = this.getAttribute('data-video');
          checkPlaying(song);
      })
  })

  // Play Sound:
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // Select Sound:
  timeSelect.forEach((button)=>{
      button.addEventListener("click", function(){
          tempDuration = this.getAttribute("data-time");
          timeDisplay.textContent = `${Math.floor(tempDuration / 60)}:${Math.floor(tempDuration % 60)}`
      })
  })

  // Stop and play sound:
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = `./Svg/pause.svg`;
    } else {
      song.pause();
      video.pause();
      play.src = `./Svg/play.svg`;
    }
  };

  // Aniamte the Circle:
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = tempDuration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    // Animate the Circle:
    let progress = outlineLength - (currentTime / tempDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the text:
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= tempDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = `./Svg/play.svg`;
        video.pause();
    }
  };
};

app();
