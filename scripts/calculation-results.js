const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');


const getSelectedTipPercentage = () => {
    const selectedPercentageButton = Array.from(percentageButtonElements)
                                        .find(percentageButton => percentageButton.classList.contains('selected-percentage-btn'));
    if (selectedPercentageButton) {
        return extractNumberFromPercentageButton(selectedPercentageButton);
    }

    if (customPercentageInputElement.classList.contains('selected-custom-input') && customPercentageInputElement.value != '') {
        return extractNumberFromCustomPercentageInput();
    }
}

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


function extractNumberFromPercentageButton(percentageButton) {
    return Number(percentageButton.textContent.slice(0, percentageButton.textContent.length - 1));
}

function extractNumberFromCustomPercentageInput() {
    const content = customPercentageInputElement.value;
    return Number(content.match(/\d+/g)[0]);
}
