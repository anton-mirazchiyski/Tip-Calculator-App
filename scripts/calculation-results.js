import * as helper_funcs from './helper-functions.js';

const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');

const tipAmountResultElement = document.querySelector('.tip-amount');
const totalAmountResultElement = document.querySelector('.total-amount');


billInputElement.addEventListener('input', (event) => {
    const tipPercentageNumber = helper_funcs.getSelectedTipPercentage();
    let percentage;
    
    if (tipPercentageNumber) {
        percentage = tipPercentageNumber / 100;
    }
    const peopleCount = helper_funcs.getPeopleCount();
    const billAmount = helper_funcs.getBillAmount();

    if (percentage && peopleCount) {
        calculateTipAmountPerPerson(billAmount, percentage, peopleCount);
        calculateTotalAmountPerPerson(billAmount, percentage, peopleCount);
    }
});

percentageButtonElements.forEach(percentageButton => {

    percentageButton.addEventListener('click', (event) => {
        helper_funcs.clearAllSelectedButtons();
        helper_funcs.clearSelectedCustomInput();
        event.target.classList.add('selected-percentage-btn');

        const tipPercentageNumber = helper_funcs.extractNumberFromPercentageButton(event.target);
        const percentage = tipPercentageNumber / 100;
        const bill = helper_funcs.getBillAmount();
        const peopleCount = helper_funcs.getPeopleCount();

        if (bill && peopleCount) {
            calculateTipAmountPerPerson(bill, percentage, peopleCount);
            calculateTotalAmountPerPerson(bill, percentage, peopleCount);
        }
    });
});

customPercentageInputElement.addEventListener('focus', (event) => {
    helper_funcs.clearAllSelectedButtons();
    event.target.classList.add('selected-custom-input');
});

customPercentageInputElement.addEventListener('input', (event) => {
    const tipPercentageNumber = helper_funcs.extractNumberFromCustomPercentageInput(event.target);
    let percentage;

    if (tipPercentageNumber) {
        percentage = tipPercentageNumber / 100;
    }
    const bill = helper_funcs.getBillAmount();
    const peopleCount = helper_funcs.getPeopleCount();

    if (percentage && bill && peopleCount) {
        calculateTipAmountPerPerson(bill, percentage, peopleCount);
        calculateTotalAmountPerPerson(bill, percentage, peopleCount);
    }
});


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
