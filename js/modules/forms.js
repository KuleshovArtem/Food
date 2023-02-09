import { openModal, closeModal} from "./modal";
import {postData} from '../services/services';

function forms (formSelector, modalTimerId) {
    //****************forms******************** */

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вам свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 20px auto 0 auto;
            `; //лучше добавлять класс.
            form.insertAdjacentElement('afterend', statusMessage);  

            const formData = new FormData(form);
            // менее элигатный способ получения из formData json файла

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            //postData("http://localhost:3000/requests", JSON.stringify(object))


            // Более краткий сбособ получения из formData json

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
            .then(data => {
                //console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);   
            }).finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 5000);
    
    }
    
    fetch('http://localhost:3000/menu')
    .then(data => data.json());
    //.then(res => console.log(res));
}

export default forms;