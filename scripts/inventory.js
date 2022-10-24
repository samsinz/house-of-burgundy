export default class Inventory {
  constructor() {
    this.inventory = {};
    this.addInventoryPanel = document.querySelector("#add-inventory");
    this.itemTitle = document.querySelector("#item-title");
    this.newItem = document.querySelector("#new-item");
    this.addBtn = document.querySelector("#add-btn");
  }

  updateInventory() {
    this.addInventoryPanel.style.display = "none";
    const inventoryItems = document.querySelectorAll(".inventory-item");
    let inventoryItemsCounter = 0;
    for (const item in this.inventory) {
      if (this.inventory[item] === true) {
        inventoryItems[
          inventoryItemsCounter
        ].style.background = `center / contain no-repeat url(./assets/images/${item}.png)`;
        inventoryItemsCounter++;
      }
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
}
