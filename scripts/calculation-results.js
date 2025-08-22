import * as helper_funcs from './helper-functions.js';

const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');

const tipAmountResultElement = document.querySelector('.tip-amount');
const totalAmountResultElement = document.querySelector('.total-amount');

const resetResultButtonElement = document.querySelector('.reset-result-btn');


billInputElement.addEventListener('input', () => {
    helper_funcs.performCalculations();
});

percentageButtonElements.forEach(percentageButton => {

    percentageButton.addEventListener('click', (event) => {
        helper_funcs.clearAllSelectedButtons();
        helper_funcs.clearSelectedCustomInput();
        event.target.classList.add('selected-percentage-btn');

        helper_funcs.performCalculations();
    });
});

customPercentageInputElement.addEventListener('focus', (event) => {
    helper_funcs.clearAllSelectedButtons();
    event.target.classList.add('selected-custom-input');
});

customPercentageInputElement.addEventListener('input', () => {
    helper_funcs.performCalculations();
});

peopleInputElement.addEventListener('input', () => {
    helper_funcs.performCalculations();
});

resetResultButtonElement.addEventListener('click', helper_funcs.resetData);
