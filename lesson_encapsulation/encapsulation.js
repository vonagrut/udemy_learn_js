'use strict';

class User {
    constructor(name, age) {
        this.name = name;
        this._age = age;
    }

    #surname = 'Petrychenko';

    say = () => {
        console.log(`Имя: ${this.name} ${this.#surname}, Возраст: ${this._age}`);
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Некорректные данные!');
        }
    }
}

const ivan = new User('Ivan', 27);
console.log(ivan.age)
ivan.age = 30
console.log(ivan.age)
ivan.say()