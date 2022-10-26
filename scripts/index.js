import Game from "./game.js";
import Inventory from "./inventory.js";
import Location from "./location.js";

// user sees starter screen before anything else
loadStarterScreen();

document
  .querySelector("#magical-formula")
  .addEventListener("input", handleEndOfGame);

// declare an audio background, which starts playing after starter screen
let audio = new Audio("./assets/sound/adventure.mp3");
let audioPlaying = true;
audio.loop = true;

// boolean value to keep track of whether user finished introduction, timer starts when this is true
let gameStarted = false;

// declare DOM elements
const currentScreen = document.querySelector("#location");
const leftPanel = document.querySelector("#left-panel");
const rightPanel = document.querySelector("#right-panel");

const outputTitle = document.querySelector("#output p:first-child");
const outputContent = document.querySelector("#output p:last-child");
let answerBtn = document.querySelector("#answer");
const answerText = document.querySelector("#answer span");
const backToMap = document.querySelector("#back-to-map");
const character = document.querySelector("#character");

const musicBtn = document.querySelector("#music-btn");

// enable button clicks
musicBtn.addEventListener("click", switchMusic);
backToMap.addEventListener("click", goToMap);

function handleEndOfGame(event) {
  if (event.target.value.toLowerCase() == "unga unga") {
    document.querySelector("#unga-unga-form").style.display = "none";
    const finalLocation = new Location(
      "island-power",
      ["You found me!"],
      "no-item",
      "Nima",
      "nima"
    );

    let locationOnMap = document.querySelector("#island");
    locationOnMap.replaceWith(locationOnMap.cloneNode(true));
    locationOnMap = document.querySelector("#island");

    let answerBtn = document.querySelector("#answer");
    answerBtn.replaceWith(answerBtn.cloneNode(true));
    answerBtn = document.querySelector("#answer");

    locationOnMap.addEventListener("click", () => {
      finalLocation.goToLocation(locationOnMap);
    });

    const finalInventory = new Inventory();
    finalLocation.goToLocation(finalInventory);
  }
}

// starter screen function, user is brought to intro after clicking play button
function loadStarterScreen() {
  const playButton = document.createElement("div");
  playButton.setAttribute("id", "play-btn");
  playButton.style.background =
    "center / contain no-repeat url(./assets/images/play.jpg";
  playButton.style.position = "absolute";
  playButton.style.zIndex = "1";
  playButton.style.cursor = "pointer";
  playButton.className = "hover";
  playButton.style.width = "16vw";
  playButton.style.height = "6vw";
  playButton.style.left = "51vw";
  playButton.style.top = "30.5vw";
  document.querySelector("#main-panel").appendChild(playButton);
  playButton.addEventListener("click", launchGame);
}

// launching game (not starting game), this is the intro, where sam explains the rules
function launchGame() {
  document.querySelector("#main-panel").style.overflow = "hidden";
  audio.play();
  this.style.display = "none";
  currentScreen.style.transform = "scale(1)";
  currentScreen.style.background =
    "center / contain no-repeat url(./assets/images/sam-house.jpg";
  leftPanel.style.visibility = "visible";
  rightPanel.style.visibility = "visible";
  character.style.display = "block";
  outputTitle.innerHTML = "SAM:";
  document.querySelector("#status").classList.add("add-alert");
  const samSpeech = [
    "Hi! Welcome to my house. I need your help. My friend Nima has gone missing. Can you help me?",
    "I last saw him at Emily’s party. Apparently he went looking for berries.",
    "I wish I could go look for him myself but I have a bootcamp project to finish.",
    "Go look for him in the village. You will surely find people willing to help you.",
    "Beware, the sun sets in 15 minutes and wild boars roam the area. You don't wanna get eaten.",
    "Click on items to add them to your inventory. You can use them later when needed by clicking on them again.",
    "Good luck on your quest. If you need help, click on the information button above.",
    "Click on the map on the bottom right corner to visit the village. The timer will start then.",
  ];
  let samSpeechIndex = 0;
  outputContent.innerHTML = samSpeech[samSpeechIndex];
  answerBtn.addEventListener("click", function handler() {
    answerText.innerHTML = "Got it";
    samSpeechIndex++;
    outputContent.innerHTML = samSpeech[samSpeechIndex];
    if (samSpeechIndex == samSpeech.length - 1) {
      this.removeEventListener("click", handler); //comment out
      this.style.display = "none";
      backToMap.style.display = "block";
    }
  });
}

function goToMap() {
  answerBtn.replaceWith(answerBtn.cloneNode(true));
  answerBtn = document.querySelector("#answer");
  answerBtn.style.display = "none";
  document.getElementById("back-to-map").style.display = "none";
  document
    .querySelectorAll(".item")
    .forEach((item) => (item.style.display = "none"));
  document.querySelector("#location").style.display = "none";
  character.style.display = "none";
  outputTitle.innerHTML = "MISSION:";
  outputContent.innerHTML = "Find Nima. He was last seen at Emily's party.";
  if (!gameStarted) {
    const newGame = new Game();
    gameStarted = true;
  }
}

function switchMusic() {
  if (audioPlaying) {
    audio.pause();
    this.style.background =
      "center / 80% no-repeat url(./assets/images/audio.png)";
    audioPlaying = false;
  } else {
    audio.play();
    this.style.background =
      "center / 80% no-repeat url(./assets/images/no-audio.png)";
    audioPlaying = true;
  }
}
