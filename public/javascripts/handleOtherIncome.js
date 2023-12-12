const otherIncomeContainer = document.querySelector('#other-income-container')
let radio = document.querySelector("#otherIncome");
let sideIncome = document.querySelector('#sideIncome');
let radioIcon = radio.querySelector('img')

let checked;

if (radio){
    radio.addEventListener('mouseenter', () => {
        otherIncomeContainer.classList.remove('border-secondary')
        otherIncomeContainer.classList.add('border-primary')
    })

    radio.addEventListener('mouseleave', () => {
        otherIncomeContainer.classList.add('border-secondary')
        otherIncomeContainer.classList.remove('border-primary')
    })

    radio.addEventListener('click', () => {
        sideIncome.classList.toggle('hidden');
        radioIcon.classList.toggle('hidden')
        if (checked === radio) {
            radio.checked = false;
            checked = null;
        } else {
            checked = radio;
        }
    })
}
