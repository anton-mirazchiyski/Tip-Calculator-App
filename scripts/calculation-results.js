const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');
const customPercentageInputElement = document.querySelector('input.custom-percentage-input');
const peopleInputElement = document.querySelector('input.people-input');

const tipAmountResultElement = document.querySelector('.tip-amount');


const getSelectedTipPercentage = () => {
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

const getPeopleCount = () => {
    if (peopleInputElement.value != '') {
        return peopleInputElement.value;
    }
}

const clearAllSelectedButtons = () => {
    percentageButtonElements.forEach(percentageButton => percentageButton.classList.remove('selected-percentage-btn'));
}

const clearSelectedCustomInput = () => customPercentageInputElement.classList.remove('selected-custom-input');


billInputElement.addEventListener('input', (event) => {
    const tipPercentageNumber = getSelectedTipPercentage();
    let percentage;
    
    if (tipPercentageNumber) {
        percentage = tipPercentageNumber / 100;
    }
    const peopleCount = getPeopleCount();
    
    if (percentage && peopleCount) {
        calculateTipAmountPerPerson(event.target.value, percentage, peopleCount);
    }
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

function calculateTipAmountPerPerson(bill, percentage, peopleCount) {
    const totalTipAmount = bill * percentage;
    const tipAmountForPerson = totalTipAmount / peopleCount;

    tipAmountResultElement.textContent = tipAmountForPerson.toFixed(2);
}
