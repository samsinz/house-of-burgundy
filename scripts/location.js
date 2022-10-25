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

    if (arguments.length >= 5) {
      this.characterName = characterName;
      this.locationCharacterUrl = `./assets/images/${this.characterName}.png`;
    }
    if (arguments.length >= 6) {
      this.conversation = conversation;
    }
    this.speechIndex = 0;
  }

  goToLocation(currentInventory) {
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
    ).innerHTML = `${this.outputTitle}:`;

    document.querySelector("#output p:last-child").innerHTML =
      this.outputContent[this.speechIndex];

    const panelView = document.querySelector("#location");
    panelView.style.background = `center / contain no-repeat url(${this.backgroundUrl})`;
    panelView.style.display = "block";

    if (
      this.conversation == true &&
      this.speechIndex !== this.outputContent.length - 1
    ) {
      this.answerText.innerHTML = "Of course";
      this.answerBtn.style.display = "flex";
    }
    this.answerBtn.addEventListener("click", () => {
      this.talk();
    });

    console.log(this.locationName);
    if (this.locationName == "castle") {
      document.querySelector("#cellar").style.display = "block";
    } else if (this.locationName == "church") {
      console.log("at church");
      document.querySelector("#church-wall").style.display = "block";
    } else {
      document.querySelector("#cellar").style.display = "none";
      document.querySelector("#church-wall").style.display = "none";
    }

    if (this.locationName == "cellar") {
      document.querySelector("#gold").style.display = "none";
    }
  }

  talk() {
    this.answerText.innerHTML = "Got it";
    this.speechIndex++;

    document.querySelector("#output p:last-child").innerHTML =
      this.outputContent[this.speechIndex];
    if (this.speechIndex == this.outputContent.length - 1) {
      this.answerBtn.style.display = "none";
    }
  }

  addItem(currentInventory) {
    document.querySelector(`#${this.itemName}`).style.display = "none";
    currentInventory.inventory[this.itemName] = true;
    currentInventory.addInventory(`${this.itemName}`);
  }
}
