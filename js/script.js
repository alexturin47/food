"use strict";

//const { nextTick } = require("node:process");

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/action-timer";
import cards from "./modules/cards";
import slider from "./modules/slider";
import calc from "./modules/calc";
//import { openModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {

  

  tabs();
  modal("[data-modal]", ".modal");
  timer();
  cards();
  slider();
  calc();
});
