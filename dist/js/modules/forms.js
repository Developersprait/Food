import {closeModal, openModal} from './modal';

function forms(){
       //forms
       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'spinner.svg',
           success: 'Uspekh',
           fail: 'Fatal Error'
       };
   
       forms.forEach(item => {
           bindPostData(item)
       });
   
       const postData = async (url, data) => {
           const res = await fetch(url, {
               method: "POST",
               headers: {
                   'Content-type': 'application/json'
               },
               body: data
           });
           return res.json();
       }
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;`;
               form.insertAdjacentElement('afterend', statusMessage);
   
               // const request = new XMLHttpRequest();
               // request.open('POST', 'server.php');
   
   
               // request.setRequestHeader();
   
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
   
               postData('  http://localhost:3000/requests', json)
                   .then(data => {
                       console.log(data)
                       showThanksModal(message.success);
                       statusMessage.remove();
                   })
                   .catch(() => {
                       showThanksModal(message.fail);
                   })
                   .finally(() => {
                       form.reset();
                   });
   
               // request.addEventListener('load', () => {
               //     if (request.status === 200) {
               //         console.log(request.response);
               //         showThanksModal(message.success);
               //         form.reset();
               //         setTimeout(() => {
               //             statusMessage.remove();
               //             console.log('works');
               //         }, 5000);
               //     } else {
               //         showThanksModal(message.fail);
               //     }
               // });
           });
       }
   
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
           prevModalDialog.classList.add('hide');
           openModal();
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
               closeModal();
           }, 7000);
       }
   
       fetch('http://localhost:3000/menu')
           .then(data => data.json())
           .then(res => console.log(res))
}
export default forms;