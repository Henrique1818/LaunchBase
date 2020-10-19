const menu = document.querySelector('.menu')

document.querySelector('button').addEventListener('click', () => {
    if(menu.classList.contains('active')) {
        menu.classList.remove('active')
    } else {
        menu.classList.add('active')
    }
})