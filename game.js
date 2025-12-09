class Tiles{
    constructor(suit, value){
        this.suit = suit;
        this.value = value; 
    }
    toString(){
        return `${this.suit} + ${this.value}`;
    }
}