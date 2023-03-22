const initialScreen = document.getElementById("initial-screen");
const countdownScreen = document.getElementById("countdown-screen");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const focusMinutesInput = document.getElementById("focus-minutes");
const focusSecondsInput = document.getElementById("focus-seconds");
const restMinutesInput = document.getElementById("rest-minutes");
const restSecondsInput = document.getElementById("rest-seconds");
const statusElement = document.getElementById("status");
const timeLeftElement = document.getElementById("time-left");
const favicon = document.getElementById("favicon");
const focusSound = document.getElementById("focus-sound");
const restSound = document.getElementById("rest-sound");

let isPaused = false;
let isFocus = true;
let countdown;

startButton.addEventListener("click", () => {
  initialScreen.classList.add("hidden");
  countdownScreen.classList.remove("hidden");

  const focusTime = [
    Number(focusMinutesInput.value),
    Number(focusSecondsInput.value),
  ];
  const restTime = [
    Number(restMinutesInput.value),
    Number(restSecondsInput.value),
  ];

  countdown = new Countdown(
    focusTime[0] * 60 + focusTime[1],
    restTime[0] * 60 + restTime[1]
  );
  countdown.start();
});

nextButton.addEventListener("click", () => {
  countdown.next();
});

stopButton.addEventListener("click", () => {
  countdown.stop();
  countdownScreen.classList.add("hidden");
  initialScreen.classList.remove("hidden");
  resetBackgroundColor();
});

pauseButton.addEventListener("click", () => {
  if (isPaused) {
    countdown.resume();
    pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    countdown.pause();
    pauseButton.innerHTML = '<i class="fas fa-play"></i>';
  }
  isPaused = !isPaused;
});

class Countdown {
  constructor(focusSeconds, restSeconds) {
    this.focusSeconds = focusSeconds;
    this.restSeconds = restSeconds;
    this.remainingSeconds = focusSeconds;
    this.interval = null;
  }

  start() {
    this.updateTimeLeft();
    this.playSound();
    this.interval = setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds < 0) {
        isFocus = !isFocus;
        this.remainingSeconds = isFocus ? this.focusSeconds : this.restSeconds;
        this.playSound();
        this.changeBackgroundColor();
        this.changeFavicon();
      }

      this.updateTimeLeft();
    }, 1000);
  }

  pause() {
    clearInterval(this.interval);
  }

  resume() {
    this.start();
  }

  next() {
    isFocus = !isFocus;
    this.remainingSeconds = isFocus ? this.focusSeconds : this.restSeconds;
    this.playSound();
    this.changeBackgroundColor();
    this.changeFavicon();
    this.updateTimeLeft();
  }

  stop() {
    clearInterval(this.interval);
    this.remainingSeconds = this.focusSeconds;
  }

  updateTimeLeft() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    const timeLeft = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    statusElement.textContent = isFocus ? "Focus" : "Rest";
    timeLeftElement.textContent = timeLeft;
    document.title = `${timeLeft} - Focus Timer`;
  }

  playSound() {
    if (isFocus) {
      restSound.play();
    } else {
      focusSound.play();
    }
  }

  changeBackgroundColor() {
    if (isFocus) {
      document.body.classList.remove("bg-green-300");
      document.body.classList.add("bg-blue-300");
    } else {
      document.body.classList.remove("bg-blue-300");
      document.body.classList.add("bg-green-300");
    }
  }

  changeFavicon() {
    if (isFocus) {
      favicon.href = "focus.svg";
    } else {
      favicon.href = "rest.svg";
    }
  }
}

function resetBackgroundColor() {
  document.body.classList.remove("bg-green-300");
  document.body.classList.add("bg-blue-300");
}
