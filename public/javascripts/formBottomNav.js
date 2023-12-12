const buttons = document.querySelectorAll('.bottom-nav-button')
const containers = document.querySelectorAll('.bottom-nav-container')

for (const container of containers) {
    let height = container.clientHeight;
    for (const button of buttons) {
        button.addEventListener('click', () => {
            container.classList.toggle(`translate-y-[${height - 54}px]`)
        })
    }
}

