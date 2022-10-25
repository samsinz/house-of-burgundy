export default class Timer {
  constructor() {
    this.deadline = 10 * 60;
    this.init();
  }

  init() {
    const timerInterval = setInterval(() => {
      this.deadline--;
      this.updateTimer();
      if (this.deadline === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  updateTimer() {
    const timerText = document.querySelector("#timer span");
    if (this.deadline <= 60) {
      timerText.style.color = "red";
      document.querySelector("#timer").style.animation =
        "pulse 1s infinite ease-in-out alternate";
    }
    let minutes = Math.floor(this.deadline / 60);
    let seconds = (this.deadline % 60).toString();
    let twoDigitSeconds = `00${seconds}`.slice(
      seconds.length,
      seconds.length + 2
    );

    timerText.innerHTML = `${minutes}:${twoDigitSeconds}`;
  }
}
