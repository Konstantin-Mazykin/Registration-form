const selectMenu = document.querySelector(".form-select");
const menuTitle = selectMenu.querySelector(".form-select-title");
const menuList = selectMenu.querySelector(".form-select-list");
const listItems = menuList.querySelectorAll(".form-select-item");
const formSelectInput = selectMenu.querySelector(".form-select-input");

let chooseElement;

function openCloseMenu() {
    chooseElement = -1;
    menuList.classList.toggle("open-menu");
    menuTitle.classList.toggle("title-pressed");
}

function processingSelectedItem(event) {
    event.stopPropagation();
    menuTitle.innerText = event.target.innerText;
    markItem(event.target);
    gettingValue(event.target);
    closeDropdawnMenu();
}

function gettingValue(item) {
    formSelectInput.value = item.dataset.value;
}

function markItem(item) {
    clearItemSelection();
    item.classList.add("selected-item");
}

function clearItemSelection() {
    listItems.forEach((item) => {
        item.classList.remove("selected-item");
    });
}

function closeDropdawnMenu() {
    menuList.classList.remove("open-menu");
    menuTitle.classList.remove("title-pressed", "selected-item");
}

function clickOutsideDropdawn(event) {
    if (event.target !== menuTitle) {
        closeDropdawnMenu();
    }
}

function keyboardActions(event) {
    if (event.key === "Enter") {
        processingSelectedItem(event);
    }
    if (event.key === "Escape") {
        closeDropdawnMenu();
    }
}

function navigationUpDown(event) {
    if (!menuList.classList.contains("open-menu")) return;

    event.preventDefault();

    if ((event.key === "ArrowDown") && (chooseElement < listItems.length - 1)) {
        chooseElement++;
        listItems[chooseElement].focus();
    }
    if ((event.key === "ArrowUp") && chooseElement) {
        chooseElement--;
        listItems[chooseElement].focus();
    }
}

menuTitle.addEventListener("click", openCloseMenu);

listItems.forEach((listItem) => {
    listItem.addEventListener("click", processingSelectedItem);
});

document.addEventListener("click", clickOutsideDropdawn);

selectMenu.addEventListener("keydown", keyboardActions);

selectMenu.addEventListener("keydown", navigationUpDown);