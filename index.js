const initialScreen = document.getElementById("initial-screen");
const countdownScreen = document.getElementById("countdown-screen");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const focusTimeInput = document.getElementById("focus-time");
const restTimeInput = document.getElementById("rest-time");
const statusElement = document.getElementById("status");
const timeLeftElement = document.getElementById("time-left");

let isPaused = false;
let isFocus = true;
let countdown;

startButton.addEventListener("click", () => {
  initialScreen.classList.add("hidden");
  countdownScreen.classList.remove("hidden");

  const focusTime = focusTimeInput.value.split(":").map(Number);
  const restTime = restTimeInput.value.split(":").map(Number);

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
});

pauseButton.addEventListener("click", () => {
  if (isPaused) {
    countdown.resume();
    pauseButton.textContent = "Pause";
  } else {
    countdown.pause();
    pauseButton.textContent = "Resume";
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
    this.interval = setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds < 0) {
        isFocus = !isFocus;
        this.remainingSeconds = isFocus ? this.focusSeconds : this.restSeconds;
        this.playSound();
        this.changeBackgroundColor();
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
    // ここでは簡単なビープ音を再生しますが、別の音に変更できます
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 1
    );

    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }

  changeBackgroundColor() {
    if (isFocus) {
      document.body.classList.remove("bg-green-300");
      document.body.classList.add("bg-gray-100");
    } else {
      document.body.classList.remove("bg-gray-100");
      document.body.classList.add("bg-green-300");
    }
  }
}
