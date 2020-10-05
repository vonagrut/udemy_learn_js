import {closeModal, showModal} from './modal';
import {newPost} from '../services/services';

function forms (formSelector) {
    //Forms
    const forms = document.querySelectorAll(formSelector );
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы свяжемся с вами в ближайшее время!',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(item => {
        console.log(item);
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
            
            const object = JSON.stringify(Object.fromEntries(formData.entries()));
            
            newPost('http://localhost:3000/requests', object)
            .then(data => {
                console.log(data);
                customModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                customModal(message.failure);
            }).finally(() => {
                form.reset();
            })
            
        });

        //custom modal
        function customModal(message) {
            const oldModal = document.querySelector('.modal__dialog');
            oldModal.classList.add('hide');

            const newModal = document.createElement('div');
            newModal.classList.add('modal__dialog');
            newModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>x</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(newModal);
            document.querySelector('.modal').classList.add('show');
            document.querySelector('.modal').classList.remove('hide');
            setTimeout(() => {
                newModal.remove();
                oldModal.classList.add('show');
                oldModal.classList.remove('hide');
                document.querySelector('.modal').classList.add('hide');
                document.querySelector('.modal').classList.remove('show');
                closeModal('.modal');
            }, 4000);
        };
    }
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;