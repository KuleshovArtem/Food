//'use strict';
require('es6-promise').polyfill();
import "core-js/stable";
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';
// 

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 60000);

    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]','.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide:'.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field:'.offer__slider-inner', 
    });
    tabs('.tabheader__item','.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-05-11'); 
});

let c = 4;
function addX(x) {
  return function(n) {
     return n + x;
  };
}
 
const addThree = addX(3);
 
let d = addThree(c);
let res = addThree(c);
 
console.log(res);
