class Player{
    #hp;
    #mana;
    #inventory;

    constructor(character){
        this.#hp = 100;
        this.#mana = 100;
        this.#inventory = [];
        this.character = character;
    }

    takeDamage(amount){
        this.#hp -= amount;
    }

    useMana(amount){
        this.#mana -= amount;
    }

    get hp(){
        return this.#hp;
    }

    get mana(){
        return this.#mana;
    }

    get inventory(){
        return this.#inventory;
    }

}