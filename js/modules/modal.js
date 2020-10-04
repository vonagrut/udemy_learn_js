function modal () {
    //Modal

    const btn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // убираем задний скролл модального окна
        //clearInterval(modalTimer);
    }

    btn.forEach(button => {
        button.addEventListener('click', () => {
            showModal();
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //восстанавливаем скролл странички
    }


    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    //const modalTimer = setTimeout(showModal, 5000); 
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            console.log('hello');
            //window.removeEventListener('scroll', showModalByScroll);
        }
    });
}

module.exports = modal;