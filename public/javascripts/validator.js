// if the input is supposed to be validated, add class 'validate' to text input field (!!!only works on text inputs rn)
// Use validateCheckbox() to validate checkbox (needs to be reworked so it can be more reusable)
// Use setInputFilter() to disable number typing - example at the end of the code


const checkboxes = document.querySelectorAll('.checkbox-check')
const checkboxContainers = document.querySelectorAll('.checkbox-container')
let isChecked = false;
let allInputs = document.querySelectorAll('input[type=text]')

const submitButtons = document.querySelectorAll('.submit-button');
const postContainer = document.querySelector('#post-container');

//inputs
const inputs = document.querySelectorAll('.validate');
const calcInputs = document.querySelectorAll('.validate-calculator')
const numOnly = document.querySelectorAll('.num-only')
//forms
const forms = document.querySelectorAll('.form')
const calculatorForm = document.querySelectorAll('.calc-form')
let allLetters = /^[A-Za-z]+$/;

for (const calculatorFormElement of calculatorForm) {
    calculatorFormElement.addEventListener('submit', (e) => {
        if (calcInputs) {
            for (const calcInput of calcInputs) {
                let validatedInput = validateInput(calcInput)
                if (!validatedInput) {
                    e.preventDefault()
                }
            }
        }
    })
}

for (const form of forms) {
    form.addEventListener('submit', (e) => {
        for (const input of inputs) {
            let validatedInput = validateInput(input)
            if (!validatedInput) {
                e.preventDefault()
            }
        }

        if (checkboxes) {
            for (const checkboxContainer of checkboxContainers) {
                if (!isChecked && checkboxContainer.classList.contains('checkbox-validate')) {
                    e.preventDefault()
                }
                validateCheckbox(checkboxContainer)
            }
        }
    })
    form.addEventListener('input', () => {
        checkInputs(inputs)
    })
}

for (const checkboxContainer of checkboxContainers) {
    const checkbox = checkboxContainer.querySelector('.checkbox-check');
    checkboxContainer.addEventListener('click', () => {
        isChecked = !isChecked;
        checkbox.classList.toggle('invisible')
        if (checkbox) {
            if (isChecked) {
                checkboxContainer.classList.add('bg-secondary')
                checkboxContainer.classList.toggle('hover:border-primary')
            } else {
                checkboxContainer.classList.toggle('bg-secondary')
                checkboxContainer.classList.add('hover:border-primary')
            }
        }
        if (postContainer) {
            if (isChecked) {
                postContainer.classList.toggle('hidden')
            } else {
                postContainer.classList.add('hidden')
            }
        }

    })
}

const validateCheckbox = (checkbox) => {
    let sibling = checkbox.nextElementSibling;
    if (checkbox.classList.contains('checkbox-validate')) {
        if (!isChecked) {
            checkbox.classList.remove('border-secondary')
            checkbox.classList.add('border-dRed')
            sibling.classList.add('text-dRed')
        } else {
            checkbox.classList.remove('border-dRed')
            checkbox.classList.add('border-secondary')
            sibling.classList.remove('text-dRed')
            sibling.classList.add('text-secondary')
        }
    }
}

const validateInput = (input) => {
    const inputValue = input.value.trim();
    if (!inputValue) {
        setErrorFor(input)
        return false
    } else {
        setSuccessFor(input)
        return true
    }
}

const setErrorFor = (input, msg = "Pole je povinné.") => {
    input.className = ''
    input.classList.add('border-2', 'border-dRed', 'hover:border-primary', 'w-full', 'rounded-[10px]', 'focus:border-primary', 'focus:ring-0', 'focus:drop-shadow-md', 'validate');
    const parentInput = input.parentElement;
    const icon = parentInput.querySelector('i');

    icon.classList.remove('fa-check', 'text-transparent', 'text-success-green')
    icon.classList.add('fa-xmark', 'text-dRed')

    const div = parentInput.parentElement
    div.classList.remove('mb-[2.25rem]')
    div.classList.add('mb-3')

    const small = div.querySelector('small')
    small.innerText = msg
}

const setSuccessFor = (input) => {
    input.className = ""
    input.classList.add('border-2', 'border-secondary', 'hover:border-primary', 'w-full', 'rounded-[10px]', 'focus:border-primary', 'focus:ring-0', 'focus:drop-shadow-md', 'validate',)
    const parent = input.parentElement
    const icon = parent.querySelector('i')
    icon.classList.remove('fa-xmark', 'text-transparent', 'text-dRed')
    icon.classList.add('fa-check', 'text-success-green')
    const div = parent.parentElement
    div.classList.add('mb-[2.25rem]')
    const small = div.querySelector('small')
    small.innerText = " "
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

for (const numOnlyElement of numOnly) {
    setInputFilter(numOnlyElement, function (value) {
        return /^-?\d*$/.test(value);
    });
}

let checkInputs = (inputs, isEmpty) => {
    for (const input of inputs) {
        isEmpty = !input.value && input.classList.contains('validate');
        for (const submitButton of submitButtons) {
            if (isEmpty) {
                submitButton.classList.remove('bg-dRed', 'text-white')
                submitButton.classList.add('border-2', 'text-black/50')
            } else {
                submitButton.classList.remove('border-2', 'text-black/50')
                submitButton.classList.add('bg-dRed', 'text-white')
            }
        }
    }
}

let addClassToAllInputs = (className) => {
    for (const input of allInputs) {
        input.classList.add(className)
    }
}

addClassToAllInputs('default-transition')
