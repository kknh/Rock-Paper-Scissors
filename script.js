const mainScreen = document.getElementById('main-screen')
const choiceScreen = document.getElementById('choice-screen')
const weapons = document.querySelector('.weapons')
const resultAnnounce = document.getElementById('result-announce')
const replayBtn = document.getElementById('replay-btn')
const restartBtn = document.getElementById('restart-btn')
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')
const playerChoiceSquare = document.getElementById('show-player-choice')
const computerChoiceSquare = document.getElementById('show-computer-choice')

// Creating players factory
function createPlayer() {
	let score = 0
	let weapon = ''
	return { score, weapon }
}

// Start new game factory
function startNewGame() {
	return {
		player: createPlayer(),
		computer: createPlayer(),
		roundResult: '',
	}
}

function replay() {
	choiceScreen.classList.remove('hide')
	mainScreen.classList.add('hide')
}

function computerChooseWeapon() {
	const weapons = ['rock', 'paper', 'scissors']
	const random = Math.floor(Math.random() * weapons.length)
	game.computer.weapon = weapons[random]
}

function checkWinner() {
	if (game.player.weapon === 'rock') {
		if (game.computer.weapon === 'rock') {
			game.roundResult = 'tie'
			showResult()
			return
		}
		if (game.computer.weapon === 'scissors') {
			game.roundResult = 'win'
			showResult()
			return
		}
		if (game.computer.weapon === 'paper') {
			game.roundResult = 'lost'
			showResult()
			return
		}
	}
	if (game.player.weapon === 'paper') {
		if (game.computer.weapon === 'paper') {
			game.roundResult = 'tie'
			showResult()
			return
		}
		if (game.computer.weapon === 'rock') {
			game.roundResult = 'win'
			showResult()
			return
		}
		if (game.computer.weapon === 'scissors') {
			game.roundResult = 'lost'
			showResult()
			return
		}
	}
	if (game.player.weapon === 'scissors') {
		if (game.computer.weapon === 'scissors') {
			game.roundResult = 'tie'
			showResult()
			return
		}
		if (game.computer.weapon === 'paper') {
			game.roundResult = 'win'
			showResult()
			return
		}
		if (game.computer.weapon === 'rock') {
			game.roundResult = 'lost'
			showResult()
			return
		}
	}
}

// Check, add and show result Function
function showResult() {
	if (game.roundResult === 'tie') {
		resultAnnounce.classList.remove('red')
		resultAnnounce.classList.remove('green')
		resultAnnounce.innerText = "It's a tie! 🤣"
		return
	}
	if (game.roundResult === 'win') {
		resultAnnounce.classList.remove('red')
		resultAnnounce.classList.add('green')
		resultAnnounce.innerText = 'You Won! 😍'
		game.player.score++
		playerScore.innerText = game.player.score
		return
	}
	if (game.roundResult === 'lost') {
		resultAnnounce.classList.remove('green')
		resultAnnounce.classList.add('red')
		resultAnnounce.innerText = 'You lost! 😢'
		game.computer.score++
		computerScore.innerText = game.computer.score
		return
	}
}

function showWeapon(weapon) {
	if (weapon === 'rock') {
		playerChoiceSquare.innerHTML = `<i class="fa-solid fa-hand-back-fist"></i>`
	} else if (weapon === 'paper') {
		playerChoiceSquare.innerHTML = `<i class="fa-solid fa-hand"></i>`
	} else {
		playerChoiceSquare.innerHTML = `<i class="fa-solid fa-hand-scissors"></i>`
	}

	if (game.computer.weapon === 'rock') {
		computerChoiceSquare.innerHTML = `<i class="fa-solid fa-hand-back-fist"></i>`
	} else if (game.computer.weapon === 'paper') {
		computerChoiceSquare.innerHTML = `<i class="fa-solid fa-hand"></i>`
	} else {
		computerChoiceSquare.innerHTML = `<i class="fa-solid fa-hand-scissors"></i>`
	}
}

// Starting new game initialy
let game = startNewGame()

weapons.addEventListener('click', (e) => {
	if (e.target.closest('[data-weapon')) {
		//Player chooses weapon
		const weapon = e.target.dataset.weapon
		game.player.weapon = weapon
		//Computer chooses weapon
		computerChooseWeapon()
		//Checking who won
		checkWinner()
		//Show main screen
		showWeapon(weapon)
		mainScreen.classList.remove('hide')
		choiceScreen.classList.add('hide')
	}
})

// Buttons functionality
replayBtn.addEventListener('click', replay)
restartBtn.addEventListener('click', () => {
	game = startNewGame()
	mainScreen.classList.add('hide')
	choiceScreen.classList.remove('hide')
	playerScore.innerText = '0'
	computerScore.innerText = '0'
	resultAnnounce.innerText = ''
})
