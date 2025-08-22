import * as helper_funcs from './helper-functions.js';

const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');

const tipAmountResultElement = document.querySelector('.tip-amount');
const totalAmountResultElement = document.querySelector('.total-amount');

const resetResultButtonElement = document.querySelector('.reset-result-btn');


billInputElement.addEventListener('input', (event) => {
    const tipPercentage = helper_funcs.getSelectedTipPercentage();
    const peopleCount = helper_funcs.getPeopleCount();
    const billAmount = helper_funcs.getBillAmount();

    if (billAmount && tipPercentage && peopleCount) {
        calculateTipAmountPerPerson(billAmount, tipPercentage, peopleCount);
        calculateTotalAmountPerPerson(billAmount, tipPercentage, peopleCount);
    }
});

percentageButtonElements.forEach(percentageButton => {

    percentageButton.addEventListener('click', (event) => {
        helper_funcs.clearAllSelectedButtons();
        helper_funcs.clearSelectedCustomInput();
        event.target.classList.add('selected-percentage-btn');

        const tipPercentage = helper_funcs.extractNumberFromPercentageButton(event.target);
        const bill = helper_funcs.getBillAmount();
        const peopleCount = helper_funcs.getPeopleCount();

        if (bill && peopleCount) {
            calculateTipAmountPerPerson(bill, tipPercentage, peopleCount);
            calculateTotalAmountPerPerson(bill, tipPercentage, peopleCount);
        }
    });
});

customPercentageInputElement.addEventListener('focus', (event) => {
    helper_funcs.clearAllSelectedButtons();
    event.target.classList.add('selected-custom-input');
});

customPercentageInputElement.addEventListener('input', (event) => {
    const tipPercentage = helper_funcs.extractNumberFromCustomPercentageInput(event.target);
    const bill = helper_funcs.getBillAmount();
    const peopleCount = helper_funcs.getPeopleCount();

    if (tipPercentage && bill && peopleCount) {
        calculateTipAmountPerPerson(bill, tipPercentage, peopleCount);
        calculateTotalAmountPerPerson(bill, tipPercentage, peopleCount);
    }
});

peopleInputElement.addEventListener('input', () => {
    const tipPercentage = helper_funcs.getSelectedTipPercentage();
    const bill = helper_funcs.getBillAmount();
    const peopleCount = helper_funcs.getPeopleCount();

    if (tipPercentage && bill && peopleCount) {
        calculateTipAmountPerPerson(bill, tipPercentage, peopleCount);
        calculateTotalAmountPerPerson(bill, tipPercentage, peopleCount);
    }
});

resetResultButtonElement.addEventListener('click', helper_funcs.resetData);


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
