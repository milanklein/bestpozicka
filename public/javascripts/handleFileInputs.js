const frontInput = document.querySelector('#frontObciansky');
const frontContainer = document.querySelector('.front-container');
const frontImage = document.querySelector('.front-img')

const backInput = document.querySelector('#backObciansky');
const backContainer = document.querySelector('.back-container');
const backImage = document.querySelector('.back-img')

const dokladyInput = document.querySelector('#doklady')
const dokladyContainer = document.querySelector('.doklady-container')
const dokladyImage = document.querySelector('.doklady-img')

const additionalInputContainer = document.querySelector('.additional-input-container')
const additionalInput = document.querySelector('.additional-input')

const count = document.querySelector('.count');

const inputForm = document.querySelector('#input-form')

const fileInputs = document.querySelectorAll('.file-input')

const frontId = document.querySelector('#frontId')
const backId = document.querySelector('#backId')

const frontError = document.querySelector('.front-error');
const backError = document.querySelector('.back-error');

const removeFileFromFileList = (fileInput, index) => {
    const dt = new DataTransfer()
    const {files} = fileInput

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (index !== i)
            dt.items.add(file) // here you exclude the file. thus removing it.
    }

    fileInput.files = dt.files // Assign the updates list
}

// const setupDropAreaEnv = (container, handleFiles) => {
//     let dropArea = container.firstElementChild;
//
//     ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//         dropArea.addEventListener(eventName, preventDefaults, false)
//         document.body.addEventListener(eventName, preventDefaults, false)
//     })
//
//     ;['dragenter', 'dragover'].forEach(eventName => {
//         dropArea.addEventListener(eventName, highlight, false)
//     })
//
//     ;['dragleave', 'drop'].forEach(eventName => {
//         dropArea.addEventListener(eventName, unhighlight, false)
//     })
//
//     dropArea.addEventListener('drop', handleDrop, false)
//
//     function preventDefaults(e) {
//         e.preventDefault()
//         e.stopPropagation()
//     }
//
//     function highlight() {
//         dropArea.classList.add('highlight')
//     }
//
//     function unhighlight() {
//         dropArea.classList.remove('highlight')
//     }
//
//     function handleDrop(e) {
//         let dt = e.dataTransfer
//         let files = dt.files
//         handleFiles(files)
//
//     }
// }

