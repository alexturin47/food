import {postData} from '../sevices/services';

function modal(triggerSelector, modalSelector) {
  const btnShowModal = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);

  const modalTimerId = setTimeout(openModal, 10000);

  function closeModal() {
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
  }

  function openModal() {
    modalWindow.style.display = "block";
    document.body.style.overflow = "hidden";

		console.log(modalTimerId);

		if(modalTimerId){
			clearInterval(modalTimerId);
		}
    
  }

  btnShowModal.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.style.display != "none") {
      closeModal();
    }
  });

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/spinner.svg",
    succes: "Спасибо! Скоро мы с вами свяжемся",
    fail: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });



  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
							display: block;
							margin: auto;
						`;
      form.append(statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.succes);
          form.reset();
          setTimeout(() => {
            statusMessage.textContent = "";
          }, 3000);
        })
        .catch(() => {
          showThanksModal(message.fail);
          setTimeout(() => {
            statusMessage.textContent = "";
          }, 3000);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.style.display = "none";

    openModal();
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
						<div class="modal__content">
							<div class="modal__close" data-close>&times;</div>
							<div class="modal__title">${message}</div>
						</div>
					`;

    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.style.display = "block";
      closeModal();
    }, 5000);
  }
	

  function showModalByScroll(){
  	if( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
  		openModal();
  		window.removeEventListener('scroll', showModalByScroll);
  	}
  }
  window.addEventListener('scroll', showModalByScroll);
}


export default modal;

