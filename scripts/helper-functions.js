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
    const percentageNumber =  Number(percentageButton.textContent.slice(0, percentageButton.textContent.length - 1));
    const percentage = percentageNumber / 100;
    return percentage
}

export function extractNumberFromCustomPercentageInput() {
    const content = customPercentageInputElement.value;
    if (content) {
        const percentageNumber = Number(content.match(/\d+/g));
        if (percentageNumber) {
            return percentageNumber / 100;
        }
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


export function performCalculations() {
    // Only performs calculations if all three inputs are entered and/or selected
    const bill = getBillAmount();
    const tipPercentage = getSelectedTipPercentage();
    const peopleCount = getPeopleCount();
    
    if (bill && tipPercentage && peopleCount) {
        calculateTipAmountPerPerson(bill, tipPercentage, peopleCount);
        calculateTotalAmountPerPerson(bill, tipPercentage, peopleCount);
    }
}

function calculateTipAmountPerPerson(bill, percentage, peopleCount) {
    const totalTipAmount = bill * percentage;
    const tipAmountForPerson = totalTipAmount / peopleCount;

    tipAmountResultElement.textContent = tipAmountForPerson.toFixed(2);
}

function calculateTotalAmountPerPerson(bill, percentage, peopleCount) {
    const totalTipAmount = bill * percentage;
    const totalPaymentAmount = bill + totalTipAmount;
    const totalPaymentAmountForPerson = totalPaymentAmount / peopleCount;

    totalAmountResultElement.textContent = totalPaymentAmountForPerson.toFixed(2);
}

export function resetData() {
    tipAmountResultElement.textContent = '0.00';
    totalAmountResultElement.textContent = '0.00';

    clearAllSelectedButtons();
    clearSelectedCustomInput();
    [billInputElement, peopleInputElement, customPercentageInputElement].forEach(element => element.value = '');
}
