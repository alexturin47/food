"use strict"

//const { nextTick } = require("node:process");

document.addEventListener('DOMContentLoaded', () => {
	// Tabs
	const tabs = document.querySelectorAll('.tabcontent'),
				menu = document.querySelectorAll('.tabheader__item');


	function hideTabs(){
		tabs.forEach((item, i ) => {
			item.style.display = "none";
		});
	}

	function showTab(i = 0){
		tabs[i].style.display = "block";
	}

	function hideActivMenuClass(){
		menu.forEach(item => {
			if(item.classList.contains('tabheader__item_active')){
				item.classList.remove('tabheader__item_active');
			}
		});
	}

	menu.forEach((item, i)=>{		
		item.addEventListener('click', (e) => {
			const target = e.target;
			hideTabs();
			showTab(i);
			hideActivMenuClass();
			target.classList.add('tabheader__item_active');
		});
	});

	hideTabs();
	showTab();


	// Timer

	const deadline = new Date('2021,03,12');	
	const date = deadline - new Date();

	const 	actionDays = document.querySelector('#days'),
		  	actionHours = document.querySelector('#hours'),
			actionMinutes = document.querySelector('#minutes'),
			actionSeconds = document.querySelector('#seconds');
	
	function parseDate(){
		const t = deadline - new Date();
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor(t / (1000 * 60 * 60) % 24);
		const minutes = Math.floor(t / (1000 * 60) % 60);
		const seconds = Math.floor(t / (1000) % 60);
		
		const time = {
			difference: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
		return(time);
	}

	setActionTimer(parseDate());

	const timer = setInterval(()=>{
		setActionTimer(parseDate());
	}, 1000);

	function setActionTimer(t){
		actionDays.textContent = setZero(t.days);
		actionHours.textContent = setZero(t.hours);
		actionMinutes.textContent = setZero(t.minutes);
		actionSeconds.textContent = setZero(t.seconds);
	}

	function setZero(t){
		if(t < 10){
			return `0${parseInt(t)}`;
		}
		return t;
	}


	// Modal

	const btnShowModal = document.querySelectorAll('[data-modal]'),
				modalWindow = document.querySelector('.modal');
	

	function closeModal(){
		modalWindow.style.display = "none";
		document.body.style.overflow = '';
	}		

	function openModal(){
		modalWindow.style.display = "block";
			document.body.style.overflow = 'hidden';
			//clearInterval(modalTimerId);
	}

	btnShowModal.forEach(item => {
		item.addEventListener('click', openModal);
	});



	modalWindow.addEventListener('click', (e)=>{
		if(e.target === modalWindow  || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if(e.code === 'Escape' && modalWindow.style.display != 'none'){
			closeModal();
		}
	});

	//const modalTimerId = setTimeout(openModal, 10000);

	// function showModalByScroll(){
	// 	if( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
	// 		openModal();
	// 		window.removeEventListener('scroll', showModalByScroll);
	// 	}
	// }
	// window.addEventListener('scroll', showModalByScroll);



	// Классы для карточек
	class MenuItem { 
		constructor (subtitle, descr, price, img, alt, parentSelector, ...classes){
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.img = img;
			this.alt = alt;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.transfer = 65;
			this.changeToRUB();
		}

		render(){
			const element = document.createElement('div');
			if(this.classes.length === 0){
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			
			element.innerHTML = `
				<img src="${this.img}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">Меню "${this.subtitle}"</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
				`;
			this.parent.append(element);
		}

		changeToRUB(){
			this.price = this.price * this.transfer;
		}
		
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok){
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price }) => {
	// 			new MenuItem(title, descr, price, img, altimg, '.menu .container').render();
	// 		});
	// 	});

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price }) => {
				 			new MenuItem(title, descr, price, img, altimg, '.menu .container').render();
				 		});
		});

	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	// function createCard(data){
	// 	data.forEach(({img, altimg, title, descr, price }) => {
	// 		const element = document.createElement('div');

	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 			<img src="${img}" alt="${altimg}">
	// 			<h3 class="menu__item-subtitle">Меню "${title}"</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 			</div>
	// 			`; 
	// 			document.querySelector('.menu .container').append(element);
	// 	});
	// }


	// const menuItems =[
	// 	{	title: 'Фитнес',
	// 		descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 		img: 'img/tabs/vegy.jpg',
	// 		alt: 'vegy',
	// 		price: 229			
	// 	},

	// 	{	title: 'Премиум',
	// 		descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 		img: 'img/tabs/elite.jpg',
	// 		alt: 'elite',
	// 		price: 550
	// 	},

	// 	{	title: 'Постное',
	// 		descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 		img: 'img/tabs/post.jpg',
	// 		alt: 'post',
	// 		price: 430
	// 	},
	// ];

	// menuItems.forEach(item => {
	// 	new MenuItem(item.title, item.descr, item.price, item.img, item.alt, '.menu .container').render();
	// });




	// AJAX запросы

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/spinner.svg',
		succes: 'Спасибо! Скоро мы с вами свяжемся',
		fail: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
					'Content-type': 'application/json'
				},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form){
		form.addEventListener('submit', (e)=>{
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: auto;
			`;
			form.append(statusMessage);

			//const request = new XMLHttpRequest();
			//request.open('POST', 'server.php');

			
			//request.setRequestHeader('Content-type', 'application/json');	
			
			const formData = new FormData(form);
			
			// const object ={};
			// formData.forEach(function(value, key){
			// 	object[key] = value;
			// });

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// fetch('server.php', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: json
			// })

			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
					showThanksModal(message.succes);
					form.reset();
					setTimeout(()=>{
						statusMessage.textContent = '';
					}, 3000);
			}).catch(()=>{
				showThanksModal(message.fail);
					setTimeout(()=>{
						statusMessage.textContent = '';
					}, 3000);
			}).finally(()=>{
				form.reset();
			});

			//request.send(json);

			// request.addEventListener('load', ()=>{
			// 	if(request.status === 200){
			// 		console.log(request.response);
			// 		showThanksModal(message.succes);
			// 		form.reset();
			// 		setTimeout(()=>{
			// 			statusMessage.textContent = '';
			// 		}, 3000);
			// 	} else {
			// 		showThanksModal(message.fail);
			// 		setTimeout(()=>{
			// 			statusMessage.textContent = '';
			// 		}, 3000);
			// 	}
			// });
		});
	}


	function showThanksModal(message){
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.style.display = "none";

		openModal();
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(()=>{
			thanksModal.remove();
			prevModalDialog.style.display = "block";
			closeModal();
		}, 5000);
	}

	//  Slider


	const slides = document.querySelectorAll('.offer__slide'),
				slider = document.querySelector('.offer__slider'),
				btnNext = document.querySelector('.offer__slider-next'),
				btnPrev = document.querySelector('.offer__slider-prev'),
				current = document.querySelector('#current'),
				total = document.querySelector('#total'),
				slidesWrapper = document.querySelector('.offer__slider-wrapper'),
				slidesField = document.querySelector('.offer__slider-inner'),
				width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;
	
	if(slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = "flex";
	slidesField.style.transition = "all 0.5s ease 0s";
	slidesWrapper.style.overflow = "hidden";
	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = "relative";

	const dots = document.createElement('ol'),
				dotsArr = [];
	dots.classList.add('carousel-indicators');

	slider.append(dots);

	for( let i = 0; i < slides.length; i++){
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if( i == 0){
			dot.style.opacity = 1;
		}
		dots.append(dot);
		dotsArr.push(dot);
	}

	btnNext.addEventListener('click', ()=>{
		if(offset == parseInt(width) * (slides.length - 1)){
			offset = 0;
		} else {
			offset += parseInt(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex == slides.length){
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if(slides.length < 10){
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dotsArr.forEach(dot => dot.style.opacity = '.5');
		dotsArr[slideIndex -1].style.opacity = 1;
	});

	btnPrev.addEventListener('click', ()=>{
		if(offset == 0){
			offset = parseInt(width) * (slides.length - 1);
		} else {
			offset -= parseInt(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex == 1){
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if(slides.length < 10){
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dotsArr.forEach(dot => dot.style.opacity = '.5');
		dotsArr[slideIndex -1].style.opacity = 1;
	});	

	dotsArr.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = parseInt(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slides.length < 10){
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dotsArr.forEach(dot => dot.style.opacity = '.5');
			dotsArr[slideIndex -1].style.opacity = 1;

			

		});
	});
	
	// function hideSlide(){
	// 	slider.forEach(item => {
	// 		item.style.display = "none";
	// 	});
	// }

	// function showSlide(id){
	// 	hideSlide();
	// 	slider[id].style.display = "block";
	// 	currentSlideText.textContent = id +1;
	// }

	// btnNext.addEventListener('click', ()=>{
	// 	if(currentSlide < slider.length-1){
	// 		currentSlide++;
	// 	} else {
	// 		currentSlide = 0;
	// 	}
	// 	showSlide(currentSlide);
	// });	

	// btnPrev.addEventListener('click', ()=>{
	// 	if(currentSlide > 0){
	// 		currentSlide--;
	// 	} else {
	// 		currentSlide = slider.length -1;
	// 	}
	// 	showSlide(currentSlide);
	// });

	// let currentSlide = 0;			
	// totalSlideText.textContent = slider.length;
	// showSlide(0);	


	/// Local Storidge

});


// function iqTest(numbers){
// 	numbers = numbers.split(' ');
// 	for(let i = 0; i < numbers.length; i++){
// 		if (numbers[i] % 2 > 0){
// 			return i+1;
// 		}
// 	}
// 	return 0;
// }


// console.log(iqTest("2 4 7 8 10"));