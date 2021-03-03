"use strict"

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
				btnCloseModal = document.querySelector('[data-close]'),
				modalWindow = document.querySelector('.modal');
	

	function closeModal(){
		modalWindow.style.display = "none";
		document.body.style.overflow = '';
	}		

	function openModal(){
		modalWindow.style.display = "block";
			document.body.style.overflow = 'hidden';
			clearInterval(modalTimerId);
	}

	btnShowModal.forEach(item => {
		item.addEventListener('click', openModal);
	});

	btnCloseModal.addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (e)=>{
		if(e.target === modalWindow) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if(e.code === 'Escape' && modalWindow.style.display != 'none'){
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 10000);

	function showModalByScroll(){
		if( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

});