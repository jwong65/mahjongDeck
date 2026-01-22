let currentHand = []
class Tile{
    constructor(suit, value, isDora){
        this.suit = suit;
        this.value = value; 
        this.isDora = isDora;
    }
    toString(){
        return `${this.suit} + ${this.value}${this.isDora ? " (Dora)" : ""}`;
    }
}

function buildDeck(){
    const deck =[];
    const suits = ["man", "pin", "sou"];

    // Numbered tiles 1-9, 4 of each
    for(let suit of suits){
        for (let value = 1; value <= 9; value++){ 
            if (value === 5){
                deck.push (new Tile(suit, value, true));
                for (let i=0; i<3; i++){
                    deck.push (new Tile(suit, value, false));
                }
            }
            else{
            for(let i=0; i<4; i++){
                deck.push (new Tile(suit, value, false));
            }
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
    // const hand = deck.splice(0, handSize);
    currentHand = deck.splice(0, handSize);
    renderHand()

//    hand.forEach(tile => {
//         const div = document.createElement("div");
//         div.className = "tile";
//         div.textContent = `${tile.suit} ${tile.value}`;
//         handContainer.appendChild(div);
//     });
    console.log("Hand drawn:", currentHand);
    console.log("Tiles remaining in deck:", deck.length);
}

function resetDeck(){
    deck = shuffleDeck(buildDeck());
    document.getElementById("hand").innerHTML = "";
    console.log("Deck reset and shuffled.");
}

function getTileImage(tile){
    if(tile.suit === "man" || tile.suit === "pin" || tile.suit === "sou"){
        const suitDirectory = tile.suit;
        const suitName = tile.suit.charAt(0).toUpperCase() + tile.suit.slice(1);

        if (tile.value ===5 && tile.isDora){
            return `assets/Regular/${suitDirectory}/${suitName}5-Dora.svg`;
        }
        return `assets/Regular/${suitDirectory}/${suitName}${tile.value}.svg`;
    }
    if (tile.suit === "wind"){
        const map = {
            east: "Ton",
            south: "Nan",
            west: "Shaa",
            north: "Pei"
        };
        return `assets/Regular/seats/${map[tile.value]}.svg`;
    }
    if (tile.suit === "dragon") {
        const map = {
            red: "Chun",
            green: "Hatsu",
            white: "Haku"
        };
        return `assets/Regular/dragon/${map[tile.value]}.svg`;
    }
// Default fallback image is the Blank tile.
    return "assets/Regular/Front.svg";
}

function tileDrag(tileDiv, index){
    tileDiv.draggable = true;
    tileDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", index);
    });
    tileDiv.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    tileDiv.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const targetIndex = index;
        
        [currentHand[draggedIndex], currentHand[targetIndex]] = [currentHand[targetIndex], currentHand[draggedIndex]];

        // Re-render the hand after it's been adjusted
        renderHand();
    })
}
function renderHand() {
    const handContainer = document.getElementById("hand");
    const tooltip = document.getElementById("tooltip");

    handContainer.innerHTML = "";

    currentHand.forEach((tile, index) => {
        const div = document.createElement("div");
        div.className = "tile";

        tileDrag(div, index);

        const img = document.createElement("img");
        img.src = getTileImage(tile);
        img.alt = tile.toString();

        img.addEventListener("mouseover", () => {
            tooltip.style.display = "block";
            tooltip.textContent =
                `${tile.suit.toUpperCase()} ${tile.value}${tile.isDora ? " (Dora)" : ""}`;
            tooltip.style.opacity = "1";
        });

        img.addEventListener("mousemove", (e) => {
            tooltip.style.left = e.clientX + 12 + "px";
            tooltip.style.top = e.clientY + 12 + "px";
        });

        img.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
        });

        div.appendChild(img);
        handContainer.appendChild(div);
    });
}
