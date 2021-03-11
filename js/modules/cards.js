import {getResource} from '../sevices/services';

function cards() {
  class MenuItem {
    constructor(subtitle, descr, price, img, alt, parentSelector, ...classes) {
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

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
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

    changeToRUB() {
      this.price = this.price * this.transfer;
    }
  }

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuItem(
        title,
        descr,
        price,
        img,
        altimg,
        ".menu .container"
      ).render();
    });
  });
}

export default cards;
