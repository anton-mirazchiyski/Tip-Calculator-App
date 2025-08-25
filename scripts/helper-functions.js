const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');

const tipAmountResultElement = document.querySelector('.tip-amount');
const totalAmountResultElement = document.querySelector('.total-amount');

const resetResultButtonElement = document.querySelector('.reset-result-btn');

const peopleInputErrorElement = document.querySelector('.people-input-error-message');


export const getBillAmount = () => {
    const billAmount = Number(billInputElement.value);
    
    if (billAmount <= 0) {
        return null;
    }
    return billAmount;
}

export const getSelectedTipPercentage = () => {
    const selectedPercentageButton = Array.from(percentageButtonElements)
                                        .find(percentageButton => percentageButton.classList.contains('selected-percentage-btn'));
    if (selectedPercentageButton) {
        return extractNumberFromPercentageButton(selectedPercentageButton);
    }

    if (customPercentageInputElement.classList.contains('selected-custom-input')) {
        return extractNumberFromCustomPercentageInput();
    }

    return null;
}

export const getPeopleCount = () => {
    const peopleCount = Number(peopleInputElement.value);

    if (peopleInputElement.value == '') {
        return null;
    }
    
    if (!peopleCountIsValid(peopleCount)) {
        return null;
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

export const clearInputFields = () => {
    [billInputElement, peopleInputElement, customPercentageInputElement].forEach(element => element.value = '');
}

export function extractNumberFromPercentageButton(percentageButton) {
    const percentageNumber =  Number(percentageButton.textContent.slice(0, percentageButton.textContent.length - 1));
    return percentageNumber / 100;
}

export function extractNumberFromCustomPercentageInput() {
    const content = customPercentageInputElement.value;
    if (content) {
        const percentageNumber = content.match(/^\d+%?$/g);
        if (percentageNumber) {
            const percentage = !percentageNumber[0].includes('%') 
                    ? Number(percentageNumber[0]) / 100 
                    : Number(percentageNumber[0].slice(0, percentageNumber[0].length - 1)) / 100;
            return percentage;
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
    // Only performs calculations if all three inputs are entered and/or selected and valid
    const bill = getBillAmount();
    const tipPercentage = getSelectedTipPercentage();
    const peopleCount = getPeopleCount();

    for (const input of [bill, tipPercentage, peopleCount]) {
        if (!input) {
            resetResults();
            return;
        }
    }

    calculateTipAmountPerPerson(bill, tipPercentage, peopleCount);
    calculateTotalAmountPerPerson(bill, tipPercentage, peopleCount);
    resetResultButtonElement.style.backgroundColor = '#26c2ad';
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
    resetResults();
    clearAllSelectedButtons();
    clearSelectedCustomInput();
    clearInputFields();
}

export function resetResults() {
    if (tipAmountResultElement.textContent === '0.00' && totalAmountResultElement.textContent === '0.00') {
        return;
    }

    tipAmountResultElement.textContent = '0.00';
    totalAmountResultElement.textContent = '0.00';
    resetResultButtonElement.style.backgroundColor = '#0d686d';
}
