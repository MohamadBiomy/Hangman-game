// adding letters to the box 
let lettersBox = document.querySelector(".letters-box")
let alphabet = "abcdefghijklmnopqrstuvwxyz";

for (let i = 0; i < alphabet.length; i++) {
  let span = document.createElement("span")
  span.classList.add("char")
  span.append(alphabet[i])
  lettersBox.append(span)
}

// removing result container
let resultDiv = document.querySelector(".result")
resultDiv.remove()

// some variables
let gameBox = document.querySelector(".game")
let hangman = document.querySelector(".hangman")
let hangmanParts = document.querySelectorAll(".hangman > *")
let wordShowBox = document.querySelector(".word")
let letters = document.querySelectorAll(".char")
let lettersOfCorrectWord;
let bodyParts = 0
let resultNum = 0

// getting the word from api  
let choosedWord;
let words = async () => {
  let res = (await fetch("words.json")).json()
  return (await res).words
}

words().then(res => {
  return res[Math.floor(Math.random() * res.length)]
})
.then(word => {
  for (let i = 0; i < word.length; i++) {
    let span = document.createElement("span")
    span.dataset.letter = word[i]
    span.className = "letter"
    wordShowBox.append(span)
  }
  lettersOfCorrectWord = document.querySelectorAll(".word span")
  choosedWord = word
  return word
})
.then( word => {
  // when clicking a letter 
  letters.forEach(char => {
    char.addEventListener("click", () => {
      // disabling the letter
      char.classList.add("choosed")
      // checking stage
      let re = new RegExp(char.innerHTML, "ig")
      let match = word.match(re)
      if (match !== null) {

        // loop on correct word
        lettersOfCorrectWord.forEach(letter => {

          if (letter.dataset.letter === char.innerHTML) {
            letter.innerHTML = char.innerHTML
            letter.classList.add("filled")
          }

        })

        resultNum += match.length
        if (resultNum === word.length) {
          finishGame()
        }
      } else {

        bodyParts++
        addParts(bodyParts)

      }
    })
  })
}
)

// functions -------------------------------------------------------------

function addParts(partsCount) {
  hangmanParts.forEach(part => part.classList.remove("none"))
  hangmanParts.forEach(part => part.classList.add("none"))
  for (let i = 1; i <= partsCount; i++) {
    hangmanParts[i - 1].classList.remove("none")
    // checking if parts count ended
    if (i >= 6) {
      finishGame()
      return 0;
    }
  }
}


function finishGame() {
  letters.forEach(char => char.classList.add("choosed"))
  wordShowBox.remove()
  document.querySelector(".container").append(resultDiv)
  let btn = document.querySelector(".result button")
  btn.onclick = () => location.reload()
}