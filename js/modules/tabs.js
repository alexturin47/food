function tabs() {
  const tabs = document.querySelectorAll(".tabcontent"),
    menu = document.querySelectorAll(".tabheader__item");

  function hideTabs() {
    tabs.forEach((item, i) => {
      item.style.display = "none";
    });
  }

  function showTab(i = 0) {
    tabs[i].style.display = "block";
  }

  function hideActivMenuClass() {
    menu.forEach((item) => {
      if (item.classList.contains("tabheader__item_active")) {
        item.classList.remove("tabheader__item_active");
      }
    });
  }

  menu.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      const target = e.target;
      hideTabs();
      showTab(i);
      hideActivMenuClass();
      target.classList.add("tabheader__item_active");
    });
  });

  hideTabs();
  showTab();
}

export default tabs;
