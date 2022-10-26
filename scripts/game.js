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
      "sam"
    );
    this.castle = new Location(
      "castle",
      [
        "A great castle stood here a long time ago. It might be in ruins but it's still majestic.",
        "According to legend, it was also used to mint coins illegally. You could try to go inside but the doors are locked..",
      ],
      "gold",
      "Castle Ruins",
      "",
      true
    );
    this.townHall = new Location(
      "town-hall",
      [
        "Hey stranger. I’m the new mayor, do you like our small village?",
        "Our village is full of mysteries, don't hesitate to visit every corner and hidden places.",
        "The town hall is falling apart but the village doesn’t have any money to renovate. I hope it won’t turn to ruins as the castle did.",
      ],
      "no-item",
      "Mayor",
      "mayor",
      true
    );
    this.island = new Location(
      "island",
      [
        "I am VOLCANO ISLAND. I may be hidden but I am the heart of this place. The village is in danger. Can you help?",
        "Good, because I have your friend Nima and I will only give him back to you if you help me.",
        "My energy keeps the village alive but my core is depleted. You need to find me a new core to save the village.",
        "Every 1000 years, a chosen hen lays a magical egg, that's the core. It will be hot to the touch.",
        "Find the flaming-hot egg, come back to me and I'll give you Nima.",
      ],
      "no-item",
      "Volcano Island",
      null,
      true
    );
    this.church = new Location(
      "church",
      [
        "Apparently, the best blackberries grow behind this church. Could Nima have gone there?",
      ],
      "no-item",
      "The Church"
    );
    this.lavoir = new Location(
      "lavoir",
      [
        "Welcome to the lavoir. My name is Colette, I am the water fairy. Could you help me please?",
        "I've been so lonely since people stopped coming here. But I found peace in honey. I'm obsessed with honey.",
        "Unfortunately, I can't stay far from water and the bee population moved to the other side of the village.",
        "If you ever come back around, I would really appreciate it if you could bring me a good amount of honey.",
      ],
      "no-item",
      "Colette",
      "fairy",
      true
    );
    this.well = new Location(
      "well",
      [
        "The well hasn’t worked in more than fifty years. It doesn’t look like it can be fixed.",
      ],
      "no-item",
      "The Well"
    );
    this.bins = new Location(
      "bins",
      ["These bins are quite big. Could Nima have hidden in there?"],
      "no-item",
      "The Bins"
    );
    this.busStop = new Location(
      "bus-stop",
      [
        "Hi, would you like to keep me company while I wait for the bus?",
        "I know this village better than anyone else. I can tell you all about its secrets.",
        "For example, according to legend, a witch lives in the tree up the hill.",
        "Bring me some wine while I wait and I'll tell you more secrets.",
      ],
      "no-item",
      "Crazy Villager",
      "villager",
      true
    );
    this.emilyHouse = new Location(
      "emily-house",
      [
        "Hey! Sam told me you would drop by. We really worry about Nima. Thank you so much for helping us.",
        "Nima was on fire last night. But then he left looking for juicy berries on the other side of the village.",
        "Good luck! I would love to talk more but I’m busy fixing a leak from my party.",
      ],
      "no-item",
      "Emily",
      "emily",
      true
    );

    this.tree = new Location(
      "tree",
      [
        "Don’t be afraid by my foxy eyes. I’m Shartreuse, the tree witch. You must be special if you can see me.",
        "I’m making a potion and I need a beautiful pumpkin. Come back to me with what I asked and you’ll be generously rewarded.",
      ],
      "no-item",
      "Shartreuse",
      "witch",
      true
    );

    this.antenna = new Location(
      "antenna",
      ["Beep beep. This antenna connects the village to the world."],
      "no-item",
      "Antenna"
    );

    this.vegetableGarden = new Location(
      "vegetable-garden",
      [
        "Sam’s mother takes care of this vegetable garden. You’ll find the tastiest veggies here.",
      ],
      "pumpkin",
      "Vegetable Garden"
    );

    this.farm = new Location(
      "farm",
      [
        "G’day, I’m Jeannot. You can come to me if you need to fix anything.",
        "First, I need to know if I can trust you. Sam’s friend told me he’d bring me berries this morning but he seems to have forgotten.",
        "Come back to me with berries and I’ll give you a useful tool. Any berries will do.",
      ],
      "no-item",
      "Jeannot",
      "jeannot",
      true
    );

    this.twins = new Location(
      "twins",
      [
        "Bien le bonjour, je suis Micheline. My twin sister Paulette and I are the doyennes of the village.",
        "Paulette is very malade but the docteurs don’t know what to do. Come back to me if you can help.",
      ],
      "no-item",
      "Micheline",
      "micheline",
      true
    );

    this.churchWall = new Location(
      "church-wall",
      [
        "Nima doesn’t seem to be here. Let’s hope he didn’t fall asleep in a field.",
      ],
      "blackberries",
      "Behind The Church"
    );

    this.cat = new Location("cat", ["Purr."], "redcurrants", "Cat");
    this.goat = new Location("goat", ["Bleet bleet."], "no-item", "Goat");
    this.sparrow = new Location(
      "sparrow",
      ["Chirp chirp."],
      "no-item",
      "Sparrow"
    );

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

    document.querySelector("#church-wall").addEventListener("click", () => {
      this.churchWall.goToLocation(this.currentInventory);
    });

    document.querySelector("#emily-house").addEventListener("click", () => {
      this.emilyHouse.goToLocation(this.currentInventory);
    });

    document.querySelector("#twins").addEventListener("click", () => {
      this.twins.goToLocation(this.currentInventory);
    });

    document.querySelector("#church").addEventListener("click", () => {
      this.church.goToLocation(this.currentInventory);
    });

    document.querySelector("#lavoir").addEventListener("click", () => {
      this.lavoir.goToLocation(this.currentInventory);
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

    document.querySelector("#sparrow").addEventListener("click", () => {
      this.sparrow.goToLocation(this.currentInventory);
    });

    document.querySelector("#goat").addEventListener("click", () => {
      this.goat.goToLocation(this.currentInventory);
    });

    document.querySelector("#island").addEventListener("click", () => {
      this.island.goToLocation(this.currentInventory);
    });

    document.querySelector("#bus-stop").addEventListener("click", () => {
      this.busStop.goToLocation(this.currentInventory);
    });

    document.querySelector("#bins").addEventListener("click", () => {
      this.bins.goToLocation(this.currentInventory);
    });

    document.querySelector("#well").addEventListener("click", () => {
      this.well.goToLocation(this.currentInventory);
    });

    document.querySelector("#tree").addEventListener("click", () => {
      this.tree.goToLocation(this.currentInventory);
    });

    document.querySelector("#antenna").addEventListener("click", () => {
      this.antenna.goToLocation(this.currentInventory);
    });

    document
      .querySelector("#vegetable-garden")
      .addEventListener("click", () => {
        this.vegetableGarden.goToLocation(this.currentInventory);
      });

    document.querySelector("#farm").addEventListener("click", () => {
      this.farm.goToLocation(this.currentInventory);
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
