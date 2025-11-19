class Die{
    #color;

    constructor(color){
        this.#color = color;
    }

    roll(){
        return Math.floor(Math.random() * 6) + 1;
    }
}