require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () =>{
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2020-10-31');
    cards();
    calc();
    forms('form');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // }else{
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){
    //     if (n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         currentSlide.textContent = `0${slideIndex}`;
    //     }else{
    //         currentSlide.textContent = slideIndex;
    //     }
    // }

    // function plusSlides (n){
    //     showSlides(slideIndex += n);
    // }

    // prevButton.addEventListener('click', () => {
    //     plusSlides(-1);
    // }); 

    
    // nextButton.addEventListener('click', () => {
    //     plusSlides(1);
    // }); 
});   