const setupSingleInputContainer = (container, image, file, fileInput) => {
    const imgContainer = container.querySelector('.img-container');
    const containerChild = container.firstElementChild;
    const icons = container.querySelectorAll('.trash')

    imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')


    image.src = URL.createObjectURL(file);

    image.classList.toggle('hidden');

    containerChild.classList.add('hidden')

    for (const icon of icons) {
        icon.classList.remove('hidden')
        icon.addEventListener('click', () => {
            imgContainer.classList.remove('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
            removeFileFromFileList(fileInput, 0)
            image.src = '';
            image.classList.add('hidden')
            containerChild.classList.remove('hidden')
            icon.classList.add('hidden')
        })
    }
}

let handleFileInput = (fileInput, container, image) => {
    // Setup drag and drop functions
    // setupDropAreaEnv(container, handleFiles)

    //drag and drop file handling function
    // function handleFiles(files) {
    //     files = [...files]
    //     setupSingleInputContainer(container, image, files[0], fileInput)
    //
    // }

    fileInput.onchange = () => {
        const [file] = fileInput.files;

        if (file) {
            if (file.size < 5_000_000) {
                setupSingleInputContainer(container, image, file, fileInput)
            }
        }
    }
}

// let handleMultipleInput = (fileInput, container, image, additionalInput, additionalContainer) => {
//     let files = fileInput.files;
//     let filesArray = []
//
//     const containerChild = container.firstElementChild;
//     const imgContainer = container.querySelector('.img-container');
//     const icons = container.querySelectorAll('.trash')
//
//     setupDropAreaEnv(container, handleFiles)
//     setupDropAreaEnv(additionalContainer, handleAdditional)
//
//     function handleFiles(files) {
//         files = [...files]
//
//         if (files.length <= 3) {
//             filesArray.push(...files)
//
//             if (filesArray.length < 3) {
//                 console.log('test')
//                 additionalContainer.classList.add('order-2')
//                 additionalContainer.classList.remove('hidden')
//             }
//
//             imgContainer.classList.remove('hidden')
//             imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]', 'order-first')
//
//             image.src = URL.createObjectURL(filesArray[filesArray.length - 1]);
//             image.classList.toggle('hidden');
//
//             containerChild.classList.add('hidden')
//
//             for (const icon of icons) {
//                 icon.classList.remove('hidden')
//                 icon.addEventListener('click', () => {
//                     imgContainer.classList.remove('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
//                     image.src = '';
//                     image.classList.add('hidden')
//                     imgContainer.classList.add('hidden')
//                     additionalContainer.classList.add('hidden')
//                     containerChild.classList.remove('hidden')
//                     icon.classList.add('hidden')
//                     fileInput.value = '';
//                     filesArray = []
//                     count.innerText = '0'
//                 })
//             }
//
//             count.innerText = filesArray.length
//         }
//     }
//
//     function handleAdditional(files) {
//         files = [...files]
//         console.log(files)
//         if (files) {
//             if (files.length < 3) {
//                 filesArray.push(...files)
//                 if (filesArray.length === 3) {
//                     additionalContainer.classList.add('hidden')
//                 }
//             }
//             count.innerText = filesArray.length
//         }
//     }
//
//     fileInput.addEventListener('change', () => {
//         if (files) {
//             filesArray = Array.from(files)
//             if (filesArray.length <= 3) {
//                 if (filesArray.length < 3) {
//                     additionalContainer.classList.add('order-2')
//                     additionalContainer.classList.remove('hidden')
//                 }
//
//                 imgContainer.classList.remove('hidden')
//                 imgContainer.classList.add('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]', 'order-first')
//
//                 image.src = URL.createObjectURL(filesArray[filesArray.length - 1]);
//                 image.classList.toggle('hidden');
//
//                 containerChild.classList.add('hidden')
//
//                 for (const icon of icons) {
//                     icon.classList.remove('hidden')
//                     icon.addEventListener('click', () => {
//                         imgContainer.classList.remove('w-[160px]', 'h-[90px]', 'border-2', 'border-secondary', 'rounded-[10px]')
//                         image.src = '';
//                         image.classList.add('hidden')
//                         imgContainer.classList.add('hidden')
//                         additionalContainer.classList.add('hidden')
//                         containerChild.classList.remove('hidden')
//                         icon.classList.add('hidden')
//                         fileInput.value = '';
//                         filesArray = []
//                         count.innerText = '0'
//                     })
//                 }
//
//                 count.innerText = filesArray.length
//             }
//
//         }
//     })
//
//     additionalInput.addEventListener('change', () => {
//         const [additionalFile] = additionalInput.files
//         if (additionalFile) {
//             filesArray.push(additionalFile)
//             if (filesArray.length === 3) {
//                 additionalContainer.classList.add('hidden')
//             }
//         }
//         count.innerText = filesArray.length
//     })
//
// }

function setErrorForFile(container) {
    let small = container.nextElementSibling;
    small.classList.remove('hidden')
}

function setSuccessForFile(container) {
    let small = container.nextElementSibling;
    small.classList.add('hidden')
}

function validateFileInput(fileInput, container) {
    if (!fileInput.files.length) {
        setErrorForFile(container);
    } else {
        setSuccessForFile(container)
    }
}



//form validation
// if (inputForm) {
//     inputForm.addEventListener('submit', (e) => {
//         let [file1] = frontInput.files;
//         let [file2] = backInput.files;
//
//         if (!file1 || !file2) {
//             if (!file1) {
//                 frontError.classList.remove('hidden')
//             } else {
//                 frontError.classList.add('hidden')
//             }
//             if (!file2) {
//                 backError.classList.remove('hidden')
//             } else {
//                 backError.classList.add('hidden')
//             }
//             validateFileInput(frontInput, frontContainer)
//             validateFileInput(backInput, backContainer)
//
//             e.preventDefault()
//         }
//     })
// }

//making sure the script is triggered on /step-4
if (frontInput) {
    handleFileInput(frontInput, frontContainer, frontImage)
    handleFileInput(backInput, backContainer, backImage)
    // frontInput.addEventListener('change', () => {
    //     frontId.value = frontImage.src.
    // })
    //
    // backInput.addEventListener('change', () => {
    //     backId.value = backImage.src
    // })
    // handleMultipleInput(dokladyInput, dokladyContainer, dokladyImage, additionalInput, additionalInputContainer)
}
