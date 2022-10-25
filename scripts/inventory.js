import Location from "./location.js";

export default class Inventory {
  constructor() {
    this.inventory = {};
    this.addInventoryPanel = document.querySelector("#add-inventory");
    this.itemTitle = document.querySelector("#item-title");
    this.newItem = document.querySelector("#new-item");
    this.addBtn = document.querySelector("#add-btn");
    this.itemUsageTime = {
      blackberries: {
        neededIn: "farm",
        locationUpdate: new Location(
          "town-hall",
          ["A PACK OF GOLD FOR ME.", "I'm gonna renovate this."],
          "no-item",
          "Mayor",
          "mayor",
          true
        ),
      },
      redcurrants: { neededIn: "farm" },
      wrench: { neededIn: "emily-house" },
      honey: { neededIn: "lavoir" },
      potion: { neededIn: "twins" },
      key: { neededIn: "cellar" },
      scroll: { neededIn: "island" },
      pumpkin: { neededIn: "tree" },
      gold: {
        neededIn: "town-hall",
        locationUpdate: new Location(
          "town-hall",
          [
            "A PACK OF GOLD FOR ME. YUM YUM",
            "I'm gonna renovate this shit so bad.",
          ],
          "no-item",
          "Mayor",
          "mayor",
          true
        ),
      },
      core: { neededIn: "island" },
      gourdin: { neededIn: "bins" },
    };
  }

  updateInventory() {
    this.addInventoryPanel.style.display = "none";
    let inventoryItems = document.querySelectorAll(".inventory-item");
    let inventoryItemsCounter = 0;

    // clone inventory to reset all addeventlisteners
    let currentInventory = document.querySelector("#inventory");
    currentInventory.replaceWith(currentInventory.cloneNode(true));
    currentInventory = document.querySelector("#inventory");

    inventoryItems = document.querySelectorAll(".inventory-item");

    for (const item in this.inventory) {
      if (this.inventory[item] === true) {
        console.log("adding ", item);
        inventoryItems[
          inventoryItemsCounter
        ].style.background = `center / contain no-repeat url(./assets/images/${item}.png)`;
        inventoryItems[inventoryItemsCounter].parentElement.addEventListener(
          "click",
          () => {
            this.useItem(item);
          }
        );
        inventoryItemsCounter++;
      }
    }
    for (let i = inventoryItemsCounter; i < inventoryItems.length; i++) {
      inventoryItems[i].style.removeProperty("background");
    }
  }

  addInventory(itemName) {
    this.addInventoryPanel.style.display = "block";
    this.itemTitle.innerHTML = itemName;
    this.newItem.style.background = `center / contain no-repeat url(./assets/images/${itemName}.png)`;
    this.addBtn.addEventListener("click", () => {
      this.updateInventory();
    });
  }

  useItem(currentItem) {
    const currentLocationUrl =
      document.querySelector("#location").style.background;
    const currentLocation = currentLocationUrl.slice(
      currentLocationUrl.indexOf("images/") + 7,
      currentLocationUrl.indexOf(".jpg")
    );

    if (this.itemUsageTime[currentItem].neededIn === currentLocation) {
      console.log(this.inventory);
      this.inventory[currentItem] = false;
      console.log(this.inventory);
      this.updateInventory();
      this.itemUsageTime[currentItem].locationUpdate.goToLocation(this);
    }
  }
}
