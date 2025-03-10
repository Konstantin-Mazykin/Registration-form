const countryList = document.querySelector(".form-select-list");

function render(array, htmlElement) {
    for (let i = 0; i < array.length; i++) {
        let element = document.createElement("li");
        element.classList.add("form-select-item");

        element.setAttribute("tabindex", '0');
        element.setAttribute("aria-checked", 'false');
        element.setAttribute("data-value", `${array[i]}`);
        element.insertAdjacentHTML("beforeend", `${array[i]}`);

        htmlElement.append(element);
    }
}

const itemsList = ['Україна', 'Польща', 'Німеччина', 'Італія', 'Франція'];

render(itemsList, countryList);