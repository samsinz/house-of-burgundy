export default class Location {
  constructor(
    locationName,
    outputContent,
    itemName,
    outputTitle,
    characterName,
    conversation
  ) {
    this.backgroundUrl = `./assets/images/${locationName}.jpg`;
    this.outputContent = outputContent;
    this.itemName = itemName;
    this.outputTitle = outputTitle;
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
      const answerBtn = document.querySelector("#answer");
      const answerText = document.querySelector("#answer span");
      answerText.innerHTML = "Of course";
      answerBtn.style.display = "flex";

      answerBtn.addEventListener("click", () => {
        console.log(this.speechIndex);
        answerText.innerHTML = "Got it";
        this.speechIndex++;
        console.log(this.speechIndex);
        console.log(this.outputContent[this.speechIndex]);
        document.querySelector("#output p:last-child").innerHTML =
          this.outputContent[this.speechIndex];
        if (this.speechIndex == this.outputContent.length - 1) {
          answerBtn.style.display = "none";
        }
      });
    }
  }

  addItem(currentInventory) {
    document.querySelector(`#${this.itemName}`).style.display = "none";
    currentInventory.inventory[this.itemName] = true;
    currentInventory.addInventory(`${this.itemName}`);
  }
}
