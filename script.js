let deckId
let computerScore = 0
let player1Score = 0
const drawCardsBtn = document.getElementById("draw-cards")
const computerScoreEl = document.getElementById("computer-score-el")
const playerScoreEl = document.getElementById("player-score-el")
const gameMessage = document.getElementById("game-message")
const gameTitle = document.getElementById("game-title")
document.getElementById("new-deck").addEventListener("click", getCards)
drawCardsBtn.addEventListener("click", drawCards)
drawCardsBtn.disabled = true;

function getCards() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            document.getElementById("game-message").innerHTML = `New deck ready!`
            document.getElementById("cards-left").innerHTML = `${data.remaining} cards left`
            computerScoreEl.innerHTML = "0"
            playerScoreEl.innerHTML = "0"
            player1Score = 0
            computerScore = 0
            gameTitle.innerHTML = "The Game of War"
    })
    drawCardsBtn.disabled = false
}

function drawCards()    {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("card-slot-1").innerHTML = `
            <img src="${data.cards[0].image}" alt="" class="card"/>
            `
            document.getElementById("card-slot-2").innerHTML = `
            <img src="${data.cards[1].image}" alt="" class="card"/>
            `
            document.getElementById("cards-left").innerHTML = `${data.remaining} cards left`
            const winnerMessage = getWinner(data.cards[0].value, data.cards[1].value)
            gameMessage.innerHTML = winnerMessage

            if (data.remaining === 0) {
                drawCardsBtn.disabled = true
                gameTitle.innerHTML = "Game Over!"
                if (computerScore > player1Score) {
                    gameMessage.innerHTML = 'Computer Wins!'
                } else if (computerScore < player1Score)    {
                    gameMessage.innerHTML = 'You Win!'
                } else {
                    gameMessage.innerHTML = 'Draw!'
                }
            } 
        })
}

function getWinner(card1, card2)    {
    const setCardValueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
                                "JACK", "QUEEN", "KING", "ACE"]
    const card1IndexValue = setCardValueOptions.indexOf(card1)
    const card2IndexValue = setCardValueOptions.indexOf(card2)
    
    if (card1IndexValue > card2IndexValue) {
        computerScore += 1
        computerScoreEl.innerHTML = computerScore
        return `Computer wins!`
    } else if (card1IndexValue < card2IndexValue) {
        player1Score += 1
        playerScoreEl.innerHTML = player1Score
        return `You win!`
    } else {
        return "WAR!"
    }
}