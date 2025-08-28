// audios
const audios = [ 
  document.getElementById('rain-audio'),
  document.getElementById('coffee-audio'),
  document.getElementById('jazz-audio'),
  document.getElementById('fire-audio'),
  document.getElementById('paper-audio'),
]
// volume sliders
const sliders = [
  document.getElementById('rain-volume'),
  document.getElementById('coffee-volume'),
  document.getElementById('jazz-volume'),
  document.getElementById('fire-volume'),
  document.getElementById('paper-volume')
]

// the right section of the website
const rightSide = document.getElementById("right-side");
const options = document.getElementById("buttons");
// buttons
const timerButton = document.getElementById("timer-button");
const timerSection = document.getElementById("timer");
const startTimerButton = document.getElementById("start");
const stopTimerButton = document.getElementById("stop");

// mute all audios at the start
for (audio of audios) {
  audio.volume = 0;
}

/**
 * unmute all audio
 */
function playAudio() {
  console.log("playing");

  for (audio of audios) {
    audio.muted = false;
    audio.play();
  }

  
  window.removeEventListener('click', playAudio);
  window.removeEventListener('keydown', playAudio);
}

// waits for user click on page
window.addEventListener('click', playAudio);
window.addEventListener('keydown', playAudio);

// audio volume adjusts based on slider amount
for (let i = 0; i < sliders.length; i++ ) {
  sliders[i].addEventListener('input', function() {
    audios[i].volume = sliders[i].value;
  });
}

// the time given by user (default = 25:00)
const time = document.getElementById("time");
let currentCountdown;
let currentTimeSecs = 0;
let currentTimeMins = 0;

/**
 * checks if the input is following the "mm:ss" format, including 60:00
 * @param {string} input the user input
 * @returns true if the format is followed, otherwise returns false
 */
function isValidTime(input) {
  // checks if the input is valid
  const regex = /^(60:00|([01]\d|[2-5][0-9]):[[0-5]\d)$/;
  return regex.test(input);
}

/**
 * starts the countdown based on the user's given time
 */
function startTimer() {
  timeGiven = time.value.split(":");
  
  if (!isValidTime(time.value)) {
    alert("Invalid Input.");
    time.value = "00:00"
  } else {
    currentTimeMins = Number(timeGiven[0]);
    currentTimeSecs = Number(timeGiven[1]);
    time.disabled = true;
    currentCountdown = setInterval(countdown, 1000);
  }
}

/**
 * counts down based on the user's given time
 */
function countdown() {
  if (currentTimeMins === 0 && currentTimeSecs === 0) {
    clearInterval(currentCountdown)
    time.disabled = false;
  } else {
    if (currentTimeSecs === 0) {
      currentTimeSecs = 59;
      currentTimeMins -= 1;
    } else {
      currentTimeSecs -= 1;
    }

    console.log(`${currentTimeMins.toString().padStart(2,"0")}:${currentTimeSecs.toString().padStart(2,"0")}`)
    time.value = `${currentTimeMins.toString().padStart(2,"0")}:${currentTimeSecs.toString().padStart(2,"0")}`
  }
}

/**
 * shows the timer on the website
 */
function showTimer() {
  timerSection.classList.toggle('open');
  rightSide.style.justifyContent = "flex-start";
}

/**
 * stops the timer
 */
function stopTimer() {
  clearInterval(currentCountdown)
  time.textContent = "25:00";
}

// button event listeners
timerButton.addEventListener('click', showTimer);
startTimerButton.addEventListener('click', startTimer);
stopTimerButton.addEventListener('click', stopTimer);


