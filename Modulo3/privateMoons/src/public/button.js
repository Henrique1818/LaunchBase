const menu = document.querySelector('.menu');

document.querySelector('.btn-toggle').addEventListener('click', () => {
    if(menu.classList.contains('active')) {
        menu.classList.remove('active');
        console.log(menu)
    } else {
        menu.classList.add('active');
    }
});