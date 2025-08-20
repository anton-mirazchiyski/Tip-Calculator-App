const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');


const tipPercentageIsSelected = () => {}

const clearAllSelectedButtons = () => {
    percentageButtonElements.forEach(percentageButton => percentageButton.classList.remove('selected-percentage-btn'));
}

const clearSelectedCustomInput = () => customPercentageInputElement.classList.remove('selected-custom-input');


billInputElement.addEventListener('input', () => {

});

percentageButtonElements.forEach(percentageButton => {

    percentageButton.addEventListener('click', (event) => {
        clearAllSelectedButtons();
        clearSelectedCustomInput();
        event.target.classList.add('selected-percentage-btn');
    });
});

customPercentageInputElement.addEventListener('focus', (event) => {
    clearAllSelectedButtons();
    event.target.classList.add('selected-custom-input');
});
