const billInputElement = document.querySelector('input.bill-input');
const percentageButtonElements = document.querySelectorAll('button.percentage-btn');


const tipPercentageIsSelected = () => {}

const clearAllSelectedButtons = () => {
    percentageButtonElements.forEach(percentageButton => percentageButton.classList.remove('selected-percentage-btn'));
}

billInputElement.addEventListener('input', () => {

});


percentageButtonElements.forEach(percentageButton => {

    percentageButton.addEventListener('click', (event) => {
        clearAllSelectedButtons();
        event.target.classList.add('selected-percentage-btn');
    });
});
