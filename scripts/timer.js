export default class Timer {
  constructor() {
    this.deadline = 15 * 60;
    this.init();
    this.timerInterval;
  }

  init() {
    this.timerInterval = setInterval(() => {
      this.deadline--;
      this.updateTimer();
      if (this.deadline === 0) {
        clearInterval(this.timerInterval);
        document.querySelector("#you-win p:first-child").textContent =
          "TIME'S UP";
        document.querySelector("#you-win p:last-child").textContent =
          "Wild animals are eating you now.";

        document.querySelector(
          "#output p:first-child"
        ).textContent = `MISSION:`;
        document.querySelector("#output p:last-child").textContent = "Survive.";
        document.querySelector("#apero").style.background =
          " center / contain no-repeat url(./assets/images/lost.jpg)";

        document.querySelector("#apero").style.display = "block";
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  updateTimer() {
    const timerText = document.querySelector("#timer span");
    if (this.deadline <= 180) {
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

    timerText.textContent = `${minutes}:${twoDigitSeconds}`;
  }
}
