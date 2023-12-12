// Refinancovanie inputs
// let moneySlideRef = document.querySelector('#money_range_ref'),
//     yearSlideRef = document.querySelector('#year_range_ref'),
//     moneyFieldRef = document.querySelector('#money_input_ref'),
//     yearFieldRef = document.querySelector('#year_input_ref')
//
// let mesSumRef = document.getElementById("mes_sum_ref");

let refData = '';

if (moneySlideRef) {
    function handleMaxMinInputs(input, min, max) {
        input.addEventListener('input', () => {
            setInputFilter(input, function (value) {
                return /^-?\d*$/.test(value);
            })
        })
        input.addEventListener('change', () => {
            let value = parseInt(input.value);

            if (value < min) input.value = min;
            if (value > max) input.value = max;
        })
    }

    const calcMonthlyCostRef = function (moneyVal, yearVal) {
        let money = Number(moneyVal);
        let years = Number(yearVal);

        let moneyMax = Number(moneySlideRef.max);
        let moneyMin = Number(moneySlideRef.min);
        let yearMax = Number(yearSlideRef.max);
        let yearMin = Number(yearSlideRef.min);

        if (isNaN(money) || isNaN(years)) {
            return "";
        }

        if (money > moneyMax || money < moneyMin) {
            return "";
        }

        if (years > yearMax || years < yearMin) {
            return "";
        }

        let monthlyCost = money * ((0.119 / 12) / (1 - Math.pow((1 / (1 + (0.119 / 12))), years * 12)));
        monthlyCost = monthlyCost.toFixed(2);

        data = `${monthlyCost}`;
        interest.value = data;

        return monthlyCost + " €";
    }

    function moneySlideHandlerRef(e) {
        moneyFieldRef.value = numeral(e.target.value).format('00,000 €')

        doCalcRef();
    }

    function yearSlideHandlerRef(e) {
        yearFieldRef.value = numeral(e.target.value).format('(0 r)');

        doCalcRef();
    }

    function moneyInputHandlerRef(e) {
        let moneyValue = e.target.value;

        if (moneyValue) {
            if (!isNaN(moneyValue)) {
                moneyValue = Number(moneyValue);
                moneyValue = Math.ceil(moneyValue/100)*100;
                moneySlideRef.value = moneyValue;
                moneySlideRef.style.setProperty('--value', String(moneyValue));
                doCalcRef();
            }
        }
    }

    function yearInputHandlerRef(e) {
        let val = e.target.value;

        if (val) {
            if (!isNaN(val)) {
                val = Number(val);
                val = Math.ceil(val);
                yearSlideRef.value = val;
                yearSlideRef.style.setProperty('--value', String(val));
                doCalcRef();
            }
        }
    }

    function doCalcRef(){
        let moneyVal = moneySlideRef.value;
        let yearVal = yearSlideRef.value;
        // test = new AutoNumeric(money_field)

        mesSumRef.innerHTML = calcMonthlyCostRef(moneyVal, yearVal);
    }

    moneyFieldRef.addEventListener('focusout', (e) => {
        if (!moneyFieldRef.value) {
            moneyFieldRef.value = moneySlideRef.value
        }
        moneyFieldRef.value = numeral(e.target.value).format('00,000 €')
    })

    yearFieldRef.addEventListener('focusout', (e) => {
        if (!yearFieldRef.value) {
            yearFieldRef.value = yearSlideRef.value
        }
        yearSlideRef.value = numeral(e.target.value).format('(0 r)');
    })


    const cleanTextInputs = (textInput) => {
        textInput.addEventListener('focusin', () => {
            textInput.value = '';
        })
    }

    cleanTextInputs(moneyFieldRef)
    cleanTextInputs(yearFieldRef)

    moneyFieldRef.addEventListener('input', moneyInputHandlerRef);
    yearFieldRef.addEventListener('input', yearInputHandlerRef);

    moneySlideRef.addEventListener('input', moneySlideHandlerRef);
    yearSlideRef.addEventListener('input', yearSlideHandlerRef);
}
