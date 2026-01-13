class Tile{
    constructor(suit, value){
        this.suit = suit;
        this.value = value; 
    }
    toString(){
        return `${this.suit} + ${this.value}`;
    }
}

function buildDeck(){
    const deck =[];
    const suits = ["man", "pin", "sou"];

    // Numbered tiles 1-9, 4 of each
    for(let suit of suits){
        for (let value = 1; value <= 9; value++){  
            for(let i=0; i<4; i++){
                deck.push (new Tiles(suit, value));
            }
    }}
    // Need honor tiles added
    // Winds: East, South, West, North
    const winds = ["east", "south", "west", "north"];
    for (let wind of winds){
        for (let i=0; i<4; i++){
            deck.push (new Tile("wind", wind));
        }}
        // Dragons: Red, Green, White
        const dragons = ["red", "green", "white"]; 
    
    for (let dragon of dragons){
        for (let i=0; i<4; i++){
            deck.push (new Tile("dragon", dragon));
        }
    }

    return deck;
    
}

function shuffleDeck(deck){
     for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Testing purposes.
let deck = buildDeck();
// console.log(deck);
const shuffledDeck = shuffleDeck(deck);
console.log("Deck shuffled:", shuffledDeck);

// Hand functionality
const drawButton = document.getElementById("draw-hand");
drawButton.addEventListener("click", drawHand);

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetDeck);

function drawHand(){
    const handSize = 14;
    const handContainer = document.getElementById("hand");
    handContainer.innerHTML = ""; // Clear previous hand for testing

    if (deck.length < handSize) {
        console.log("Not enough tiles in the deck to draw a hand.");
        return;
    }
    const hand = deck.splice(0, handSize);

   hand.forEach(tile => {
        const div = document.createElement("div");
        div.className = "tile";
        div.textContent = `${tile.suit} ${tile.value}`;
        handContainer.appendChild(div);
    });
    console.log("Hand drawn:", hand);
    console.log("Tiles remaining in deck:", deck.length);
}

function resetDeck(){
    deck = shuffleDeck(buildDeck());
    document.getElementById("hand").innerHTML = "";
    console.log("Deck reset and shuffled.");
}