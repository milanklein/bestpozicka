const backIcons = document.querySelectorAll('.back')

backIcons.forEach(icon => {
    icon.classList.add('cursor-pointer')
    icon.addEventListener('click', () => {
        window.history.back()
    })
})
