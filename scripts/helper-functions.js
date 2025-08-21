const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');

const tipAmountResultElement = document.querySelector('.tip-amount');
const totalAmountResultElement = document.querySelector('.total-amount');

const peopleInputErrorElement = document.querySelector('.people-input-error-message');


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
    const peopleCount = Number(peopleInputElement.value);

    if (peopleInputElement.value == '') {
        return;
    }
    
    if (!peopleCountIsValid(peopleCount)) {
        return;
    }
    return peopleCount;
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


export function peopleCountIsValid(peopleCount) {
    if (peopleCount <= 0) {
        peopleInputErrorElement.style.display = 'block';
        peopleInputElement.style.boxShadow = '0 0 1px 2px #df8577';
        return false;
    }

    peopleInputElement.style.boxShadow = '';
    peopleInputErrorElement.style.display = 'none';
    return true;
}

export function resetData() {
    tipAmountResultElement.textContent = '0.00';
    totalAmountResultElement.textContent = '0.00';

    clearAllSelectedButtons();
    clearSelectedCustomInput();
    [billInputElement, peopleInputElement, customPercentageInputElement].forEach(element => element.value = '');
}
