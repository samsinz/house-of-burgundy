export default class Location {
  constructor(
    locationName,
    outputContent,
    itemName,
    outputTitle,
    characterName,
    conversation
  ) {
    this.locationName = locationName;
    this.backgroundUrl = `./assets/images/${locationName}.jpg`;
    this.outputContent = outputContent;
    this.itemName = itemName;
    this.outputTitle = outputTitle;
    this.answerBtn = document.querySelector("#answer");
    this.answerText = document.querySelector("#answer span");
    this.giftedItem = null;
    this.currentInventory = null;

    if (arguments.length >= 5) {
      this.characterName = characterName;
      this.locationCharacterUrl = `./assets/images/${this.characterName}.png`;
    }
    if (arguments.length >= 6) {
      this.conversation = conversation;
    }
    this.speechIndex = 0;
  }

  goToLocation(currentInventory, giftedItem) {
    console.log(currentInventory.inventory);
    this.giftedItem = giftedItem;
    this.currentInventory = currentInventory;
    this.answerBtn = document.querySelector("#answer");
    this.answerText = document.querySelector("#answer span");

    const status = document.querySelector("#status");
    status.classList.remove("add-alert");
    status.offsetWidth;
    status.classList.add("add-alert");
    document.querySelector("#back-to-map").style.display = "block";
    if (this.itemName && !currentInventory.inventory[this.itemName]) {
      document.querySelector(`#${this.itemName}`).style.display = "block";
    }

    document
      .querySelector(`#${this.itemName}`)
      .addEventListener("click", () => {
        this.addItem(currentInventory);
      });

    if (this.characterName) {
      const character = document.querySelector("#character");
      character.style.background = `center / contain no-repeat url(${this.locationCharacterUrl})`;
      character.style.display = "block";
    }

    document.querySelector(
      "#output p:first-child"
    ).textContent = `${this.outputTitle}:`;

    document.querySelector("#output p:last-child").textContent =
      this.outputContent[this.speechIndex];

    const panelView = document.querySelector("#location");
    panelView.style.background = `center / contain no-repeat url(${this.backgroundUrl})`;
    panelView.style.display = "block";

    if (this.giftedItem) {
      currentInventory.inventory[giftedItem] = "collected";
    }

    if (
      this.conversation == true &&
      this.speechIndex !== this.outputContent.length - 1
    ) {
      this.answerText.textContent = "Of course";
      this.answerBtn.style.display = "flex";
    }
    this.answerBtn.addEventListener("click", () => {
      this.talk();
      if (this.currentInventory.inventory["core"] === "used") {
        this.getMagicalFormula();
      }
    });

    if (this.locationName == "church") {
      document.querySelector("#church-wall").style.display = "block";
    } else {
      document.querySelector("#church-wall").style.display = "none";
    }

    if (this.currentInventory.inventory["pumpkin"] === "used") {
      this.showIsland();
    }

    // if (this.currentInventory.inventory["core"] === "used") {
    //   this.getMagicalFormula();
    // } HERE
    // this.answerBtn.replaceWith(this.answerBtn.cloneNode(true));
    // this.answerBtn = document.querySelector("#answer");

    // if (this.locationName == "cellar") {
    //   document.querySelector("#gold").style.display = "none";
    // }
  }

  talk() {
    this.answerText.textContent = "Got it";
    this.speechIndex++;

    document.querySelector("#output p:last-child").textContent =
      this.outputContent[this.speechIndex];
    console.log(this.speechIndex, " out of ", this.outputContent.length - 1);
    if (this.speechIndex == this.outputContent.length - 1) {
      // this.answerBtn.replaceWith(this.answerBtn.cloneNode(true));
      // this.answerBtn = document.querySelector("#answer");
      this.answerBtn.style.display = "none";
      if (this.giftedItem) {
        this.addGiftedItem(this.currentInventory, this.giftedItem);
      }
      if (this.outputTitle === "Nima") {
        document.querySelector(
          "#output p:first-child"
        ).textContent = `MISSION:`;
        document.querySelector("#output p:last-child").textContent = "Apéro.";
        document.querySelector("#apero").style.display = "block";
      }
    }
  }

  addItem(currentInventory) {
    document.querySelector(`#${this.itemName}`).style.display = "none";
    currentInventory.inventory[this.itemName] = "collected";
    currentInventory.addInventory(`${this.itemName}`);
  }

  addGiftedItem(currentInventory, giftedItem) {
    // document.querySelector(`#${giftedItem}`).style.display = "none"; // unnecessary ?
    currentInventory.inventory[giftedItem] = "collected";
    currentInventory.addInventory(`${giftedItem}`);
  }

  showIsland() {
    document.querySelector("#main-panel").style.background =
      "center / contain no-repeat url(./../assets/images/map-island.jpg)";
    document.querySelector("#island").style.display = "block";
  }

  getMagicalFormula() {
    document.querySelector("#unga-unga-form").style.display = "block";
  }
}
