window.addEventListener('DOMContentLoaded', () =>{

    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2020-08-31';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return{
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds  
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setTimer(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){

                clearInterval(timerInterval);
            }
        }
    }

    setTimer('.timer', deadline);

    //Modal

    const btn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // убираем задний скролл модального окна
        //clearInterval(modalTimer);
    }

    btn.forEach(button => {
        button.addEventListener('click', () => {
            showModal();
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //восстанавливаем скролл странички
    }


    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    //const modalTimer = setTimeout(showModal, 5000); 
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            console.log('hello');
            //window.removeEventListener('scroll', showModalByScroll);
        }
    });
    

    //Используем Классы для карточек
    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
            console.log(this.price);
        }
        
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);            
        }
    }
    
    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`Can not get resource from ${url}. Request status is ${res.status}`);
        }
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    getResource('http://localhost:3000/menu')
    .then(data => createDiv(data));

    function createDiv(data){
        data.forEach(({img, altimg, title, descr, price}) =>{
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    }
    //POST query to server
    //Forms
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы свяжемся с вами в ближайшее время!',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(item => {
        console.log(item);
        postData(item);
    });

    const newPost = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
            
            const object = JSON.stringify(Object.fromEntries(formData.entries()));
            
            newPost('http://localhost:3000/requests', object)
            .then(data => {
                console.log(data);
                customModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                customModal(message.failure);
            }).finally(() => {
                form.reset();
            })
            
        });

        //custom modal
        function customModal(message) {
            const oldModal = document.querySelector('.modal__dialog');
            oldModal.classList.add('hide');

            const newModal = document.createElement('div');
            newModal.classList.add('modal__dialog');
            newModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>x</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(newModal);
            document.querySelector('.modal').classList.add('show');
            document.querySelector('.modal').classList.remove('hide');
            setTimeout(() => {
                newModal.remove();
                oldModal.classList.add('show');
                oldModal.classList.remove('hide');
                document.querySelector('.modal').classList.add('hide');
                document.querySelector('.modal').classList.remove('show');
                closeModal();
            }, 4000);
        };
    }
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    // Slider #1
    const slides = document.querySelectorAll('.offer__slide'),
          nextButton = document.querySelector('.offer__slider-next'),
          slider = document.querySelector('.offer__slider'),
          prevButton = document.querySelector('.offer__slider-prev'),
          total = document.querySelector('#total'),
          currentSlide = document.querySelector('#current'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        currentSlide.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextButton.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += deleteNoDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slideIndex < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prevButton.addEventListener('click', () => {
        if (offset == 0){
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slideIndex < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNoDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;

            if (slideIndex < 10) {
                currentSlide.textContent = `0${slideIndex}`;
            }else{
                currentSlide.textContent = slideIndex;
            }
        });
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



    /**
     * Calculator 
     */

    const result = document.querySelector('.calculating__result span');
    let sex = 'female', 
        weight, 
        height, 
        age, 
        ratio = 1.375;

    //function to calculate norm of calories to male or female

    function calcTotal() {
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = '____';
            return;
        } else {
            if (sex == 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    }

    calcTotal();

    function getStaticContent(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        })    
    }

    getStaticContent('#gender', 'calculating__choose-item_active');
    getStaticContent('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicContent(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')){
                case 'weight':
                    weight = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;                
                
            }

            calcTotal();
        });
    }

    getDynamicContent('#height');
    getDynamicContent('#weight');
    getDynamicContent('#age');
});   