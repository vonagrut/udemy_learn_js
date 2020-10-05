function calc () {
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
}

export default calc;