import Game from "./game.js";
import Inventory from "./inventory.js";
import Location from "./location.js";

// user sees starter screen before anything else
loadStarterScreen();

document.querySelector("#magical-formula").addEventListener("input", handleEndOfGame);

// declare an audio background, which starts playing after starter screen
let audio = new Audio("./assets/sound/adventure.mp3");
let raveAudio = new Audio("./assets/sound/aperoAudio.mp3");
let mapSound = new Audio("./assets/sound/mapSound.ogg");
let basicClickSound = new Audio("./assets/sound/basicClick.ogg");

let audioPlaying = true;
audio.loop = true;
raveAudio.loop = true;

// boolean value to keep track of whether user finished introduction, timer starts when this is true
let newGame = null;

// declare DOM elements
const currentScreen = document.querySelector("#location");
const leftPanel = document.querySelector("#left-panel");
const rightPanel = document.querySelector("#right-panel");

const outputTitle = document.querySelector("#output p:first-child");
const outputContent = document.querySelector("#output p:last-child");
let answerBtn = document.querySelector("#answer");
let answerText = document.querySelector("#answer span");
const backToMap = document.querySelector("#back-to-map");
let character = document.querySelector("#character");

const musicBtn = document.querySelector("#music-btn");
const restartBtn = document.querySelector("#restart-btn");
const infoBtn = document.querySelector("#info-btn");

// enable button clicks
musicBtn.addEventListener("click", switchMusic);
restartBtn.addEventListener("click", restartGame);
infoBtn.addEventListener("click", showInfo);

backToMap.addEventListener("click", goToMap);
const infoPanel = document.querySelector("#info-panel");
infoPanel.style.display = "none";

// starter screen function, user is brought to intro after clicking play button
function loadStarterScreen() {
  const playButton = document.createElement("div");
  playButton.setAttribute("id", "play-btn");
  playButton.style.background = "center / contain no-repeat url(./assets/images/play.jpg";
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
  mapSound.play();
  const inventoryItems = document.querySelectorAll(".inventory-item");
  for (let i = 0; i < inventoryItems.length; i++) {
    inventoryItems[i].style.removeProperty("background");
  }
  document.querySelector("#timer span").textContent = "15:00";
  character.style.background = "center / contain no-repeat url(./assets/images/sam.png)";

  currentScreen.style.display = "block";
  answerBtn = document.querySelector("#answer");
  answerBtn.replaceWith(answerBtn.cloneNode(true));
  answerBtn = document.querySelector("#answer");

  answerBtn.style.display = "flex";
  answerText = document.querySelector("#answer span");
  answerText.textContent = "Of course";

  document.querySelector("#main-panel").style.overflow = "hidden";
  audio.play();
  if (this) {
    this.style.display = "none";
  }
  currentScreen.style.transform = "scale(1)";
  currentScreen.style.background = "center / contain no-repeat url(./assets/images/sam-house.jpg";
  leftPanel.style.visibility = "visible";
  rightPanel.style.visibility = "visible";
  character.style.display = "block";
  outputTitle.textContent = "SAM:";
  document.querySelector("#status").classList.add("add-alert");
  const samSpeech = [
    "Hi! Welcome to my house. I need your help. My friend Nima has gone missing. Can you help me?",
    "I last saw him at Emily’s party. Apparently he went looking for berries.",
    "I wish I could go look for him myself but I have a bootcamp project to finish.",
    "Go look for him in the village. You will surely find people willing to help you.",
    "Beware, the sun sets in 15 minutes and wild animals roam the area. You don't wanna get eaten.",
    "Click on items to add them to your inventory. You can use them later when needed by clicking on them again.",
    "Good luck on your quest. If you need help, click on the information button above.",
    "Click on the map on the bottom right corner to visit the village. The timer will start then.",
  ];
  let samSpeechIndex = 0;
  outputContent.textContent = samSpeech[samSpeechIndex];
  answerBtn.addEventListener("click", function handler() {
    answerText.textContent = "Got it";
    samSpeechIndex++;
    outputContent.textContent = samSpeech[samSpeechIndex];
    if (samSpeechIndex == samSpeech.length - 1) {
      this.removeEventListener("click", handler); //comment out
      this.style.display = "none";
      backToMap.style.display = "block";
    }
  });
}

function goToMap() {
  mapSound.play();
  answerBtn.replaceWith(answerBtn.cloneNode(true));
  answerBtn = document.querySelector("#answer");
  answerBtn.style.display = "none";
  document.getElementById("back-to-map").style.display = "none";
  document.querySelectorAll(".item").forEach((item) => (item.style.display = "none"));
  document.querySelector("#location").style.display = "none";
  character.style.display = "none";
  outputTitle.textContent = "MISSION:";
  outputContent.textContent = "Find Nima. He was last seen at Emily's party.";
  if (newGame === null) {
    newGame = new Game();
    // newGame.currentInventory.updateInventory();
  } else {
    newGame.currentInventory.updateInventory();
  }
}

function switchMusic() {
  basicClickSound.play();

  if (audioPlaying) {
    audio.pause();
    this.style.background = "center / 80% no-repeat url(./assets/images/audio.png)";
    audioPlaying = false;
  } else {
    audio.play();
    this.style.background = "center / 80% no-repeat url(./assets/images/no-audio.png)";
    audioPlaying = true;
  }
}

function restartGame() {
  document.querySelector("#timer").style.animation = "";
  document.querySelector("#timer span").style.color = "#ebd4b6";
  basicClickSound.play();
  raveAudio.pause();

  document.querySelector("#apero").style.display = "none";
  if (newGame !== null) {
    newGame.timer.stopTimer();
    newGame = null;
  }
  launchGame();
}

function showInfo() {
  basicClickSound.play();
  if (infoPanel.style.display === "none") {
    infoPanel.style.display = "block";
  } else {
    infoPanel.style.display = "none";
  }
}

function handleEndOfGame(event) {
  if (event.target.value.toLowerCase() == "unga unga") {
    newGame.timer.stopTimer();
    document.querySelector("#unga-unga-form").remove();
    const finalLocation = new Location(
      "island-power",
      [
        "Hey, I’m Nima! Thank you so much for saving me!",
        "For some reason, I decided to go look for berries after Emily’s party? I’m as confused as you are.",
        "I must’ve fallen asleep in the village. All I remember is waking up trapped on this island. ",
        "Anyway, let’s go back to Sam’s, it’s almost time for l’Apéro.",
        "",
      ],
      "no-item",
      "Nima",
      "nima",
      true
    );

    let locationOnMap = document.querySelector("#island");
    locationOnMap.replaceWith(locationOnMap.cloneNode(true));
    locationOnMap = document.querySelector("#island");

    let answerBtn = document.querySelector("#answer");
    answerBtn.replaceWith(answerBtn.cloneNode(true));
    answerBtn = document.querySelector("#answer");

    const finalInventory = new Inventory();
    finalLocation.goToLocation(finalInventory);

    locationOnMap.addEventListener("click", () => {
      finalLocation.goToLocation(finalInventory);
    });

    const timerInterval = setInterval(() => {
      const aperoDisplay = document.querySelector("#apero");
      if (aperoDisplay.style.display === "block") {
        audio.pause();
        audioPlaying = false;
        clearInterval(timerInterval);
        raveAudio.play();
      }
    }, 500);
  }
}
