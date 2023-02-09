function modal () {
    //****************************modal****************** */

    const targetModalBtn = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = 'auto';
    }

    targetModalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    
    modal.addEventListener('click', event => {
        if(event.target == modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
  
    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 60000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();  
            removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;