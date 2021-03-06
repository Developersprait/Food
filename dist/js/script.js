require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import 'jquery';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(()=> openModal('.modal', modalTimerID), 30000);

    tabs('.tabheader__item','.tabcontent','tabheader__items','tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerID);
    timer('.timer', '2022-06-11');
    cards();
    calculator();
    forms('form', modalTimerID);
    slider({
        container: '.offer__slider',
        slide:'.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'

    });
});