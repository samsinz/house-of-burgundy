import Game from "./game.js";

loadStarterScreen();

let audio = new Audio("./../assets/sound/adventure.mp3");
let audioPlaying = true;
audio.loop = true;

let gameStarted = false;

const currentScreen = document.querySelector("#location");
const leftPanel = document.querySelector("#left-panel");
const rightPanel = document.querySelector("#right-panel");

const outputTitle = document.querySelector("#output p:first-child");
const outputContent = document.querySelector("#output p:last-child");
const answerBtn = document.querySelector("#answer");
const answerText = document.querySelector("#answer span");
const backToMap = document.querySelector("#back-to-map");

function loadStarterScreen() {
  const playButton = document.createElement("div");
  playButton.setAttribute("id", "play-btn");
  playButton.style.background =
    "center / contain no-repeat url(./../assets/images/play.jpg";
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

function launchGame() {
  audio.play();
  this.style.display = "none";
  currentScreen.style.transform = "scale(1)";
  currentScreen.style.background =
    "center / contain no-repeat url(./../assets/images/sam-house.jpg";
  leftPanel.style.visibility = "visible";
  rightPanel.style.visibility = "visible";
  outputTitle.innerHTML = "SAM:";
  const samSpeech = [
    "“Hi! Welcome to my house. I need your help. My friend Nima has gone missing. Can you help me?”",
    "“I last saw him at Emily’s party. Apparently he went looking for berries.”",
    "“Go look for him in the village. You will surely find people willing to help you.”",
    "“Beware, the sun sets in 5 minutes and wild boars roam the area.”",
    "“Click on items to add them to your inventory. You can use them later when needed by clicking on them again.”",
    "“Good luck on your quest. If you need help, click on the information button above.”",
    "“Click on the map on the bottom right corner to visit the village. The timer will start then.”",
  ];
  let samSpeechIndex = 0;
  outputContent.innerHTML = samSpeech[samSpeechIndex];
  answerBtn.addEventListener("click", function handler() {
    answerText.innerHTML = "Got it.";
    samSpeechIndex++;
    outputContent.innerHTML = samSpeech[samSpeechIndex];
    if (samSpeechIndex == samSpeech.length - 1) {
      this.removeEventListener("click", handler);
      this.style.display = "none";
      backToMap.style.display = "block";
    }
  });
}

// function launchGame() {
//   audio.play();
//   this.style.display = "none";
//   const currentScreen = document.querySelector("#map");
//   currentScreen.style.transform = "scale(1)";
//   currentScreen.style.display = "none";
//   document.querySelector("#left-panel").style.visibility = "visible";
//   document.querySelector("#right-panel").style.visibility = "visible";
//   const newGame = new Game();
// }

document.getElementById("house").addEventListener("click", goToHouse);
document.getElementById("back-to-map").addEventListener("click", goToMap);
document.getElementById("wine").addEventListener("click", addWine);
document.querySelector("#music-btn").addEventListener("click", switchMusic);

const inventory = {
  wine: false,
};

function goToHouse() {
  document.getElementById("back-to-map").style.display = "block";
  if (!inventory.wine) {
    document.getElementById("wine").style.display = "block";
  }
  const panelView = document.getElementById("location");
  panelView.style.background =
    "center / contain no-repeat url(./../assets/images/cellar.jpg) ";
  panelView.style.display = "block";
}

function goToMap() {
  document.getElementById("back-to-map").style.display = "none";
  document.getElementById("wine").style.display = "none";
  document.querySelector("#location").style.display = "none";
  outputTitle.innerHTML = "MISSION:";
  outputContent.innerHTML = "Find Nima. He was last seen at Emily's party.";
  if (!gameStarted) {
    const newGame = new Game();
    gameStarted = true;
  }
}

function addWine() {
  document.getElementById("wine").style.display = "none";
  inventory.wine = true;
  addInventory("Wine");
}

function updateInventory() {
  document.getElementById("add-inventory").style.display = "none";
  const inventoryItems = document.querySelectorAll(".inventory-item");
  let inventoryItemsCounter = 0;
  for (const item in inventory) {
    if (inventory[item] === true) {
      inventoryItems[inventoryItemsCounter].style.background =
        "center / 80% no-repeat url(./../assets/images/wine.png) ";
      inventoryItemsCounter++;
    }
  }
}

function addInventory(itemName) {
  document.getElementById("add-inventory").style.display = "block";
  document.getElementById("item-title").innerHTML = itemName;
  document.getElementById(
    "new-item"
  ).style.background = `center / contain no-repeat url(./../assets/images/${itemName}.png)`;
  document.getElementById("add-btn").addEventListener("click", updateInventory);
}

function switchMusic() {
  if (audioPlaying) {
    audio.pause();
    this.style.background =
      "center / 80% no-repeat url(./../assets/images/audio.png)";
    audioPlaying = false;
  } else {
    audio.play();
    this.style.background =
      "center / 80% no-repeat url(./../assets/images/no-audio.png)";
    audioPlaying = true;
  }
}

// function addWine() {
//   document.getElementById("wine").style.display = "none";
//   inventory.wine = true;
//   updateInventory();
// }

// function updateInventory() {
//   const inventoryItems = document.querySelectorAll(".inventory-item");
//   let inventoryItemsCounter = 0;
//   for (const item in inventory) {
//     if (inventory[item] === true) {
//       inventoryItems[inventoryItemsCounter].style.background =
//         "center / 80% no-repeat url(./../assets/images/wine.png) ";
//       inventoryItemsCounter++;
//     }
//   }
// }
