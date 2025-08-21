const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');


export const getBillAmount = () => {
    if (billInputElement.value != '') {
        return Number(billInputElement.value);
    }
}

export const getSelectedTipPercentage = () => {
    const selectedPercentageButton = Array.from(percentageButtonElements)
                                        .find(percentageButton => percentageButton.classList.contains('selected-percentage-btn'));
    if (selectedPercentageButton) {
        return extractNumberFromPercentageButton(selectedPercentageButton);
    }

    if (customPercentageInputElement.classList.contains('selected-custom-input') && customPercentageInputElement.value != '') {
        return extractNumberFromCustomPercentageInput();
    }

    return null;
}

export const getPeopleCount = () => {
    if (peopleInputElement.value != '') {
        return Number(peopleInputElement.value);
    }
}

export const clearAllSelectedButtons = () => {
    percentageButtonElements.forEach(percentageButton => percentageButton.classList.remove('selected-percentage-btn'));
}

export const clearSelectedCustomInput = () => {
    customPercentageInputElement.classList.remove('selected-custom-input');
    customPercentageInputElement.value = '';
};

export function extractNumberFromPercentageButton(percentageButton) {
    return Number(percentageButton.textContent.slice(0, percentageButton.textContent.length - 1));
}

export function extractNumberFromCustomPercentageInput() {
    const content = customPercentageInputElement.value;
    if (content) {
        return Number(content.match(/\d+/g)[0]);
    }
}
