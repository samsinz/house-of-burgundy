import Timer from "./timer.js";
import Inventory from "./inventory.js";
import Location from "./location.js";

export default class Game {
  constructor() {
    this.timer = new Timer();
    this.currentInventory = new Inventory();
    this.samHouse = new Location(
      "sam-house",
      ["Have you found my friend Nima yet? I last saw him at Emily’s place."],
      "no-item",
      "Sam",
      "Sam"
    );
    this.castle = new Location(
      "castle",
      [
        "A great castle stood here a long time ago. Legend says it was also used to mint coins illegally...",
      ],
      "wine",
      "Castle Ruins"
    );
    this.townHall = new Location(
      "town-hall",
      [
        "Hey stranger. I’m the new mayor, do you like our small village?",
        "The town hall is falling apart but the village doesn’t have any money to renovate. I hope it won’t turn to ruins as the castle did.",
      ],
      "no-item",
      "Mayor",
      "Mayor",
      true
    );

    this.cat = new Location("cat", ["Purr."], "currant", "Cat");

    this.init();
  }

  init() {
    // document.querySelector("#castle").addEventListener("click", () => {
    //   this.goToCastle();
    // });
    // document.querySelector("#wine").addEventListener("click", () => {
    //   this.addWine();
    // });
    document.querySelector("#sam-house").addEventListener("click", () => {
      this.samHouse.goToLocation(this.currentInventory);
    });

    document.querySelector("#castle").addEventListener("click", () => {
      this.castle.goToLocation(this.currentInventory);
    });

    document.querySelector("#town-hall").addEventListener("click", () => {
      this.townHall.goToLocation(this.currentInventory);
    });

    document.querySelector("#cat").addEventListener("click", () => {
      this.cat.goToLocation(this.currentInventory);
    });
  }

  // goToCastle() {
  //   document.getElementById("back-to-map").style.display = "block";
  //   if (!this.currentInventory.inventory.wine) {
  //     document.getElementById("wine").style.display = "block";
  //   }
  //   const panelView = document.getElementById("location");
  //   panelView.style.background =
  //     "center / contain no-repeat url(./../assets/images/cellar.jpg) ";
  //   panelView.style.display = "block";
  // }

  // addWine() {
  //   document.getElementById("wine").style.display = "none";
  //   this.currentInventory.inventory.wine = true;
  //   this.currentInventory.addInventory("Wine");
  // }
}
