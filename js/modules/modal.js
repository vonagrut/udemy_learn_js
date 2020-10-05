function showModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // убираем задний скролл модального окна
    //clearInterval(modalTimer);
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //восстанавливаем скролл странички
}

function modal (triggerSelector, modalSelector) {
    //Modal
    const btn = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    
    btn.forEach(button => {
        button.addEventListener('click', () => {
            showModal(modalSelector);
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

    //const modalTimer = setTimeout(showModal, 5000); 
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal(modalSelector );
            console.log('hello');
            //window.removeEventListener('scroll', showModalByScroll);
        }
    });
}

export default modal;
export {closeModal, showModal};